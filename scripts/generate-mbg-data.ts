/**
 * Script: generate-mbg-data
 * Fetches MBG procurement data from INAPROC, analyzes anomalies with Gemini,
 * and saves the result to public/data/mbg-data.json.
 *
 * Run: npm run generate-data
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { GoogleGenAI } from '@google/genai';

// ── Config ────────────────────────────────────────────────────────────────────

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? '';
const SIRUP_BASE = 'https://sirup.inaproc.id';
const BGN_KLDI = 'L112';
const TAHUN = 2026;
const OUTPUT_PATH = join(process.cwd(), 'public', 'data', 'mbg-data.json');

const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/javascript, */*; q=0.01',
  'Accept-Language': 'id-ID,id;q=0.9',
  'X-Requested-With': 'XMLHttpRequest',
};

// ── Types ─────────────────────────────────────────────────────────────────────

interface RawRow { id: string; satker: string; namaPaket: string; paguAnggaran: number; metodePengadaan: string; sumberDana: string; rencanaAwal: string; detailUrl: string; }
interface AnomalyResult { packageId: string; anomalyScore: number; flags: string[]; reason: string; suggestedProvince?: string | null; }
interface ProvinceData { provinceId: string; provinceName: string; packages: EnrichedPackage[]; totalAnggaran: number; anomalyCount: number; riskScore: number; }
interface EnrichedPackage extends RawRow { anomalyScore: number; anomalyFlags: string[]; anomalyReason: string; }

// ── Provinces ─────────────────────────────────────────────────────────────────

const PROVINCES = [
  { id: 'sumut',    name: 'Sumatera Utara',      kldiCode: 'D61'  },
  { id: 'sumbar',   name: 'Sumatera Barat',       kldiCode: 'D239' },
  { id: 'riau',     name: 'Riau',                 kldiCode: 'D258' },
  { id: 'kepri',    name: 'Kepulauan Riau',        kldiCode: 'D736' },
  { id: 'jambi',    name: 'Jambi',                kldiCode: 'D269' },
  { id: 'sumsel',   name: 'Sumatera Selatan',      kldiCode: 'D280' },
  { id: 'babel',    name: 'Bangka Belitung',       kldiCode: 'D783' },
  { id: 'bengkulu', name: 'Bengkulu',              kldiCode: 'D308' },
  { id: 'lampung',  name: 'Lampung',               kldiCode: 'D318' },
  { id: 'dki',      name: 'DKI Jakarta',           kldiCode: 'D334' },
  { id: 'jabar',    name: 'Jawa Barat',            kldiCode: 'D95'  },
  { id: 'banten',   name: 'Banten',                kldiCode: 'D713' },
  { id: 'jateng',   name: 'Jawa Tengah',           kldiCode: 'D462' },
  { id: 'diy',      name: 'DI Yogyakarta',         kldiCode: 'D784' },
  { id: 'jatim',    name: 'Jawa Timur',            kldiCode: 'D473' },
  { id: 'bali',     name: 'Bali',                  kldiCode: 'D621' },
  { id: 'ntb',      name: 'Nusa Tenggara Barat',   kldiCode: 'D631' },
  { id: 'ntt',      name: 'Nusa Tenggara Timur',   kldiCode: 'D642' },
  { id: 'kalbar',   name: 'Kalimantan Barat',      kldiCode: 'D508' },
  { id: 'kalteng',  name: 'Kalimantan Tengah',     kldiCode: 'D55'  },
  { id: 'kalsel',   name: 'Kalimantan Selatan',    kldiCode: 'D533' },
  { id: 'kaltim',   name: 'Kalimantan Timur',      kldiCode: 'D18'  },
  { id: 'kaltara',  name: 'Kalimantan Utara',      kldiCode: 'D762' },
  { id: 'sulut',    name: 'Sulawesi Utara',        kldiCode: 'D554' },
  { id: 'gorontalo',name: 'Gorontalo',             kldiCode: 'D729' },
  { id: 'sulteng',  name: 'Sulawesi Tengah',       kldiCode: 'D569' },
  { id: 'sultra',   name: 'Sulawesi Tenggara',     kldiCode: 'D604' },
  { id: 'sulsel',   name: 'Sulawesi Selatan',      kldiCode: 'D580' },
  { id: 'sulbar',   name: 'Sulawesi Barat',        kldiCode: 'D756' },
  { id: 'maluku',   name: 'Maluku',                kldiCode: 'D664' },
  { id: 'malut',    name: 'Maluku Utara',          kldiCode: 'D806' },
  { id: 'papbar',   name: 'Papua Barat',           kldiCode: 'D808' },
  { id: 'papua',    name: 'Papua',                 kldiCode: 'D102' },
];

// ── INAPROC fetcher ───────────────────────────────────────────────────────────

