'use client';

import AddonSelector from '@/components/AddonSelector';
import CheckoutForm from '@/components/CheckoutForm';
import TarrifSelector from '@/components/TariffSelector';
import { AddonModule, TariffPlan, useConfiguratorStore } from '@/stores/configurator';
import { useLocaleStore } from '@/stores/locale';
import { useEffect } from 'react';

interface ConfiguratorClientProps {
  initialData: {
    tariffs: TariffPlan[];
    modules: AddonModule[];
  };
}

export default function ConfiguratorClient({ initialData }: ConfiguratorClientProps) {
  const t = useLocaleStore(state => state.t);
  const fetchInitialData = useConfiguratorStore(state => state.fetchInitialData);

  const totalPrice = useConfiguratorStore(state => {
    const base = state.selectedTariff?.basePrice || 0;
    const addons = state.selectedModules.reduce((sum, mod) => sum + mod.price, 0);
    return base + addons;
  });

  useEffect(() => {
    fetchInitialData(initialData);
  }, [initialData, fetchInitialData]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {t('configurator.title')}
        </h1>

        <div className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold shadow-sm">
          {t('configurator.currentPrice', { price: totalPrice })}
        </div>
      </div>

      <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 space-y-8">
        <p className="text-slate-600 border-b border-slate-100 pb-4">
          {t('configurator.description')}
        </p>

        <section className="pt-4 border-t border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            {t('configurator.tabs.tariffs')}
          </h2>
          <TarrifSelector />
        </section>

        <section className="pt-4 border-t border-slate-100 mt-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            {t('configurator.tabs.modules')}
          </h2>
          <AddonSelector />
        </section>

        <section className="pt-4 border-t border-slate-100 mt-8">
          <CheckoutForm />
        </section>
      </div>
    </div>
  );
}
