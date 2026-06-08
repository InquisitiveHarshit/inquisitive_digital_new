import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Audit from '@/lib/models/Audit';

export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const website = formData.get('website');
    const message = formData.get('message');

    if (!name || !email || !website || !message) {
      return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
    }

    const audit = await Audit.create({ name, email, website, message });
    return NextResponse.json({ success: true, data: { id: audit.id } }, { status: 201 });
  } catch (err) {
    console.error('[ERROR] POST /api/audit:', err);
    return NextResponse.json({ success: false, message: err.message || 'Internal server error' }, { status: 500 });
  }
}

