import * as keywordService from '../services/keywordService.js';

export async function getKeywords(_req, res) {
  try {
    const keywords = await keywordService.getAllKeywords();
    const custom = await keywordService.getCustomKeywords();
    res.json({ keywords, custom });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function addKeyword(req, res) {
  try {
    const { keyword } = req.body;
    if (!keyword || typeof keyword !== 'string') {
      return res.status(400).json({ error: 'keyword is required' });
    }
    const doc = await keywordService.addCustomKeyword(keyword);
    if (!doc) return res.status(400).json({ error: 'Invalid keyword' });
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function removeKeyword(req, res) {
  try {
    const { id } = req.params;
    const ok = await keywordService.removeCustomKeywordById(id);
    if (!ok) return res.status(404).json({ error: 'Keyword not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
