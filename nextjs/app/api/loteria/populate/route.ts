import { NextResponse } from 'next/server';
import { populateLatestResults } from '@/services/populate-loterias-results';

export async function POST() {
  try {
    await populateLatestResults();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to populate results' },
      { status: 500 }
    );
  }
}
