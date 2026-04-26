import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { MbgStaticData } from '@/types/mbg';

const DATA_PATH = join(process.cwd(), 'public', 'data', 'mbg-data.json');

export async function GET(_request: NextRequest) {
  if (!existsSync(DATA_PATH)) {
    return NextResponse.json(
      { error: 'Data belum digenerate. Jalankan: npm run generate-data' },
      { status: 404 }
    );
  }

  try {
    const raw = readFileSync(DATA_PATH, 'utf-8');
    const data: MbgStaticData = JSON.parse(raw);
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch {
    return NextResponse.json({ error: 'Gagal membaca data' }, { status: 500 });
  }
}
