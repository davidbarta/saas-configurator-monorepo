import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '../auth';

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('has correct initial state', () => {
    const store = useAuthStore();
    expect(store.user).toBeNull();
    expect(store.isLoading).toBe(false);
    expect(store.error).toBeNull();
    expect(store.isAuthenticated).toBe(false);
  });

  it('sets isLoading to true during the delay and false after', async () => {
    const store = useAuthStore();
    const loginPromise = store.login('david@example.com', 'test');
    expect(store.isLoading).toBe(true);
    await vi.advanceTimersByTimeAsync(800);
    await loginPromise;
    expect(store.isLoading).toBe(false);
  });

  it('sets user and returns true on successful login', async () => {
    const store = useAuthStore();
    const loginPromise = store.login('david@example.com', 'test');
    await vi.advanceTimersByTimeAsync(800);
    const result = await loginPromise;
    expect(result).toBe(true);
    expect(store.user).toEqual({ id: 'u_123', name: 'David', email: 'david@example.com' });
    expect(store.isAuthenticated).toBe(true);
  });

  it('clears a previous error immediately when a new login attempt starts', async () => {
    const store = useAuthStore();
    const failedLogin = store.login('', '');
    await vi.advanceTimersByTimeAsync(800);
    await failedLogin;
    expect(store.error).toBe('auth.error');

    store.login('david@example.com', 'test');
    expect(store.error).toBeNull();
    await vi.advanceTimersByTimeAsync(800);
  });

  it('returns false and sets error when credentials are empty', async () => {
    const store = useAuthStore();
    const loginPromise = store.login('', '');
    await vi.advanceTimersByTimeAsync(800);
    const result = await loginPromise;
    expect(result).toBe(false);
    expect(store.user).toBeNull();
    expect(store.error).toBe('auth.error');
    expect(store.isAuthenticated).toBe(false);
  });

  it('clears user on logout', async () => {
    const store = useAuthStore();
    const loginPromise = store.login('david@example.com', 'test');
    await vi.advanceTimersByTimeAsync(800);
    await loginPromise;
    expect(store.isAuthenticated).toBe(true);

    store.logout();
    expect(store.user).toBeNull();
    expect(store.isAuthenticated).toBe(false);
  });
});
