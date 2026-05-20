export interface RupPackageEnriched {
  id: string;
  namaPaket: string;
  satker: string;
  paguAnggaran: number;
  metodePengadaan: string;
  sumberDana: string;
  rencanaAwal: string;
  detailUrl: string;
  anomalyScore: number;
  anomalyFlags: string[];
  anomalyReason: string;
}

export interface MbgProvinceData {
  provinceId: string;
  provinceName: string;
  lat: number | null;
  lng: number | null;
  packages: RupPackageEnriched[];
  totalAnggaran: number;
  anomalyCount: number;
  riskScore: number;
}

export interface MbgStaticData {
  provinces: MbgProvinceData[];
  bgnPackages: RupPackageEnriched[];
  totalNasional: number;
  totalAnomali: number;
  generatedAt: string;
}
