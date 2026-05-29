'use client';

import { useAuthStore } from '@/stores/auth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function SidebarNav() {
  const pathName = usePathname();
  const router = useRouter();

  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  const handleLogout = async () => {
    await logout();

    router.push('/login');
    router.refresh();
  };

  return (
    <div className="flex flex-col justify-between flex-1 h-full">
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

      <div className="border-t border-slate-800 pt-4 mt-auto space-y-4">
        {user && (
          <div className="px-3">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Přihlášen jako
            </p>
            <p className="text-sm font-medium text-slate-200 truncate mt-0.5" title={user.email}>
              {user.name}
            </p>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2.5 rounded-lg transition-colors text-sm font-medium 
            text-red-400 hover:text-white hover:bg-red-500/20 cursor-pointer flex items-center gap-2"
        >
          <span>🚪</span> Odhlásit se
        </button>
      </div>
    </div>
  );
}
