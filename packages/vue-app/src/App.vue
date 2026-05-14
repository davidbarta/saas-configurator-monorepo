<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="flex min-h-screen bg-slate-50 text-slate-900">
    <aside class="w-64 bg-slate-900 text-white p-6 flex flex-col gap-8 shrink-0">
      <div class="font-bold text-xl tracking-wider text-indigo-400 flex items-center gap-2">
        <span class="p-1.5 bg-indigo-600/30 rounded-lg text-indigo-400">⚡</span>
        {{ $t('nav.brand') }}
      </div>

      <nav class="flex flex-col gap-1">
        <RouterLink
          to="/"
          class="px-3 py-2.5 rounded-lg transition-colors text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800"
          active-class="!text-white bg-indigo-600 font-semibold hover:bg-indigo-600"
        >
          {{ $t('nav.dashboard') }}
        </RouterLink>
        <RouterLink
          to="/configurator"
          class="px-3 py-2.5 rounded-lg transition-colors text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800"
          active-class="!text-white bg-indigo-600 font-semibold hover:bg-indigo-600"
        >
          {{ $t('nav.configurator') }}
        </RouterLink>
      </nav>
    </aside>

    <main class="flex-1 p-8 overflow-y-auto">
      <div class="max-w-6xl mx-auto">
        <RouterView />
      </div>
    </main>
  </div>
</template>
