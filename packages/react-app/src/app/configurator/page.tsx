'use client';

import TarrifSelector from '@/components/TarrifSelector';
import { useConfiguratorStore } from '@/stores/configurator';
import { useEffect } from 'react';

export default function ConfiguratorPage() {
  const fetchInitialData = useConfiguratorStore(state => state.fetchInitialData);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Konfigurátor</h1>
        <p>Tady budeme za chvíli skládat tarify a moduly.</p>
      </div>

      <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 space-y-8">
        <p className="text-slate-600 border-b border-slate-100 pb-4">
          Sestav si plán na míru. Začni výběrem základu a přidej moduly.
        </p>

        <TarrifSelector />
      </div>
    </div>
  );
}
