<script setup lang="ts">
import { useConfiguratorStore, type TariffPlan } from '@/stores/configurator';

const store = useConfiguratorStore();

function isSelected(tariff: TariffPlan): boolean {
  return store.selectedTariff?.id === tariff.id;
}
</script>

<template>
  <section class="space-y-4">
    <h2 class="text-lg font-semibold text-slate-800">
      {{ $t('selector.title') }}
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="tariff in store.availableTariffs"
        :key="tariff.id"
        @click="store.selectTariff(tariff)"
        class="relative flex flex-col justify-between p-6 rounded-2xl border-2 transition-all cursor-pointer bg-white"
        :class="[
          isSelected(tariff)
            ? 'border-indigo-600 ring-2 ring-indigo-600/20 shadow-md'
            : 'border-slate-200 hover:border-slate-300 shadow-sm'
        ]"
      >
        <div>
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-bold text-lg text-slate-900">
              {{ $t(tariff.nameKey) }}
            </h3>
            <span
              v-if="isSelected(tariff)"
              class="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100"
            >
              {{ $t('selector.selectedBadge') }}
            </span>
          </div>

          <p class="text-sm text-slate-500 min-h-10">
            {{ $t(tariff.descriptionKey) }}
          </p>
        </div>

        <div class="mt-6 pt-4 border-t border-slate-100 flex items-baseline justify-between">
          <div>
            <span class="text-3xl font-extrabold text-slate-900">{{ tariff.basePrice }}</span>
            <span class="text-sm font-medium text-slate-500 ml-1">{{ $t('common.currency') }}</span>
          </div>

          <button
            type="button"
            class="px-3 py-1.5 text-sm font-medium rounded-lg transition-colors"
            :class="[
              isSelected(tariff)
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            ]"
          >
            {{ isSelected(tariff) ? $t('selector.selectedBadge') : $t('selector.selectBtn') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
