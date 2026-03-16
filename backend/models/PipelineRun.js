import mongoose from 'mongoose';

const pipelineRunSchema = new mongoose.Schema(
  {
    status: { type: String, enum: ['running', 'success', 'error'], required: true },
    trendsStored: { type: Number, default: 0 },
    errorMessage: { type: String },
  },
  { timestamps: true }
);

pipelineRunSchema.index({ createdAt: -1 });

export default mongoose.model('PipelineRun', pipelineRunSchema);
