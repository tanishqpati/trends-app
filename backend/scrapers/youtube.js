import { google } from 'googleapis';
import config from '../config/index.js';

const REGION_CODE = 'IN';
const MAX_RESULTS = 25;

async function getYoutubeClient() {
  const apiKey = config.youtubeApiKey;
  if (!apiKey) {
    return null;
  }
  return google.youtube({ version: 'v3', auth: apiKey });
}

export async function fetchKeywordYouTubeData(keyword) {
  const youtube = await getYoutubeClient();
  if (!youtube) {
    return {
      keyword,
      youtubeMentions: 0,
      youtubeVideos: [],
    };
  }

  try {
    const searchRes = await youtube.search.list({
      part: ['snippet'],
      q: keyword,
      regionCode: REGION_CODE,
      maxResults: MAX_RESULTS,
      type: ['video'],
      relevanceLanguage: 'en',
    });

    const items = searchRes.data.items ?? [];
    const videoIds = items.map((i) => i.id?.videoId).filter(Boolean);

    if (videoIds.length === 0) {
      return {
        keyword,
        youtubeMentions: 0,
        youtubeVideos: [],
      };
    }

    const videosRes = await youtube.videos.list({
      part: ['statistics', 'snippet'],
      id: videoIds,
    });

    const videoList = videosRes.data.items ?? [];
    let totalMentions = 0;
    const youtubeVideos = videoList.slice(0, 10).map((v) => {
      const stats = v.statistics ?? {};
      const viewCount = parseInt(stats.viewCount ?? '0', 10);
      const likeCount = parseInt(stats.likeCount ?? '0', 10);
      const commentCount = parseInt(stats.commentCount ?? '0', 10);
      totalMentions += 1 + Math.min(Math.floor(viewCount / 10000), 50) + Math.min(likeCount, 20) + Math.min(commentCount, 10);

      return {
        title: v.snippet?.title ?? '',
        channelTitle: v.snippet?.channelTitle ?? '',
        viewCount,
        likeCount,
        url: `https://www.youtube.com/watch?v=${v.id}`,
        publishedAt: v.snippet?.publishedAt ?? '',
      };
    });

    return {
      keyword,
      youtubeMentions: totalMentions,
      youtubeVideos,
    };
  } catch (err) {
    console.error(`youtube.fetchKeywordYouTubeData: ${keyword}`, err.message);
    return {
      keyword,
      youtubeMentions: 0,
      youtubeVideos: [],
    };
  }
}

export async function fetchAllYouTubeData(keywords) {
  const results = [];
  for (const keyword of keywords) {
    const result = await fetchKeywordYouTubeData(keyword);
    results.push(result);
  }
  return results;
}
