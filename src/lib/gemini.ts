import { GoogleGenAI } from '@google/genai';
import type { RupPackage } from './inaproc';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export interface AnomalyResult {
  packageId: string;
  anomalyScore: number; // 0-100
  flags: string[];
  reason: string;
  suggestedProvince?: string;
}

export interface ProvinceInsight {
  provinceId: string;
  summary: string;
  riskLevel: 'Kritis' | 'Tinggi' | 'Sedang' | 'Rendah';
  topConcern: string;
}

const ANOMALY_PROMPT = (packages: RupPackage[]) => `
Kamu adalah analis pengadaan pemerintah Indonesia yang ahli dalam program MBG (Makan Bergizi Gratis).

Analisis paket-paket pengadaan berikut dari INAPROC/SiRUP dan identifikasi anomali atau kecurigaan.

DATA PAKET:
${JSON.stringify(packages.map(p => ({
  id: p.id,
  nama: p.namaPaket,
  nilai: p.paguAnggaran,
  metode: p.metodePengadaan,
  satker: p.satker,
  rencana: p.rencanaAwal,
})), null, 2)}

Untuk setiap paket, berikan:
1. anomalyScore (0-100): seberapa mencurigakan (100 = sangat mencurigakan)
2. flags: array flag masalah (misal: "Nilai terlalu tinggi", "Deskripsi tidak jelas", "Metode tidak sesuai")
3. reason: 1 kalimat alasan singkat
4. suggestedProvince: jika nama paket menyebut provinsi/daerah, extract nama provinsinya (null jika tidak ada)

Pertimbangkan anomali seperti:
- Nilai pagu yang tidak wajar untuk kegiatan MBG (terlalu tinggi atau terlalu rendah)
- Nama paket ambigu/terlalu umum (hanya "Belanja Bahan" tanpa detail)
- Metode pengadaan tidak sesuai (E-Purchasing untuk nilai besar tanpa alasan)
- Nilai lebih dari Rp5 miliar untuk paket makan harian yang mencurigakan
- Paket administrasi yang tidak relevan dengan MBG tapi bernilai besar

Jawab HANYA dengan JSON array:
[{"packageId": "...", "anomalyScore": 0-100, "flags": [...], "reason": "...", "suggestedProvince": "..." or null}]
`;

const PROVINCE_INSIGHT_PROMPT = (provinceName: string, packages: RupPackage[], anomalies: AnomalyResult[]) => `
Kamu adalah analis risiko program MBG (Makan Bergizi Gratis) Indonesia.

Provinsi: ${provinceName}
Total paket MBG: ${packages.length}
Total anggaran: Rp ${packages.reduce((s, p) => s + p.paguAnggaran, 0).toLocaleString('id-ID')}
Paket anomali (score >60): ${anomalies.filter(a => a.anomalyScore > 60).length}

Top 3 paket anomali:
${anomalies.sort((a,b) => b.anomalyScore - a.anomalyScore).slice(0, 3).map(a => {
  const pkg = packages.find(p => p.id === a.packageId);
  return `- ${pkg?.namaPaket}: ${a.reason}`;
}).join('\n')}

Buat analisis singkat dalam Bahasa Indonesia (2-3 kalimat) tentang risiko pengadaan MBG di provinsi ini.
Tentukan juga level risiko: Kritis (>3 anomali besar), Tinggi (1-3), Sedang (ada potensi), Rendah (aman).
Sebutkan 1 concern utama.

Jawab HANYA dengan JSON:
{"summary": "...", "riskLevel": "Kritis|Tinggi|Sedang|Rendah", "topConcern": "..."}
`;

export async function analyzePackages(packages: RupPackage[]): Promise<AnomalyResult[]> {
  if (packages.length === 0) return [];

  const BATCH_SIZE = 20;
  const results: AnomalyResult[] = [];

  for (let i = 0; i < packages.length; i += BATCH_SIZE) {
    const batch = packages.slice(i, i + BATCH_SIZE);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: ANOMALY_PROMPT(batch),
      });

      const text = response.text ?? '';
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed: AnomalyResult[] = JSON.parse(jsonMatch[0]);
        results.push(...parsed);
      }
    } catch {
      batch.forEach(p => results.push({
        packageId: p.id,
        anomalyScore: 0,
        flags: [],
        reason: 'Analisis tidak tersedia',
      }));
    }
  }

  return results;
}

export async function generateProvinceInsight(
  provinceId: string,
  provinceName: string,
  packages: RupPackage[],
  anomalies: AnomalyResult[]
): Promise<ProvinceInsight> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: PROVINCE_INSIGHT_PROMPT(provinceName, packages, anomalies),
    });

    const text = response.text ?? '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return { provinceId, ...parsed };
    }
  } catch { /* fall through */ }

  return {
    provinceId,
    summary: `Data pengadaan MBG untuk ${provinceName} sedang dalam pemrosesan.`,
    riskLevel: 'Sedang',
    topConcern: 'Data tidak lengkap',
  };
}
