'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Map, 
  Signal, 
  Search, 
  BellRing, 
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Ringkasan', href: '/dashboard' },
  { icon: Map, label: 'Peta Risiko', href: '/dashboard/risk-map' },
  { icon: Signal, label: 'Pantau Insiden', href: '/dashboard/pantau' },
  { icon: BellRing, label: 'Pusat Alert', href: '/dashboard/alerts' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-6 top-6 bottom-6 w-64 z-50">
      <div className="h-full glass rounded-3xl flex flex-col overflow-hidden border-white/40 shadow-2xl">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <ShieldAlert className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">
              Pantauin<span className="text-primary">MBG</span>
            </span>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div className={cn(
                    "group relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300",
                    isActive 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
                  )}>
                    <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "group-hover:scale-110 transition-transform")} />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="active-pill"
                        className="absolute right-2 w-1.5 h-6 bg-white/40 rounded-full"
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-8 pt-0">
          <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-foreground">Monitoring AI Aktif</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
