import mongoose from 'mongoose';

const contactLeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.ContactLead || mongoose.model('ContactLead', contactLeadSchema);
