'use client';

import React from 'react';
import { Search, Bell, User, Command } from 'lucide-react';
import { motion } from 'framer-motion';

export function TopNavbar() {
  return (
    <header className="sticky top-6 z-40 px-6 mb-12">
      <div className="glass rounded-2xl h-16 px-6 flex items-center justify-between border-white/40 shadow-lg">
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Cari insiden, wilayah, vendor..." 
              className="w-full bg-primary/5 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/50 border border-white/80 text-[10px] font-bold text-muted-foreground">
              <Command className="w-2.5 h-2.5" /> K
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-primary/10 rounded-xl transition-colors group">
            <Bell className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
