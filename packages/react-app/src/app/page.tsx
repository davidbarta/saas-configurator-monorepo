async function fetchOrders() {
  try {
    const res = await fetch('http://localhost:4000/api/orders', {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Nepodařilo se načíst objednávky');
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

export default async function Home() {
  const orders: Order[] = await fetchOrders();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">React Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          Přehled všech odeslaných konfigurací uložených v SQLite (SSR).
        </p>
      </header>

      {orders.length === 0 ? (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 text-center">
          <p className="text-slate-600 font-medium">Zatím nebyly odeslány žádné objednávky.</p>
          <p className="text-xs text-slate-400 mt-1">Ulož data v konfigurátoru a uvidíš je tady.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider">
                  <th className="p-4">ID Objednávky</th>
                  <th className="p-4">Datum vytvoření</th>
                  <th className="p-4">Vybraný Tarif</th>
                  <th className="p-4">Aktivní Moduly</th>
                  <th className="p-4 text-right">Celková cena</th>
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
                        {order.items.tariff?.nameKey || 'Neznámý'}
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
                              {mod.nameKey}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          Žádné doplňkové moduly
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right font-semibold text-slate-900">
                      {order.totalPrice} USD
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
