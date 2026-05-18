'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SidebarNav() {
  const pathName = usePathname();
  return (
    <nav className="flex flex-col gap-1">
      <Link
        href="/"
        className={`px-3 py-2.5 rounded-lg transition-colors text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 ${
          pathName === '/' ? 'text-white! bg-indigo-600 font-semibold hover:bg-indigo-600' : ''
        }`}
      >
        Dashboard
      </Link>
      <Link
        href="/configurator"
        className={`px-3 py-2.5 rounded-lg transition-colors text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 ${
          pathName === '/configurator'
            ? 'text-white! bg-indigo-600 font-semibold hover:bg-indigo-600'
            : ''
        }`}
      >
        Configurator
      </Link>
    </nav>
  );
}
