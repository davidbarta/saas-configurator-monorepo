import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia, type Pinia } from 'pinia';
import LoginView from '../LoginView.vue';
import router from '@/router';
import i18n from '@/i18n';
import { useAuthStore } from '@/stores/auth';

describe('LoginView.vue', () => {
  let pinia: Pinia;
  let authStore: ReturnType<typeof useAuthStore>;

  beforeEach(async () => {
    pinia = createPinia();
    setActivePinia(pinia);
    authStore = useAuthStore();
    vi.useFakeTimers();
    router.push('/login');
    await router.isReady();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function createWrapper() {
    return mount(LoginView, { global: { plugins: [pinia, router, i18n] } });
  }

  it('renders email input, password input, and submit button', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('#emailInput').exists()).toBe(true);
    expect(wrapper.find('#passwordInput').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('pre-fills email and password with demo credentials', () => {
    const wrapper = createWrapper();
    expect((wrapper.find('#emailInput').element as HTMLInputElement).value).toBe('david@example.com');
    expect((wrapper.find('#passwordInput').element as HTMLInputElement).value).toBe('test');
  });

  it('shows the translated submit label when idle', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('button[type="submit"]').text()).toBe('Vstoupit do aplikace');
  });

  it('shows "..." on the submit button while login is in progress', async () => {
    const wrapper = createWrapper();
    wrapper.find('form').trigger('submit');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('button[type="submit"]').text()).toBe('...');
    await vi.advanceTimersByTimeAsync(800);
  });

  it('displays the error message when authStore has an error', async () => {
    authStore.error = 'auth.error';
    const wrapper = createWrapper();
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('Neplatné přihlašovací údaje');
  });

  it('navigates to the dashboard after a successful login', async () => {
    const pushSpy = vi.spyOn(router, 'push');
    const wrapper = createWrapper();
    wrapper.find('form').trigger('submit');
    await vi.advanceTimersByTimeAsync(800);
    await flushPromises();
    expect(pushSpy).toHaveBeenCalledWith('/');
    pushSpy.mockRestore();
  });
});
