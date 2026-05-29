import { create } from 'zustand';

export interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;

  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isLoading: true,
  error: null,

  checkAuth: async () => {
    try {
      const res = await fetch('http://localhost:4000/api/auth/me', { credentials: 'include' });
      const data = (await res.json()) as { user: User | null };

      set({ user: data.user, isLoading: false });
    } catch (error) {
      console.error('Check auth failed:', error);
      set({ user: null, isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = (await res.json()) as { success?: boolean; user?: User; error?: string };

      if (!res.ok) {
        throw new Error(data.error || 'Login failed.');
      }

      if (data.success && data.user) {
        set({ user: data.user, isLoading: false });
        return true;
      }

      return false;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred when logging in.';
      set({ error: message, isLoading: false });
      return false;
    }
  },

  logout: async () => {
    try {
      await fetch('http://localhost:4000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      set({ user: null });
    } catch (error: unknown) {
      console.error(' Logout failed:', error);
    }
  },

  clearError: () => set({ error: null })
}));
