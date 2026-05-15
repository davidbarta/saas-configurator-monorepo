<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('david@example.com');
const password = ref('test');

async function handleLogin() {
  const success = await authStore.login(email.value, password.value);
  if (success) {
    router.push('/');
  }
}
</script>

<template>
  <div class="flex items-center justify-center h-full min-h-[60vh]">
    <div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
      <h1 class="text-2xl font-bold text-slate-900 mb-6 text-center">
        {{ $t('auth.title') }}
      </h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="emailInput" class="block text-sm font-medium text-slate-700 mb-1">
            {{ $t('auth.email') }}
          </label>
          <input
            v-model="email"
            type="email"
            id="emailInput"
            required
            class="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label for="passwordInput" class="block text-sm font-medium text-slate-700 mb-1">
            {{ $t('auth.password') }}
          </label>
          <input
            v-model="password"
            type="password"
            id="passwordInput"
            required
            class="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div v-if="authStore.error" class="text-sm text-red-600 font-medium">
          {{ $t(authStore.error) }}
        </div>

        <button
          type="submit"
          :disabled="authStore.isLoading"
          class="w-full mt-4 bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-70 cursor-pointer"
        >
          {{ authStore.isLoading ? '...' : $t('auth.submit') }}
        </button>
      </form>
    </div>
  </div>
</template>
