import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Pantauin",
  description: "Platform AI yang memantau & memprediksi berbagai isu program Makan Bergizi Gratis (MBG) — dari keracunan, porsi tidak sesuai, kualitas, harga, hingga distribusi — dari sosial media, berita, dan laporan publik secara real-time.",
  keywords: ["MBG", "Makan Bergizi Gratis", "Food Safety", "Keracunan Makanan", "Anomali Pengadaan", "Early Warning", "Pantauin"],
  authors: [{ name: "Pantauin Team" }],
  openGraph: {
    title: "Pantauin — Early Warning Isu MBG",
    description: "Deteksi sinyal awal berbagai isu MBG (keracunan, porsi, kualitas, harga, distribusi) dari Twitter, Instagram, TikTok, berita, dan laporan masyarakat — sebelum kasus meluas.",
    url: "https://pantauin-web.vercel.app",
    siteName: "Pantauin",
    images: [
      {
        url: "/logo/logo_pantauin.png",
        alt: "Pantauin",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pantauin — Early Warning Isu MBG",
    description: "Deteksi sinyal awal berbagai isu MBG (keracunan, porsi, kualitas, harga, distribusi) dari Twitter, Instagram, TikTok, berita, dan laporan masyarakat — sebelum kasus meluas.",
    images: ["/logo/logo_pantauin.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/sf-pro-rounded" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
