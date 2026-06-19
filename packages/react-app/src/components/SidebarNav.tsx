'use client';

import { useAuthStore } from '@/stores/auth';
import { useLocaleStore } from '@/stores/locale';
import { Language } from '@saas/locales';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function SidebarNav() {
  const pathName = usePathname();
  const router = useRouter();

  const t = useLocaleStore(state => state.t);
  const lang = useLocaleStore(state => state.lang);
  const setLang = useLocaleStore(state => state.setLang);

  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000; SameSite=Lax`;

    router.refresh();
  };

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
          {t('nav.dashboard')}
        </Link>
        <Link
          href="/configurator"
          className={`px-3 py-2.5 rounded-lg transition-colors text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 ${
            pathName === '/configurator'
              ? 'text-white! bg-indigo-600 font-semibold hover:bg-indigo-600'
              : ''
          }`}
        >
          {t('nav.configurator')}
        </Link>
      </nav>

      <div className="border-t border-slate-800 pt-4 mt-auto space-y-4">
        <div className="px-3 flex items-center justify-between border-b border-slate-800/50 pb-4">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            {t('nav.language')}
          </span>
          <div className="flex gap-2 text-xs font-bold">
            <button
              onClick={() => handleLanguageChange('cs')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                lang === 'cs'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              CZ
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                lang === 'en'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {user && (
          <div className="px-3">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              {t('nav.loggedInAs')}
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
          <span>🚪</span> {t('auth.logout')}
        </button>
      </div>
    </div>
  );
}
