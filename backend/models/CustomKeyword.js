import mongoose from 'mongoose';

const customKeywordSchema = new mongoose.Schema(
  {
    keyword: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

customKeywordSchema.index({ keyword: 1 });

export default mongoose.model('CustomKeyword', customKeywordSchema);
