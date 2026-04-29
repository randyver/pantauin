// Data kontak pengaduan terkait program MBG

export interface KontakNasional {
  id: string;
  nama: string;
  deskripsi: string;
  telepon: string;
  email: string;
  website: string;
  alamat: string;
  kategori: 'pengawasan' | 'pengaduan' | 'penegakan';
}

export interface KontakProvinsi {
  id: string;
  provinsi: string;
  instansi: string;
  jenis: 'Dinas Pendidikan' | 'Dinas Kesehatan' | 'Inspektorat' | 'Ombudsman Perwakilan';
  telepon: string;
  email: string;
  website: string;
  alamat: string;
}

export interface KanalOnline {
  id: string;
  nama: string;
  url: string;
  deskripsi: string;
  jenis: 'Website' | 'Aplikasi' | 'Hotline';
  icon: 'globe' | 'smartphone' | 'phone';
}

// ==========================================
// KONTAK NASIONAL
// ==========================================
export const kontakNasional: KontakNasional[] = [
  {
    id: 'bgn',
    nama: 'Badan Gizi Nasional (BGN)',
    deskripsi: 'Pengelola utama program Makan Bergizi Gratis. Menerima pengaduan terkait kualitas makanan, distribusi, dan pelaksanaan program.',
    telepon: '(021) 5277-0505',
    email: 'pengaduan@bgn.go.id',
    website: 'https://bgn.go.id',
    alamat: 'Jl. HR Rasuna Said, Kuningan, Jakarta Selatan 12950',
    kategori: 'pengaduan',
  },
  {
    id: 'ombudsman',
    nama: 'Ombudsman Republik Indonesia',
    deskripsi: 'Lembaga pengawas pelayanan publik. Laporkan jika terjadi maladministrasi atau penyimpangan prosedur dalam program MBG.',
    telepon: '137',
    email: 'pengaduan@ombudsman.go.id',
    website: 'https://ombudsman.go.id',
    alamat: 'Jl. HR Rasuna Said Kav. C-19, Kuningan, Jakarta Selatan 12940',
    kategori: 'pengawasan',
  },
  {
    id: 'bpkp',
    nama: 'BPKP (Badan Pengawasan Keuangan dan Pembangunan)',
    deskripsi: 'Mengawasi pengelolaan keuangan negara termasuk anggaran MBG. Laporkan dugaan penyalahgunaan anggaran pengadaan.',
    telepon: '(021) 8591-0031',
    email: 'wbs@bpkp.go.id',
    website: 'https://wbs.bpkp.go.id',
    alamat: 'Jl. Pramuka No. 33, Rawasari, Jakarta Timur 13120',
    kategori: 'pengawasan',
  },
  {
    id: 'kpk',
    nama: 'KPK Whistleblower System',
    deskripsi: 'Kanal pelaporan dugaan tindak pidana korupsi terkait pengadaan MBG. Laporan dijamin kerahasiaannya.',
    telepon: '(021) 2557-8300',
    email: 'informasi@kpk.go.id',
    website: 'https://www.kpk.go.id/id/layanan-publik/pengaduan',
    alamat: 'Jl. Kuningan Persada Kav. 4, Setiabudi, Jakarta Selatan 12950',
    kategori: 'penegakan',
  },
  {
    id: 'kemendikbud',
    nama: 'Kemendikbudristek',
    deskripsi: 'Kementerian yang mengawasi pelaksanaan MBG di lingkungan sekolah. Laporkan isu terkait kualitas gizi dan distribusi di sekolah.',
    telepon: '(021) 5703-303',
    email: 'pengaduan@kemdikbud.go.id',
    website: 'https://ult.kemdikbud.go.id',
    alamat: 'Jl. Jend. Sudirman, Senayan, Jakarta Pusat 10270',
    kategori: 'pengaduan',
  },
  {
    id: 'sp4n',
    nama: 'SP4N-LAPOR!',
    deskripsi: 'Sistem Pengelolaan Pengaduan Pelayanan Publik Nasional. Portal terpadu untuk semua jenis aduan ke pemerintah.',
    telepon: '1708',
    email: 'lapor@lapor.go.id',
    website: 'https://lapor.go.id',
    alamat: 'Kementerian PANRB, Jl. Jend. Sudirman Kav. 69, Jakarta 12190',
    kategori: 'pengaduan',
  },
];

