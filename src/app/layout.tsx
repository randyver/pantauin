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
  title: "Pantauin MBG - Deteksi Dini Keracunan Makanan",
  description: "Pantauin menggabungkan AI dan Social Listening untuk memberi peringatan dini risiko keracunan makanan pada program Makan Bergizi Gratis di seluruh Indonesia.",
  keywords: ["MBG", "Makan Bergizi Gratis", "Food Safety", "Keracunan Makanan", "Deteksi Dini", "Pantauin"],
  authors: [{ name: "Pantauin Team" }],
  openGraph: {
    title: "Pantauin MBG - Deteksi Dini Keracunan Makanan",
    description: "Memantau setiap sinyal, dari semua arah. Deteksi dini risiko keracunan makanan untuk program Makan Bergizi Gratis.",
    url: "https://pantauin-web.vercel.app",
    siteName: "Pantauin",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pantauin MBG Dashboard Preview",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pantauin MBG - Deteksi Dini Keracunan Makanan",
    description: "Sistem AI untuk deteksi dini risiko keracunan makanan pada program Makan Bergizi Gratis.",
    images: ["/og-image.png"],
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
