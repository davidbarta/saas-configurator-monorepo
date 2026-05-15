import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export interface User {
  id: string;
  name: string;
  email: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => user.value !== null);

  async function login(email: string, password: string): Promise<boolean> {
    isLoading.value = true;
    error.value = null;

    return new Promise(resolve => {
      setTimeout(() => {
        isLoading.value = false;

        if (email && password) {
          user.value = {
            id: 'u_123',
            name: 'David',
            email: email
          };
          resolve(true);
        } else {
          error.value = 'auth.error';
          resolve(false);
        }
      }, 800);
    });
  }

  function logout() {
    user.value = null;
  }

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout
  };
});
