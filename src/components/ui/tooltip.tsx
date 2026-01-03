"use client";

import * as React from "react";

export function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span role="tooltip" className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-[11px] font-medium text-zinc-200 opacity-0 shadow-xl transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
        {label}
      </span>
    </span>
  );
}
