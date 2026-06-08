import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ContactLead from '@/lib/models/ContactLead';

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const { name, email, subject, message } = data;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
    }

    const lead = await ContactLead.create({ name, email, subject, message });
    return NextResponse.json({ success: true, data: { id: lead.id } }, { status: 201 });
  } catch (err) {
    console.error('[ERROR] POST /api/contact:', err);
    return NextResponse.json({ success: false, message: err.message || 'Internal server error' }, { status: 500 });
  }
}

