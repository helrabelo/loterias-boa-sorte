import { NextResponse } from 'next/server';
import { populateAllHistoricalResults } from '@/services/populate-previous-results';

export async function POST(request: Request) {
  try {
    const stats = await populateAllHistoricalResults();
    return NextResponse.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Failed to populate historical results:', error);
    return NextResponse.json(
      { error: 'Failed to populate historical results' },
      { status: 500 }
    );
  }
}