async function fetchPage(kldiCode: string, start: number, length: number, search = ''): Promise<{ rows: RawRow[]; total: number }> {
  const params = new URLSearchParams({
    idKldi: kldiCode, tahun: String(TAHUN),
    iDisplayStart: String(start), iDisplayLength: String(length),
  });
  if (search) params.set('sSearch', search);

  const url = `${SIRUP_BASE}/sirup/datatablectr/dataruppenyediakldi?${params}`;
  const res = await fetch(url, {
    headers: { ...BROWSER_HEADERS, Referer: `${SIRUP_BASE}/sirup/rekap/penyedia/${kldiCode}` },
  });

  if (!res.ok) throw new Error(`INAPROC ${kldiCode}: HTTP ${res.status}`);
  const data = await res.json() as { aaData: string[][]; iTotalDisplayRecords: number };

  return {
    total: data.iTotalDisplayRecords,
    rows: data.aaData.map(r => ({
      id: r[0], satker: r[1], namaPaket: r[2],
      paguAnggaran: parseInt(r[3]) || 0,
      metodePengadaan: r[4], sumberDana: r[5], rencanaAwal: r[7] ?? '',
      detailUrl: `${SIRUP_BASE}/sirup/home/detailPaketPenyediaPublic2017/${r[0]}`,
    })),
  };
}

async function fetchAllPages(kldiCode: string, search = '', maxPages = 5): Promise<RawRow[]> {
  const PAGE = 100;
  const first = await fetchPage(kldiCode, 0, PAGE, search);
  const rows = [...first.rows];
  const total = Math.min(first.total, maxPages * PAGE);

  const pages: Promise<{ rows: RawRow[]; total: number }>[] = [];
  for (let s = PAGE; s < total; s += PAGE) pages.push(fetchPage(kldiCode, s, PAGE, search));

  (await Promise.allSettled(pages)).forEach(r => {
    if (r.status === 'fulfilled') rows.push(...r.value.rows);
  });
  return rows;
}

// ── Gemini anomaly analysis ───────────────────────────────────────────────────

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function analyzePackages(packages: RawRow[]): Promise<AnomalyResult[]> {
  const BATCH = 25;
  const results: AnomalyResult[] = [];

  for (let i = 0; i < packages.length; i += BATCH) {
    const batch = packages.slice(i, i + BATCH);
    console.log(`  Analyzing batch ${Math.floor(i / BATCH) + 1}/${Math.ceil(packages.length / BATCH)} (${batch.length} paket)...`);

    const prompt = `Kamu adalah analis pengadaan pemerintah Indonesia, ahli program MBG (Makan Bergizi Gratis).

Analisis paket-paket pengadaan berikut dan identifikasi anomali.

DATA:
${JSON.stringify(batch.map(p => ({
  id: p.id, nama: p.namaPaket, nilai: p.paguAnggaran,
  metode: p.metodePengadaan, satker: p.satker,
})))}

Untuk setiap paket berikan:
- anomalyScore (0-100): seberapa mencurigakan (100 = sangat mencurigakan)
- flags: array singkat (maks 3), contoh: ["Nilai tidak wajar","Deskripsi ambigu"]
- reason: 1 kalimat alasan
- suggestedProvince: nama provinsi jika ada di nama paket, null jika tidak ada

Anomali yang perlu diperhatikan:
- Nilai pagu tidak wajar untuk jenis kegiatan (terlalu tinggi/rendah)
- Nama paket terlalu umum/ambigu ("Belanja Bahan" tanpa detail)
- Metode E-Purchasing untuk nilai sangat besar tanpa alasan
- Nilai >Rp10M untuk paket operasional kecil
- Duplikasi paket dengan nilai identik

Jawab HANYA JSON array (no markdown):
[{"packageId":"...","anomalyScore":0,"flags":[],"reason":"...","suggestedProvince":null}]`;

    try {
      const res = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
      const text = res.text ?? '';
      const match = text.match(/\[[\s\S]*\]/);
      if (match) results.push(...JSON.parse(match[0]) as AnomalyResult[]);
    } catch (e) {
      console.warn(`  Batch ${Math.floor(i / BATCH) + 1} failed:`, (e as Error).message);
      batch.forEach(p => results.push({ packageId: p.id, anomalyScore: 0, flags: [], reason: 'Analisis tidak tersedia' }));
    }

    // small delay between batches to avoid rate limiting
    if (i + BATCH < packages.length) await new Promise(r => setTimeout(r, 1500));
  }

  return results;
}

function enrich(rows: RawRow[], anomalies: AnomalyResult[]): EnrichedPackage[] {
  const map = new Map(anomalies.map(a => [a.packageId, a]));
  return rows.map(r => {
    const a = map.get(r.id);
    return { ...r, anomalyScore: a?.anomalyScore ?? 0, anomalyFlags: a?.flags ?? [], anomalyReason: a?.reason ?? '' };
  });
}

// ── Province matching ─────────────────────────────────────────────────────────

