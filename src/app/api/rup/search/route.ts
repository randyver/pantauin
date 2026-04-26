import { NextRequest, NextResponse } from 'next/server';

const SIRUP_ORIGIN = 'https://sirup.inaproc.id';
const SIRUP_SEARCH_PATH = '/sirup/caripaketctr/search';

const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/javascript, */*; q=0.01',
  'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
  'Referer': `${SIRUP_ORIGIN}/sirup/ro/rekap/kldi/K10`,
  'Origin': SIRUP_ORIGIN,
  'X-Requested-With': 'XMLHttpRequest',
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const targetUrl = `${SIRUP_ORIGIN}${SIRUP_SEARCH_PATH}?${searchParams.toString()}`;

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: BROWSER_HEADERS,
      redirect: 'follow',
    });

    const body = await response.text();
    return new NextResponse(body, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'application/json; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Proxy error' },
      { status: 500 }
    );
  }
}
