import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Audit from '@/backend/src/models/Audit';

export async function GET() {
  try {
    await connectDB();
    const audits = await Audit.find().sort({ created_at: -1 });
    return NextResponse.json({ success: true, data: audits }, { status: 200 });
  } catch (err) {
    console.error('[ERROR] GET /api/admin/audits:', err);
    return NextResponse.json({ success: false, message: err.message || 'Internal server error' }, { status: 500 });
  }
}
