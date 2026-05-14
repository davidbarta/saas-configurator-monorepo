<script setup lang="ts">
import { onMounted } from 'vue';
import { useConfiguratorStore } from '@/stores/configurator';
import TariffSelector from '@/components/TariffSelector.vue';
import AddonSelector from '@/components/AddonSelector.vue';

const store = useConfiguratorStore();

onMounted(() => {
  store.fetchInitialData();
});
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold tracking-tight text-slate-900">
        {{ $t('configurator.title') }}
      </h1>

      <div class="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold shadow-sm">
        {{ $t('configurator.currentPrice', { price: store.totalPrice }) }}
      </div>
    </div>

    <div class="p-6 bg-white rounded-xl shadow-sm border border-slate-200 space-y-8">
      <p class="text-slate-600 border-b border-slate-100 pb-4">
        {{ $t('configurator.description') }}
      </p>

      <TariffSelector />

      <section class="pt-4 border-t border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4">
          {{ $t('configurator.tabs.modules') }}
        </h2>
        <AddonSelector />
      </section>
    </div>
  </div>
</template>
