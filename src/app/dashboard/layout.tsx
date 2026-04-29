'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Menu, Search, X } from 'lucide-react';
import { SearchProvider, useSearch } from '@/lib/search-context';

function LayoutInner({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const { value: searchValue, set: setSearchValue } = useSearch();

  return (
    <div className="min-h-screen bg-[#FDFCFB]">

      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 md:hidden transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="fixed top-0 left-0 right-0 z-30 md:left-72">
        <div className="mx-4 my-3 px-3 py-2.5 bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm border border-white/60 flex items-center gap-3">

          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-600 flex-shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className={`flex-1 flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-200 ${
            searchFocused ? 'bg-gray-100 ring-2 ring-primary/20' : 'bg-gray-50'
          }`}>
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Cari insiden, wilayah, vendor..."
              className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground min-w-0"
            />
            {searchValue && (
              <button onClick={() => setSearchValue('')} className="text-muted-foreground hover:text-foreground">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="md:pl-72 px-4 md:pr-6 pb-12 pt-0">
        <div className="max-w-[1600px] mx-auto mt-20">
          {children}
        </div>
      </main>

    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <LayoutInner>{children}</LayoutInner>
    </SearchProvider>
  );
}