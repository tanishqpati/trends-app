import axios from 'axios';
import config from '../config/index.js';

const NEWS_API_URL = 'https://newsapi.org/v2/everything';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchKeywordNewsCount(keyword) {
  const apiKey = config.newsApiKey;
  if (!apiKey) {
    return { keyword, newsMentions: 0, newsArticles: [] };
  }

  try {
    const { data } = await axios.get(NEWS_API_URL, {
      params: {
        q: keyword,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 20,
        apiKey,
      },
      timeout: 10000,
    });

    const articles = data?.articles ?? [];
    const count = data?.totalResults ?? articles.length;

    return {
      keyword,
      newsMentions: Math.min(count, 100),
      newsArticles: articles.slice(0, 5).map((a) => ({
        title: a.title,
        source: a.source?.name,
        url: a.url,
        publishedAt: a.publishedAt,
      })),
    };
  } catch (err) {
    console.error(`news.fetchKeywordNewsCount: ${keyword}`, err.message);
    return { keyword, newsMentions: 0, newsArticles: [] };
  }
}

export async function fetchAllNewsData(keywords) {
  const results = [];
  for (const keyword of keywords) {
    const result = await fetchKeywordNewsCount(keyword);
    results.push(result);
    await delay(300);
  }
  return results;
}
