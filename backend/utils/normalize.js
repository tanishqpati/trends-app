export function minMaxNormalize(value, min, max) {
  if (max === min || max === undefined || min === undefined) return 0;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

export function normalizeArray(values) {
  if (!values?.length) return values;
  const min = Math.min(...values);
  const max = Math.max(...values);
  return values.map((v) => minMaxNormalize(v, min, max));
}

export function getMinMax(arr, getter = (x) => x) {
  const vals = arr.map(getter).filter((v) => typeof v === 'number' && !Number.isNaN(v));
  if (vals.length === 0) return { min: 0, max: 1 };
  return { min: Math.min(...vals), max: Math.max(...vals) };
}