// ==========================================
// KONTAK PER PROVINSI
// ==========================================
export const kontakProvinsi: KontakProvinsi[] = [
  // DKI Jakarta
  {
    id: 'dki-disdik',
    provinsi: 'DKI Jakarta',
    instansi: 'Dinas Pendidikan Prov. DKI Jakarta',
    jenis: 'Dinas Pendidikan',
    telepon: '(021) 3822-326',
    email: 'disdik@jakarta.go.id',
    website: 'https://disdik.jakarta.go.id',
    alamat: 'Jl. Gatot Subroto Kav. 40-41, Jakarta Selatan',
  },
  {
    id: 'dki-dinkes',
    provinsi: 'DKI Jakarta',
    instansi: 'Dinas Kesehatan Prov. DKI Jakarta',
    jenis: 'Dinas Kesehatan',
    telepon: '(021) 4264-941',
    email: 'dinkes@jakarta.go.id',
    website: 'https://dinkes.jakarta.go.id',
    alamat: 'Jl. Kesehatan No. 10, Petojo Selatan, Jakarta Pusat',
  },
  // Jawa Barat
  {
    id: 'jabar-disdik',
    provinsi: 'Jawa Barat',
    instansi: 'Dinas Pendidikan Prov. Jawa Barat',
    jenis: 'Dinas Pendidikan',
    telepon: '(022) 4264-813',
    email: 'disdik@jabarprov.go.id',
    website: 'https://disdik.jabarprov.go.id',
    alamat: 'Jl. Dr. Rajiman No. 6, Bandung',
  },
  {
    id: 'jabar-inspektorat',
    provinsi: 'Jawa Barat',
    instansi: 'Inspektorat Prov. Jawa Barat',
    jenis: 'Inspektorat',
    telepon: '(022) 4267-448',
    email: 'inspektorat@jabarprov.go.id',
    website: 'https://inspektorat.jabarprov.go.id',
    alamat: 'Jl. Diponegoro No. 22, Bandung',
  },
  // Jawa Tengah
  {
    id: 'jateng-disdik',
    provinsi: 'Jawa Tengah',
    instansi: 'Dinas Pendidikan Prov. Jawa Tengah',
    jenis: 'Dinas Pendidikan',
    telepon: '(024) 8311-573',
    email: 'disdik@jatengprov.go.id',
    website: 'https://disdik.jatengprov.go.id',
    alamat: 'Jl. Pemuda No. 134, Semarang',
  },
  {
    id: 'jateng-dinkes',
    provinsi: 'Jawa Tengah',
    instansi: 'Dinas Kesehatan Prov. Jawa Tengah',
    jenis: 'Dinas Kesehatan',
    telepon: '(024) 3511-351',
    email: 'dinkes@jatengprov.go.id',
    website: 'https://dinkes.jatengprov.go.id',
    alamat: 'Jl. Piere Tendean No. 24, Semarang',
  },
  // Jawa Timur
  {
    id: 'jatim-disdik',
    provinsi: 'Jawa Timur',
    instansi: 'Dinas Pendidikan Prov. Jawa Timur',
    jenis: 'Dinas Pendidikan',
    telepon: '(031) 5344-761',
    email: 'disdik@jatimprov.go.id',
    website: 'https://disdik.jatimprov.go.id',
    alamat: 'Jl. Genteng Kali No. 33, Surabaya',
  },
  {
    id: 'jatim-inspektorat',
    provinsi: 'Jawa Timur',
    instansi: 'Inspektorat Prov. Jawa Timur',
    jenis: 'Inspektorat',
    telepon: '(031) 5344-953',
    email: 'inspektorat@jatimprov.go.id',
    website: 'https://inspektorat.jatimprov.go.id',
    alamat: 'Jl. Pahlawan No. 110, Surabaya',
  },
  // Banten
  {
    id: 'banten-disdik',
    provinsi: 'Banten',
    instansi: 'Dinas Pendidikan Prov. Banten',
    jenis: 'Dinas Pendidikan',
    telepon: '(0254) 267-053',
    email: 'disdik@bantenprov.go.id',
    website: 'https://disdik.bantenprov.go.id',
    alamat: 'KP3B, Jl. Syeh Nawawi Al-Bantani, Serang',
  },
  // Sumatera Utara
  {
    id: 'sumut-disdik',
    provinsi: 'Sumatera Utara',
    instansi: 'Dinas Pendidikan Prov. Sumatera Utara',
    jenis: 'Dinas Pendidikan',
    telepon: '(061) 4528-955',
    email: 'disdik@sumutprov.go.id',
    website: 'https://disdik.sumutprov.go.id',
    alamat: 'Jl. T. Cik Ditiro No. 1, Medan',
  },
  {
    id: 'sumut-dinkes',
    provinsi: 'Sumatera Utara',
    instansi: 'Dinas Kesehatan Prov. Sumatera Utara',
    jenis: 'Dinas Kesehatan',
    telepon: '(061) 4528-461',
    email: 'dinkes@sumutprov.go.id',
    website: 'https://dinkes.sumutprov.go.id',
    alamat: 'Jl. Prof. HM Yamin No. 41, Medan',
  },
  // NTB
  {
    id: 'ntb-disdik',
    provinsi: 'Nusa Tenggara Barat',
    instansi: 'Dinas Pendidikan Prov. NTB',
    jenis: 'Dinas Pendidikan',
    telepon: '(0370) 621-459',
    email: 'disdik@ntbprov.go.id',
    website: 'https://disdik.ntbprov.go.id',
    alamat: 'Jl. Pendidikan No. 20, Mataram',
  },
  {
    id: 'ntb-dinkes',
    provinsi: 'Nusa Tenggara Barat',
    instansi: 'Dinas Kesehatan Prov. NTB',
    jenis: 'Dinas Kesehatan',
    telepon: '(0370) 621-873',
    email: 'dinkes@ntbprov.go.id',
    website: 'https://dinkes.ntbprov.go.id',
    alamat: 'Jl. Amir Hamzah No. 109, Mataram',
  },
  // Sulawesi Selatan
  {
    id: 'sulsel-disdik',
    provinsi: 'Sulawesi Selatan',
    instansi: 'Dinas Pendidikan Prov. Sulawesi Selatan',
    jenis: 'Dinas Pendidikan',
    telepon: '(0411) 868-034',
    email: 'disdik@sulselprov.go.id',
    website: 'https://disdik.sulselprov.go.id',
    alamat: 'Jl. Perintis Kemerdekaan Km. 10, Makassar',
  },
  // Kalimantan Barat
  {
    id: 'kalbar-dinkes',
    provinsi: 'Kalimantan Barat',
    instansi: 'Dinas Kesehatan Prov. Kalimantan Barat',
    jenis: 'Dinas Kesehatan',
    telepon: '(0561) 736-696',
    email: 'dinkes@kalbarprov.go.id',
    website: 'https://dinkes.kalbarprov.go.id',
    alamat: 'Jl. Adi Sucipto, Pontianak',
  },
  // Bengkulu
  {
    id: 'bengkulu-disdik',
    provinsi: 'Bengkulu',
    instansi: 'Dinas Pendidikan Prov. Bengkulu',
    jenis: 'Dinas Pendidikan',
    telepon: '(0736) 21-170',
    email: 'disdik@bengkuluprov.go.id',
    website: 'https://disdik.bengkuluprov.go.id',
    alamat: 'Jl. Pembangunan No. 14, Bengkulu',
  },
  // DI Yogyakarta
  {
    id: 'diy-disdik',
    provinsi: 'DI Yogyakarta',
    instansi: 'Dinas Pendidikan, Pemuda, dan Olahraga Prov. DIY',
    jenis: 'Dinas Pendidikan',
    telepon: '(0274) 562-682',
    email: 'disdikpora@jogjaprov.go.id',
    website: 'https://disdikpora.jogjaprov.go.id',
    alamat: 'Jl. Cendana No. 9, Yogyakarta',
  },
  // Jambi
  {
    id: 'jambi-dinkes',
    provinsi: 'Jambi',
    instansi: 'Dinas Kesehatan Prov. Jambi',
    jenis: 'Dinas Kesehatan',
    telepon: '(0741) 60-832',
    email: 'dinkes@jambiprov.go.id',
    website: 'https://dinkes.jambiprov.go.id',
    alamat: 'Jl. RM Noor Atmadibrata, Jambi',
  },
];

