import axios from 'axios';
import config from '../config/index.js';

const USER_AGENT = 'WellnessTrendRadar/1.0 (Wellness Trend Radar India)';

async function fetchSubredditSearch(subreddit, keyword, limit = 50) {
  try {
    const url = `https://www.reddit.com/r/${subreddit}/search.json`;
    const { data } = await axios.get(url, {
      params: { q: keyword, restrict_sr: 'on', limit, sort: 'relevance' },
      headers: { 'User-Agent': USER_AGENT },
      timeout: 10000,
    });
    const children = data?.data?.children ?? [];
    return children.map((c) => c.data).filter(Boolean);
  } catch (err) {
    return [];
  }
}

function countMentions(posts) {
  return posts.reduce((sum, p) => {
    const score = p.score ?? 0;
    const comments = p.num_comments ?? 0;
    return sum + 1 + Math.min(comments, 10) + Math.min(Math.floor(score / 10), 20);
  }, 0);
}

export async function fetchKeywordRedditMentions(keyword) {
  let totalMentions = 0;
  const posts = [];

  const subreddits = config.wellnessSubreddits ?? ['IndianSkincareAddicts', 'IndianFitness', 'Supplements', 'nutrition', 'Ayurveda'];
  for (const sub of subreddits) {
    const subPosts = await fetchSubredditSearch(sub, keyword, 25);
    totalMentions += countMentions(subPosts);
    posts.push(
      ...subPosts.slice(0, 5).map((p) => ({
        title: p.title,
        score: p.score,
        numComments: p.num_comments,
        url: `https://reddit.com${p.permalink}`,
        subreddit: p.subreddit,
        created: p.created_utc,
      }))
    );
  }

  const uniquePosts = posts
    .filter((p, i, arr) => arr.findIndex((x) => x.url === p.url) === i)
    .slice(0, 20);

  return {
    keyword,
    redditMentions: totalMentions,
    redditPosts: uniquePosts,
  };
}

export async function fetchAllRedditData(keywords) {
  const results = [];
  for (const keyword of keywords) {
    const result = await fetchKeywordRedditMentions(keyword);
    results.push(result);
  }
  return results;
}
