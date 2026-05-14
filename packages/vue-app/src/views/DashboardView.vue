<script setup lang="ts">
import { useConfiguratorStore } from '@/stores/configurator';

const store = useConfiguratorStore();
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold tracking-tight text-slate-900">{{ $t('dashboard.title') }}</h1>
    <div class="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <p class="text-slate-600">{{ $t('dashboard.noTariff') }}</p>
    </div>
  </div>
</template>
