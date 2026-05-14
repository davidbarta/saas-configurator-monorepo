<script setup lang="ts">
import { useConfiguratorStore } from '@/stores/configurator';

const store = useConfiguratorStore();
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold tracking-tight text-slate-900">{{ $t('configurator.title') }}</h1>
    <div class="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <p class="text-slate-600">{{ $t('configurator.description') }}</p>
      <div class="mt-4 font-semibold text-indigo-600">
        {{ $t('configurator.currentPrice', { price: store.totalPrice }) }}
      </div>
    </div>
  </div>
</template>
