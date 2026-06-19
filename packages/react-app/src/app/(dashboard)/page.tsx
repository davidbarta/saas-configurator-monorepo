import { cookies } from 'next/headers';
import { translations, Language } from '@saas/locales';

async function fetchOrders() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token')?.value;

    const res = await fetch('http://localhost:4000/api/orders', {
      cache: 'no-store',
      headers: {
        Cookie: `token=${token || ''}`
      }
    });

    if (!res.ok) {
      throw new Error('Error while fetching orders');
    }

    return res.json();
  } catch (error) {
    console.error('Dashboard Fetch Error:', error);
    return [];
  }
}

interface Order {
  id: number;
  createdAt: string;
  totalPrice: number;
  items: {
    tariff: {
      nameKey: string;
      basePrice: number;
    };
    modules: Array<{
      id: string;
      nameKey: string;
      price: number;
    }>;
  };
}

function getTranslation(dictionary: unknown, key: string): string {
  const keys = key.split('.');
  let current = dictionary;
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = (current as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  return typeof current === 'string' ? current : key;
}

export default async function Home() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('NEXT_LOCALE')?.value || 'cs') as Language;
  const t = translations[lang];

  const orders: Order[] = await fetchOrders();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{t.nav.dashboard}</h1>
        <p className="text-sm text-slate-500 mt-1">{t.dashboard.title}</p>
      </header>

      {orders.length === 0 ? (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 text-center">
          <p className="text-slate-600 font-medium">{t.dashboard.noTariff}</p>
          <p className="text-xs text-slate-400 mt-1">{t.dashboard.noTariffDesc}</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider">
                  <th className="p-4">{t.dashboard.table.id}</th>
                  <th className="p-4">{t.dashboard.table.dateCreated}</th>
                  <th className="p-4">{t.dashboard.table.chosenTariff}</th>
                  <th className="p-4">{t.dashboard.table.activeModules}</th>
                  <th className="p-4 text-right">{t.dashboard.table.price}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-indigo-600">#{order.id}</td>
                    <td className="p-4 text-slate-500">
                      {new Date(order.createdAt + 'Z').toLocaleString('cs-CZ')}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {order.items.tariff?.nameKey
                          ? getTranslation(t, order.items.tariff.nameKey)
                          : t.dashboard.table.unknown}
                      </span>
                    </td>
                    <td className="p-4">
                      {order.items.modules && order.items.modules.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 max-w-md">
                          {order.items.modules.map(mod => (
                            <span
                              key={mod.id}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-600 border border-slate-200"
                            >
                              {getTranslation(t, mod.nameKey)}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          {t.dashboard.table.noModules}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right font-semibold text-slate-900">
                      {order.totalPrice} {t.common.currency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
