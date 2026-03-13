import axios from 'axios';

const BASE_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi';
const TOOL = 'WellnessTrendRadar';
const EMAIL = 'wellness-trend-radar@example.com';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchKeywordPublicationCount(keyword) {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: {
        db: 'pubmed',
        term: keyword,
        retmode: 'json',
        rettype: 'count',
        tool: TOOL,
        email: EMAIL,
        datetype: 'pdat',
        reldate: 12,
      },
      timeout: 10000,
    });
    const count = parseInt(data?.esearchresult?.count ?? '0', 10);
    return {
      keyword,
      researchPapers: Math.min(count, 100),
    };
  } catch (err) {
    console.error(`pubmed.fetchKeywordPublicationCount: ${keyword}`, err.message);
    return { keyword, researchPapers: 0 };
  }
}

export async function fetchAllPublicationCounts(keywords) {
  const results = [];
  for (const keyword of keywords) {
    const result = await fetchKeywordPublicationCount(keyword);
    results.push(result);
    await delay(400);
  }
  return results;
}
