import mongoose from 'mongoose';

const trendSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    keyword: { type: String, required: true, index: true },
    metrics: {
      searchGrowth: { type: Number, default: 0 },
      redditMentions: { type: Number, default: 0 },
      youtubeMentions: { type: Number, default: 0 },
      researchPapers: { type: Number, default: 0 },
      competitionScore: { type: Number, default: 0 },
    },
    scores: {
      velocityScore: { type: Number, default: 0 },
      marketPotential: { type: Number, default: 0 },
      trendScore: { type: Number, default: 0 },
    },
    trendType: { type: String, enum: ['FAD', 'REAL_TREND'], default: 'REAL_TREND' },
    opportunityBrief: {
      whyNow: String,
      opportunity: String,
      marketPotential: String,
      competitionGap: String,
    },
    evidence: {
      googleTrendData: Array,
      redditPosts: Array,
      youtubeVideos: Array,
    },
  },
  { timestamps: true }
);

trendSchema.index({ 'scores.trendScore': -1, createdAt: -1 });
trendSchema.index({ trendType: 1 });

export default mongoose.model('Trend', trendSchema);
