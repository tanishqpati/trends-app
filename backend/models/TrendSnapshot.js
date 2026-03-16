import mongoose from 'mongoose';

const trendSnapshotSchema = new mongoose.Schema(
  {
    keyword: { type: String, required: true, index: true },
    name: { type: String, required: true },
    metrics: Object,
    scores: Object,
    trendType: String,
    recordedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

trendSnapshotSchema.index({ keyword: 1, recordedAt: -1 });

export default mongoose.model('TrendSnapshot', trendSnapshotSchema);
