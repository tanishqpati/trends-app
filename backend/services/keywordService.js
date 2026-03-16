import config from '../config/index.js';
import CustomKeyword from '../models/CustomKeyword.js';

export async function getAllKeywords() {
  const base = config.wellnessKeywords ?? [];
  const custom = await CustomKeyword.find().lean();
  const customKeys = custom.map((c) => c.keyword.toLowerCase().trim());
  const combined = [...new Set([...base.map((k) => k.toLowerCase()), ...customKeys])];
  return combined;
}

export async function getCustomKeywords() {
  const docs = await CustomKeyword.find().lean();
  return docs.map((d) => ({ _id: d._id, keyword: d.keyword }));
}

export async function addCustomKeyword(keyword) {
  const k = keyword?.trim().toLowerCase();
  if (!k) return null;
  const existing = await CustomKeyword.findOne({ keyword: k });
  if (existing) return existing;
  const doc = await CustomKeyword.create({ keyword: k });
  return doc;
}

export async function removeCustomKeyword(keyword) {
  const k = keyword?.trim().toLowerCase();
  if (!k) return false;
  const result = await CustomKeyword.deleteOne({ keyword: k });
  return result.deletedCount > 0;
}

export async function removeCustomKeywordById(id) {
  const result = await CustomKeyword.findByIdAndDelete(id);
  return !!result;
}
