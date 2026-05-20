'use client';

import AddonSelector from '@/components/AddonSelector';
import CheckoutForm from '@/components/CheckoutForm';
import TarrifSelector from '@/components/TariffSelector';
import { useConfiguratorStore } from '@/stores/configurator';
import { useEffect } from 'react';

export default function ConfiguratorPage() {
  const fetchInitialData = useConfiguratorStore(state => state.fetchInitialData);

  const totalPrice = useConfiguratorStore(state => {
    const base = state.selectedTariff?.basePrice || 0;
    const addons = state.selectedModules.reduce((sum, mod) => sum + mod.price, 0);
    return base + addons;
  });

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Konfigurátor</h1>

        <div className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold shadow-sm">
          Cena: {totalPrice} USD
        </div>
      </div>

      <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 space-y-8">
        <p className="text-slate-600 border-b border-slate-100 pb-4">
          Sestav si plán na míru. Začni výběrem základu a přidej moduly.
        </p>

        <TarrifSelector />

        <section className="pt-4 border-t border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Doplňkové moduly</h2>
          <AddonSelector />
        </section>

        <section className="pt-4 border-t border-slate-100 mt-8">
          <CheckoutForm />
        </section>
      </div>
    </div>
  );
}
