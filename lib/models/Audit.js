import mongoose from 'mongoose';

const auditSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String, required: true },
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.Audit || mongoose.model('Audit', auditSchema);
