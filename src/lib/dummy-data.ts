export interface ProvinceData {
  id: string;
  name: string;
  riskScore: number;
  procurementValue: number;
  packagesCount: number;
  vendorsCount: number;
  schoolsCount: number;
  beneficiariesCount: number;
  incidentsCount: number;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  dominantVendor: string;
  coordinates: { lat: number; lng: number };
}

export const provincesData: ProvinceData[] = [
  {
    id: 'jb',
    name: 'Jawa Barat',
    riskScore: 88,
    procurementValue: 12500000000,
    packagesCount: 450,
    vendorsCount: 120,
    schoolsCount: 1200,
    beneficiariesCount: 450000,
    incidentsCount: 24,
    severity: 'Critical',
    dominantVendor: 'PT Pangan Mandiri Nusantara',
    coordinates: { lat: -6.9175, lng: 107.6191 },
  },
  {
    id: 'jt',
    name: 'Jawa Tengah',
    riskScore: 65,
    procurementValue: 8400000000,
    packagesCount: 320,
    vendorsCount: 85,
    schoolsCount: 950,
    beneficiariesCount: 320000,
    incidentsCount: 12,
    severity: 'High',
    dominantVendor: 'CV Berkah Tani Mulia',
    coordinates: { lat: -7.0051, lng: 110.4381 },
  },
  {
    id: 'ji',
    name: 'Jawa Timur',
    riskScore: 72,
    procurementValue: 9800000000,
    packagesCount: 380,
    vendorsCount: 95,
    schoolsCount: 1100,
    beneficiariesCount: 380000,
    incidentsCount: 15,
    severity: 'High',
    dominantVendor: 'PT Agro Industri Utama',
    coordinates: { lat: -7.2575, lng: 112.7521 },
  },
  {
    id: 'su',
    name: 'Sumatera Utara',
    riskScore: 45,
    procurementValue: 5200000000,
    packagesCount: 180,
    vendorsCount: 40,
    schoolsCount: 600,
    beneficiariesCount: 180000,
    incidentsCount: 5,
    severity: 'Medium',
    dominantVendor: 'CV Sinar Tani',
    coordinates: { lat: 3.5952, lng: 98.6722 },
  },
  {
    id: 'ss',
    name: 'Sulawesi Selatan',
    riskScore: 30,
    procurementValue: 4100000000,
    packagesCount: 150,
    vendorsCount: 35,
    schoolsCount: 500,
    beneficiariesCount: 150000,
    incidentsCount: 3,
    severity: 'Low',
    dominantVendor: 'PT Celebes Pangan',
    coordinates: { lat: -5.1476, lng: 119.4327 },
  },
];

export interface Incident {
  id: string;
  title: string;
  location: string;
  province: string;
  date: string;
  type: 'Keracunan' | 'Makanan Basi' | 'Benda Asing' | 'Porsi Tidak Sesuai' | 'Kualitas Buruk';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Investigating' | 'Resolved' | 'Escalated' | 'Closed';
  victims: number;
  schoolsAffected: number;
  vendor: string;
  procurementValue: number;
  source: string;
}

export const recentIncidents: Incident[] = [
  {
    id: 'inc-001',
    title: 'Keracunan Massal SD di Bandung Barat',
    location: 'Kab. Bandung Barat',
    province: 'Jawa Barat',
    date: '2026-04-25T10:30:00Z',
    type: 'Keracunan',
    severity: 'Critical',
    status: 'Investigating',
    victims: 124,
    schoolsAffected: 3,
    vendor: 'PT Pangan Mandiri Nusantara',
    procurementValue: 1200000000,
    source: 'X (Twitter), Local News',
  },
  {
    id: 'inc-002',
    title: 'Temuan Benda Asing pada Lauk Pauk',
    location: 'Surakarta',
    province: 'Jawa Tengah',
    date: '2026-04-24T14:15:00Z',
    type: 'Benda Asing',
    severity: 'Medium',
    status: 'Resolved',
    victims: 0,
    schoolsAffected: 1,
    vendor: 'CV Berkah Tani Mulia',
    procurementValue: 450000000,
    source: 'Official Report',
  },
  {
    id: 'inc-003',
    title: 'Susu Basi di Distribusi Pagi',
    location: 'Sidoarjo',
    province: 'Jawa Timur',
    date: '2026-04-24T07:45:00Z',
    type: 'Makanan Basi',
    severity: 'High',
    status: 'Escalated',
    victims: 45,
    schoolsAffected: 2,
    vendor: 'PT Agro Industri Utama',
    procurementValue: 800000000,
    source: 'TikTok, Instagram',
  },
];

export const statsOverview = [
  { label: 'Total Schools Monitored', value: '15,240', change: '+12%', type: 'neutral' },
  { label: 'Total SPPG Vendors', value: '1,842', change: '+5%', type: 'neutral' },
  { label: 'Active High Risk Regions', value: '12', change: '+2', type: 'negative' },
  { label: 'Incidents This Month', value: '84', change: '-15%', type: 'positive' },
  { label: 'Total Procurement Value', value: 'Rp 45.2T', change: '+8%', type: 'neutral' },
  { label: 'Critical Priority Regions', value: '4', change: '0', type: 'neutral' },
];

export const socialSignals = {
  keywords: [
    { text: '#KeracunanMBG', count: 1240, sentiment: 'negative' },
    { text: '#AyamBasi', count: 850, sentiment: 'negative' },
    { text: '#MakanSiangSekolah', count: 2100, sentiment: 'positive' },
    { text: '#SPPG', count: 420, sentiment: 'neutral' },
    { text: '#MBGAlert', count: 670, sentiment: 'negative' },
    { text: '#VendorBermasalah', count: 310, sentiment: 'negative' },
  ],
  trends: [
    { date: '2026-04-20', mentions: 450, positive: 300, negative: 50, neutral: 100 },
    { date: '2026-04-21', mentions: 520, positive: 320, negative: 80, neutral: 120 },
    { date: '2026-04-22', mentions: 890, positive: 400, negative: 350, neutral: 140 },
    { date: '2026-04-23', mentions: 1200, positive: 500, negative: 550, neutral: 150 },
    { date: '2026-04-24', mentions: 980, positive: 450, negative: 380, neutral: 150 },
    { date: '2026-04-25', mentions: 1450, positive: 600, negative: 650, neutral: 200 },
  ],
};

export const alerts = [
  {
    id: 'alt-001',
    title: 'Spike in Negative Sentiment - Bandung',
    severity: 'High',
    timestamp: '2 mins ago',
    source: 'Social Listening Engine',
    recommendation: 'Immediate field verification in Bandung Barat area.',
  },
  {
    id: 'alt-002',
    title: 'Vendor Compliance Alert',
    severity: 'Medium',
    timestamp: '15 mins ago',
    source: 'Procurement Intelligence',
    recommendation: 'Audit PT Pangan Mandiri Nusantara for distribution logs.',
  },
  {
    id: 'alt-003',
    title: 'Delayed Report: Sidoarjo',
    severity: 'Low',
    timestamp: '1 hour ago',
    source: 'Official Feed',
    recommendation: 'Request data update from regional coordinator.',
  },
];
