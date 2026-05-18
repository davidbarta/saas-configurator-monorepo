import type { Metadata } from 'next';
import './globals.css';
import SidebarNav from '@/components/SidebarNav';

export const metadata: Metadata = {
  title: 'SaaS Configurator',
  description: 'Enterprise React demo'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <div className="flex min-h-screen bg-slate-50 text-slate-900">
          <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col gap-8 shrink-0">
            <div className="font-bold text-xl tracking-wider text-indigo-400 flex items-center gap-2">
              <span className="p-1.5 bg-indigo-600/30 rounded-lg text-indigo-400">⚡</span>
              Nav brand
            </div>

            <SidebarNav />
          </aside>

          <main className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
