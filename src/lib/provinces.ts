export interface Province {
  id: string;
  name: string;
  kldiCode: string;
  coordinates: { lat: number; lng: number };
}

export const PROVINCES: Province[] = [
  { id: 'sumut', name: 'Sumatera Utara', kldiCode: 'D61', coordinates: { lat: 3.5952, lng: 98.6722 } },
  { id: 'sumbar', name: 'Sumatera Barat', kldiCode: 'D239', coordinates: { lat: -0.7399, lng: 100.8000 } },
  { id: 'riau', name: 'Riau', kldiCode: 'D258', coordinates: { lat: 0.2933, lng: 101.7068 } },
  { id: 'kepri', name: 'Kepulauan Riau', kldiCode: 'D736', coordinates: { lat: 1.0, lng: 104.0 } },
  { id: 'jambi', name: 'Jambi', kldiCode: 'D269', coordinates: { lat: -1.6101, lng: 103.6131 } },
  { id: 'sumsel', name: 'Sumatera Selatan', kldiCode: 'D280', coordinates: { lat: -3.3194, lng: 103.9144 } },
  { id: 'babel', name: 'Bangka Belitung', kldiCode: 'D783', coordinates: { lat: -2.7411, lng: 106.4406 } },
  { id: 'bengkulu', name: 'Bengkulu', kldiCode: 'D308', coordinates: { lat: -3.5778, lng: 102.3464 } },
  { id: 'lampung', name: 'Lampung', kldiCode: 'D318', coordinates: { lat: -4.5586, lng: 105.4068 } },
  { id: 'dki', name: 'DKI Jakarta', kldiCode: 'D334', coordinates: { lat: -6.2088, lng: 106.8456 } },
  { id: 'jabar', name: 'Jawa Barat', kldiCode: 'D95', coordinates: { lat: -6.9175, lng: 107.6191 } },
  { id: 'banten', name: 'Banten', kldiCode: 'D713', coordinates: { lat: -6.4058, lng: 106.0640 } },
  { id: 'jateng', name: 'Jawa Tengah', kldiCode: 'D462', coordinates: { lat: -7.1510, lng: 110.1403 } },
  { id: 'diy', name: 'DI Yogyakarta', kldiCode: 'D784', coordinates: { lat: -7.7971, lng: 110.3705 } },
  { id: 'jatim', name: 'Jawa Timur', kldiCode: 'D473', coordinates: { lat: -7.5361, lng: 112.2384 } },
  { id: 'bali', name: 'Bali', kldiCode: 'D621', coordinates: { lat: -8.4095, lng: 115.1889 } },
  { id: 'ntb', name: 'Nusa Tenggara Barat', kldiCode: 'D631', coordinates: { lat: -8.6529, lng: 117.3616 } },
  { id: 'ntt', name: 'Nusa Tenggara Timur', kldiCode: 'D642', coordinates: { lat: -8.6574, lng: 121.0794 } },
  { id: 'kalbar', name: 'Kalimantan Barat', kldiCode: 'D508', coordinates: { lat: -0.2788, lng: 111.4753 } },
  { id: 'kalteng', name: 'Kalimantan Tengah', kldiCode: 'D55', coordinates: { lat: -1.6815, lng: 113.3824 } },
  { id: 'kalsel', name: 'Kalimantan Selatan', kldiCode: 'D533', coordinates: { lat: -3.0926, lng: 115.2838 } },
  { id: 'kaltim', name: 'Kalimantan Timur', kldiCode: 'D18', coordinates: { lat: 0.5387, lng: 116.4194 } },
  { id: 'kaltara', name: 'Kalimantan Utara', kldiCode: 'D762', coordinates: { lat: 3.0731, lng: 116.0414 } },
  { id: 'sulut', name: 'Sulawesi Utara', kldiCode: 'D554', coordinates: { lat: 0.6247, lng: 123.9750 } },
  { id: 'gorontalo', name: 'Gorontalo', kldiCode: 'D729', coordinates: { lat: 0.6999, lng: 122.4467 } },
  { id: 'sulteng', name: 'Sulawesi Tengah', kldiCode: 'D569', coordinates: { lat: -1.4300, lng: 121.4456 } },
  { id: 'sultra', name: 'Sulawesi Tenggara', kldiCode: 'D604', coordinates: { lat: -4.1449, lng: 122.1746 } },
  { id: 'sulsel', name: 'Sulawesi Selatan', kldiCode: 'D580', coordinates: { lat: -3.6688, lng: 119.9741 } },
  { id: 'sulbar', name: 'Sulawesi Barat', kldiCode: 'D756', coordinates: { lat: -2.8440, lng: 119.2321 } },
  { id: 'maluku', name: 'Maluku', kldiCode: 'D664', coordinates: { lat: -3.2385, lng: 130.1453 } },
  { id: 'malut', name: 'Maluku Utara', kldiCode: 'D806', coordinates: { lat: 1.5710, lng: 127.8088 } },
  { id: 'papbar', name: 'Papua Barat', kldiCode: 'D808', coordinates: { lat: -1.3361, lng: 133.1747 } },
  { id: 'papua', name: 'Papua', kldiCode: 'D102', coordinates: { lat: -4.2699, lng: 138.0804 } },
];

export function findProvinceByName(name: string): Province | undefined {
  const normalized = name.toLowerCase();
  return PROVINCES.find(p => {
    const pName = p.name.toLowerCase();
    return normalized.includes(pName) || pName.includes(normalized.split(' ')[0]);
  });
}
