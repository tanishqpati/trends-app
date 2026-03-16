import axios from 'axios';
import config from '../config/index.js';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchKeywordProductCount(keyword) {
  const apiKey = config.serpApiKey;
  if (!apiKey) {
    return { keyword, amazonCount: 0, flipkartCount: 0, productCount: 0 };
  }

  try {
    const [amazonRes, flipkartRes] = await Promise.all([
      axios.get('https://serpapi.com/search', {
        params: {
          engine: 'google',
          q: `${keyword} site:amazon.in`,
          api_key: apiKey,
          gl: 'in',
        },
        timeout: 15000,
      }),
      axios.get('https://serpapi.com/search', {
        params: {
          engine: 'google',
          q: `${keyword} site:flipkart.com`,
          api_key: apiKey,
          gl: 'in',
        },
        timeout: 15000,
      }),
    ]);

    const parseCount = (val) => {
      if (typeof val === 'number') return val;
      if (typeof val === 'string') return parseInt(val.replace(/\D/g, ''), 10) || 0;
      return 0;
    };
    const amazonCount = parseCount(amazonRes.data?.search_information?.total_results);
    const flipkartCount = parseCount(flipkartRes.data?.search_information?.total_results);
    const productCount = Math.min(amazonCount + flipkartCount, 10000);

    return { keyword, amazonCount, flipkartCount, productCount };
  } catch (err) {
    console.error(`products.fetchKeywordProductCount: ${keyword}`, err.message);
    return { keyword, amazonCount: 0, flipkartCount: 0, productCount: 0 };
  }
}

export async function fetchAllProductCounts(keywords) {
  const results = [];
  for (const keyword of keywords) {
    const result = await fetchKeywordProductCount(keyword);
    results.push(result);
    await delay(500);
  }
  return results;
}
