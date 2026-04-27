'use client';

import React, { createContext, useContext, useState } from 'react';

interface SearchContextValue {
  value: string;
  set: (v: string) => void;
}

const SearchCtx = createContext<SearchContextValue>({ value: '', set: () => {} });

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState('');
  return (
    <SearchCtx.Provider value={{ value, set: setValue }}>
      {children}
    </SearchCtx.Provider>
  );
}

export function useSearch() {
  return useContext(SearchCtx);
}