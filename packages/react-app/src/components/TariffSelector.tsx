'use client';

import { type TariffPlan, useConfiguratorStore } from '@/stores/configurator';

export default function TarrifSelector() {
  const availableTariffs = useConfiguratorStore(state => state.availableTariffs);
  const selectedTariff = useConfiguratorStore(state => state.selectedTariff);
  const selectTariff = useConfiguratorStore(state => state.selectTariff);

  function isSelected(tariff: TariffPlan): boolean {
    return selectedTariff?.id === tariff.id;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">Zvol si výchozí tarif</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {availableTariffs.map(tariff => (
          <div
            key={tariff.id}
            className={`relative flex flex-col justify-between p-6 rounded-2xl border-2 transition-all cursor-pointer bg-white
                ${
                  isSelected(tariff)
                    ? 'border-indigo-600 ring-2 ring-indigo-600/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
            onClick={() => selectTariff(tariff)}
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg text-slate-900">{tariff.nameKey}</h3>
                {isSelected(tariff) && (
                  <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">
                    Aktivní
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-500 min-h-10">{tariff.descriptionKey}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-baseline justify-between">
              <div>
                <span className="text-3xl font-extrabold text-slate-900">{tariff.basePrice}</span>
                <span className="text-sm font-medium text-slate-500 ml-1">USD</span>
              </div>

              <button
                type="button"
                aria-label={
                  isSelected(tariff)
                    ? `Aktivní tarif ${tariff.nameKey}`
                    : `Zvolit tarif ${tariff.nameKey}`
                }
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors
                    ${isSelected(tariff) ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                {isSelected(tariff) ? 'Aktivní' : 'Zvolit tarif'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
