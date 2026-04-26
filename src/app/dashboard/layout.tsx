import React from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNavbar } from '@/components/dashboard/TopNavbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      <Sidebar />
      <main className="pl-72 pr-6 pb-12 pt-0">
        <TopNavbar />
        <div className="max-w-[1600px] mx-auto mt-20">
          {children}
        </div>
      </main>
    </div>
  );
}
