import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ContactLead from '@/backend/src/models/ContactLead';

export async function GET() {
  try {
    await connectDB();
    const leads = await ContactLead.find().sort({ created_at: -1 }).lean();

    // Map _id to id for the frontend
    const mappedLeads = leads.map(lead => ({
      ...lead,
      id: lead._id.toString(),
      _id: undefined
    }));

    return NextResponse.json({ success: true, data: mappedLeads }, { status: 200 });
  } catch (err) {
    console.error('[ERROR] GET /api/admin/contact-leads:', err);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
