// app/api/holidays/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const revalidate = 86400; // 24 hours in seconds
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const currentYear = new Date().getFullYear();
    const response = await fetch(
      `https://holidayapi.com/v1/holidays?pretty&key=${process.env.HOLIDAY_API_KEY}&country=BR&year=${currentYear}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        // Add fetch caching to the external API request
        next: {
          revalidate: 86400 // 24 hours in seconds
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch holidays');
    }

    const data = await response.json();
    
    // Only return the necessary data
    const holidays = data.holidays.map((holiday: any) => ({
      date: holiday.date,
      public: holiday.public,
      name: holiday.name,
    }));

    // Return with specific cache headers
    return new NextResponse(JSON.stringify({ holidays }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200'
      }
    });
  } catch (error) {
    console.error('Error fetching holidays:', error);
    return NextResponse.json(
      { error: 'Failed to fetch holidays' },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store'
        }
      }
    );
  }
}