// ==========================================
// KANAL ONLINE
// ==========================================
export const kanalOnline: KanalOnline[] = [
  {
    id: 'lapor',
    nama: 'SP4N-LAPOR!',
    url: 'https://lapor.go.id',
    deskripsi: 'Portal pengaduan resmi pemerintah. Dukung semua jenis aduan layanan publik termasuk program MBG.',
    jenis: 'Website',
    icon: 'globe',
  },
  {
    id: 'wise-kpk',
    nama: 'KPK Whistleblower',
    url: 'https://www.kpk.go.id/id/layanan-publik/pengaduan',
    deskripsi: 'Laporkan dugaan korupsi pengadaan MBG secara anonim dan terlindungi.',
    jenis: 'Website',
    icon: 'globe',
  },
  {
    id: 'ombudsman-app',
    nama: 'Ombudsman RI App',
    url: 'https://play.google.com/store/apps/details?id=go.id.ombudsman.pengaduan',
    deskripsi: 'Aplikasi mobile untuk pengaduan maladministrasi pelayanan publik.',
    jenis: 'Aplikasi',
    icon: 'smartphone',
  },
  {
    id: 'hotline-bgn',
    nama: 'Hotline BGN',
    url: 'tel:02152770505',
    deskripsi: 'Hubungi langsung call center Badan Gizi Nasional untuk keluhan MBG.',
    jenis: 'Hotline',
    icon: 'phone',
  },
];

// Helper: get unique province names
export function getProvinsiList(): string[] {
  const set = new Set(kontakProvinsi.map(k => k.provinsi));
  return Array.from(set).sort();
}
