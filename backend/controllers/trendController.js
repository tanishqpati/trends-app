import * as trendService from '../services/trendService.js';

export async function getTrends(_req, res) {
  try {
    const trends = await trendService.getAllTrends();
    res.json(trends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getTopTrends(req, res) {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const trends = await trendService.getTopTrends(limit);
    res.json(trends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getTrendById(req, res) {
  try {
    const trend = await trendService.getTrendById(req.params.id);
    if (!trend) {
      return res.status(404).json({ error: 'Trend not found' });
    }
    res.json(trend);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getOpportunities(_req, res) {
  try {
    const trends = await trendService.getOpportunities();
    res.json(trends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getTrendHistory(req, res) {
  try {
    const trend = await trendService.getTrendById(req.params.id);
    if (!trend) return res.status(404).json({ error: 'Trend not found' });
    const history = await trendService.getTrendHistory(trend.keyword);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
