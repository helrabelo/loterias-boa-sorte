import { NextResponse } from 'next/server';
import { updateAllResults } from '@/services/loteria';

export async function GET() {
  try {
    await updateAllResults();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Cron job failed:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
