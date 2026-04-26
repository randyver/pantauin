const SIRUP_BASE = 'https://sirup.inaproc.id';
const BGN_KLDI = 'L112'; // Badan Gizi Nasional

const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/javascript, */*; q=0.01',
  'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
  'X-Requested-With': 'XMLHttpRequest',
};

export interface RupPackage {
  id: string;
  satker: string;
  namaPaket: string;
  paguAnggaran: number;
  metodePengadaan: string;
  sumberDana: string;
  rencanaAwal: string;
  detailUrl: string;
}

interface SirupResponse {
  aaData: string[][];
  iTotalDisplayRecords: number;
  sEcho: number;
}

function parseRow(row: string[]): RupPackage {
  return {
    id: row[0],
    satker: row[1],
    namaPaket: row[2],
    paguAnggaran: parseInt(row[3]) || 0,
    metodePengadaan: row[4],
    sumberDana: row[5],
    rencanaAwal: row[7] || '',
    detailUrl: `${SIRUP_BASE}/sirup/home/detailPaketPenyediaPublic2017/${row[0]}`,
  };
}

export async function fetchKldiPackages(
  kldiCode: string,
  options: { start?: number; length?: number; search?: string; tahun?: number } = {}
): Promise<{ packages: RupPackage[]; total: number }> {
  const { start = 0, length = 100, search = '', tahun = 2026 } = options;

  const params = new URLSearchParams({
    idKldi: kldiCode,
    tahun: tahun.toString(),
    iDisplayStart: start.toString(),
    iDisplayLength: length.toString(),
  });
  if (search) params.set('sSearch', search);

  const referer = `${SIRUP_BASE}/sirup/rekap/penyedia/${kldiCode}`;
  const url = `${SIRUP_BASE}/sirup/datatablectr/dataruppenyediakldi?${params}`;

  const res = await fetch(url, {
    headers: { ...BROWSER_HEADERS, Referer: referer },
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`INAPROC fetch failed: ${res.status}`);

  const data: SirupResponse = await res.json();
  return {
    packages: data.aaData.map(parseRow),
    total: data.iTotalDisplayRecords,
  };
}

export async function fetchBgnPackages(options: {
  search?: string;
  tahun?: number;
  maxPages?: number;
} = {}): Promise<RupPackage[]> {
  const { search = '', tahun = 2026, maxPages = 12 } = options;
  const pageSize = 100;

  const first = await fetchKldiPackages(BGN_KLDI, { start: 0, length: pageSize, search, tahun });
  const total = Math.min(first.total, maxPages * pageSize);
  const packages = [...first.packages];

  const pagePromises = [];
  for (let start = pageSize; start < total; start += pageSize) {
    pagePromises.push(fetchKldiPackages(BGN_KLDI, { start, length: pageSize, search, tahun }));
  }

  const pages = await Promise.all(pagePromises);
  pages.forEach(p => packages.push(...p.packages));

  return packages;
}

export async function fetchProvinceMbgPackages(
  kldiCode: string,
  tahun = 2026
): Promise<RupPackage[]> {
  const keywords = ['bergizi', 'SPPG', 'MBG', 'gizi'];

  const results = await Promise.allSettled(
    keywords.map(kw => fetchKldiPackages(kldiCode, { search: kw, length: 50, tahun }))
  );

  const seen = new Set<string>();
  const packages: RupPackage[] = [];

  results.forEach(r => {
    if (r.status === 'fulfilled') {
      r.value.packages.forEach(p => {
        if (!seen.has(p.id)) {
          seen.add(p.id);
          packages.push(p);
        }
      });
    }
  });

  return packages;
}