function matchProvince(name: string) {
  if (!name) return null;
  const q = name.toLowerCase();
  return PROVINCES.find(p => {
    const pn = p.name.toLowerCase();
    return q.includes(pn) || pn.split(' ').some(w => w.length > 4 && q.includes(w));
  }) ?? null;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  if (!GEMINI_API_KEY) { console.error('Missing GEMINI_API_KEY'); process.exit(1); }

  console.log('=== MBG Data Generator ===\n');
  mkdirSync(join(process.cwd(), 'public', 'data'), { recursive: true });

  // 1. Fetch BGN national packages
  console.log('📦 Fetching BGN (Badan Gizi Nasional) packages...');
  const bgnAll = await fetchAllPages(BGN_KLDI, '', 12);
  console.log(`   → ${bgnAll.length} paket total`);

  const bgnSppg = await fetchAllPages(BGN_KLDI, 'SPPG', 3);
  console.log(`   → ${bgnSppg.length} paket SPPG (dengan info provinsi)\n`);

  // 2. Analyze top BGN packages by value
  const topBgn = [...bgnAll].sort((a, b) => b.paguAnggaran - a.paguAnggaran).slice(0, 150);
  console.log(`🤖 Analyzing top ${topBgn.length} BGN packages with Gemini...`);
  const bgnAnomalies = await analyzePackages(topBgn);
  const bgnEnriched = enrich(topBgn, bgnAnomalies).sort((a, b) => b.anomalyScore - a.anomalyScore);
  console.log(`   → ${bgnAnomalies.filter(a => a.anomalyScore >= 60).length} paket terindikasi anomali\n`);

  // 3. Fetch MBG packages per province
  console.log('🗺️  Fetching MBG packages per province...');
  const provinceDataMap: Record<string, ProvinceData> = {};
  PROVINCES.forEach(p => {
    provinceDataMap[p.id] = {
      provinceId: p.id, provinceName: p.name,
      packages: [], totalAnggaran: 0, anomalyCount: 0, riskScore: 0,
    };
  });

  // Assign SPPG packages to provinces
  const sppgAnomalies = bgnAnomalies; // reuse BGN analysis for SPPG subset
  bgnSppg.forEach(pkg => {
    const anomaly = sppgAnomalies.find(a => a.packageId === pkg.id);
    const province = matchProvince(anomaly?.suggestedProvince ?? '') ?? matchProvince(pkg.namaPaket);
    if (!province) return;

    const pd = provinceDataMap[province.id];
    pd.packages.push({
      ...pkg,
      anomalyScore: anomaly?.anomalyScore ?? 0,
      anomalyFlags: anomaly?.flags ?? [],
      anomalyReason: anomaly?.reason ?? '',
    });
    pd.totalAnggaran += pkg.paguAnggaran;
    if ((anomaly?.anomalyScore ?? 0) >= 60) pd.anomalyCount++;
  });

  // Also fetch each province's own MBG packages
  for (const province of PROVINCES) {
    process.stdout.write(`   ${province.name}... `);
    try {
      const keywords = ['bergizi', 'SPPG', 'gizi'];
      const seen = new Set(provinceDataMap[province.id].packages.map(p => p.id));
      const provincePkgs: RawRow[] = [];

      for (const kw of keywords) {
        const rows = await fetchAllPages(province.kldiCode, kw, 1);
        rows.forEach(r => { if (!seen.has(r.id)) { seen.add(r.id); provincePkgs.push(r); } });
      }

      if (provincePkgs.length > 0) {
        const anomalies = await analyzePackages(provincePkgs);
        const enriched = enrich(provincePkgs, anomalies);
        const pd = provinceDataMap[province.id];
        enriched.forEach(p => {
          pd.packages.push(p);
          pd.totalAnggaran += p.paguAnggaran;
          if (p.anomalyScore >= 60) pd.anomalyCount++;
        });
        console.log(`${provincePkgs.length} paket`);
      } else {
        console.log('0 paket');
      }
    } catch (e) {
      console.log(`error: ${(e as Error).message}`);
    }

    await new Promise(r => setTimeout(r, 300));
  }

  // Calculate risk scores
  Object.values(provinceDataMap).forEach(pd => {
    pd.packages.sort((a, b) => b.anomalyScore - a.anomalyScore);
    if (pd.packages.length > 0) {
      pd.riskScore = Math.min(100, Math.round(
        (pd.anomalyCount / pd.packages.length) * 70 + pd.anomalyCount * 8
      ));
    }
  });

  // 4. Build output
  const totalNasional = bgnAll.reduce((s, p) => s + p.paguAnggaran, 0);
  const totalAnomali = bgnAnomalies.filter(a => a.anomalyScore >= 60).length;

  const output = {
    provinces: Object.values(provinceDataMap),
    bgnPackages: bgnEnriched,
    totalNasional,
    totalAnomali,
    generatedAt: new Date().toISOString(),
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`\n✅ Saved to ${OUTPUT_PATH}`);
  console.log(`   Total anggaran BGN: Rp ${(totalNasional / 1e12).toFixed(2)}T`);
  console.log(`   Paket anomali: ${totalAnomali}`);
  console.log(`   Provinsi dengan data: ${Object.values(provinceDataMap).filter(p => p.packages.length > 0).length}/${PROVINCES.length}`);
}

main().catch(e => { console.error(e); process.exit(1); });
