// pages/api/maps-embed.ts or app/api/maps-embed/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }

  const url = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_API_KEY}&q=${encodeURIComponent(address+', Loterias Boa Sorte')}`;

  console.log({ url });

  return NextResponse.json({ url });
}
