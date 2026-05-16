<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';
import { useI18n } from 'vue-i18n';

const authStore = useAuthStore();
const router = useRouter();
const { locale } = useI18n();

function handleLogout() {
  authStore.logout();
  router.push({ name: 'login' });
}

function toggleLanguage() {
  locale.value = locale.value === 'cs' ? 'en' : 'cs';
}
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

      <div v-if="authStore.isAuthenticated" class="pt-6 border-t border-slate-800">
        <div class="text-sm font-medium text-slate-300 mb-4">
          {{ $t('auth.greeting', { name: authStore.user?.name }) }}
        </div>
        <button
          @click="handleLogout"
          class="w-full text-left px-3 py-2 text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span class="text-lg">🚪</span> {{ $t('auth.logout') }}
        </button>
      </div>

      <div class="mt-auto pt-6 border-t border-slate-800 flex items-center justify-between">
        <span class="text-sm font-medium text-slate-400">{{ $t('nav.language') }}</span>
        <button
          @click="toggleLanguage"
          class="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg hover:text-white hover:bg-slate-700 text-xs font-bold uppercase transition-colors cursor-pointer"
        >
          {{ locale }}
        </button>
      </div>
    </aside>

    <main class="flex-1 p-8 overflow-y-auto">
      <div class="max-w-6xl mx-auto">
        <RouterView />
      </div>
    </main>
  </div>
</template>
