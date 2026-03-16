import axios from 'axios';

const API_BASE =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? '/api' : 'http://localhost:3001/api');

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export async function getTrends() {
  const { data } = await api.get('/trends');
  return data;
}

export async function getTopTrends(limit = 10) {
  const { data } = await api.get('/trends/top', { params: { limit } });
  return data;
}

export async function getTrendById(id) {
  const { data } = await api.get(`/trends/${id}`);
  return data;
}

export async function getOpportunities() {
  const { data } = await api.get('/opportunities');
  return data;
}

export async function getPipelineStatus() {
  const { data } = await api.get('/pipeline/status');
  return data;
}
