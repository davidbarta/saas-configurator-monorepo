import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper, flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia, type Pinia } from 'pinia';
import App from '../App.vue';
import router from '../router';
import i18n from '../i18n';
import { useAuthStore } from '../stores/auth';

function createWrapper(pinia: Pinia = createPinia()): VueWrapper {
  return mount(App, {
    global: {
      plugins: [pinia, router, i18n]
    }
  });
}

describe('App.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders sidebar navigation with translated brand and links', async () => {
    // Ensure router is in a known initial state before mounting
    router.push('/');
    await router.isReady();

    const wrapper = createWrapper();

    // Verify translated brand text presence
    expect(wrapper.text()).toContain('SaaS CONFIG');

    // Verify navigation links are rendered correctly
    const navLinks = wrapper.findAll('a');
    expect(navLinks.length).toBe(2);

    // Default locale is 'cs', so we assert Czech translation strings
    expect(navLinks[0]!.text()).toContain('Dashboard');
    expect(navLinks[1]!.text()).toContain('Konfigurátor');
  });

  it('contains the main content area for route views', async () => {
    router.push('/');
    await router.isReady();

    const wrapper = createWrapper();

    const mainArea = wrapper.find('main');
    expect(mainArea.exists()).toBe(true);
  });

  it('does not render a greeting or logout button when unauthenticated', async () => {
    router.push('/configurator');
    await router.isReady();

    const wrapper = createWrapper();

    expect(wrapper.text()).not.toContain('Ahoj');
    // Only the language-toggle button should be present; no logout button
    expect(wrapper.find('aside').findAll('button')).toHaveLength(1);
  });

  it('renders greeting with user name and logout button when authenticated', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const authStore = useAuthStore();
    authStore.user = { id: 'u_123', name: 'David', email: 'david@example.com' };

    router.push('/configurator');
    await router.isReady();

    const wrapper = createWrapper(pinia);

    expect(wrapper.text()).toContain('Ahoj, David');
    const logoutBtn = wrapper.find('button');
    expect(logoutBtn.exists()).toBe(true);
    expect(logoutBtn.text()).toContain('Odhlásit se');
  });

  it('calls logout and navigates to login when the logout button is clicked', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const authStore = useAuthStore();
    authStore.user = { id: 'u_123', name: 'David', email: 'david@example.com' };

    router.push('/configurator');
    await router.isReady();

    const wrapper = createWrapper(pinia);
    await wrapper.find('button').trigger('click');
    await flushPromises();

    expect(authStore.user).toBeNull();
    expect(router.currentRoute.value.name).toBe('login');
  });

  it('toggles language between cs and en on click', async () => {
    router.push('/');
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router, i18n]
      }
    });

    expect(wrapper.text()).toContain('Jazyk');
    expect(wrapper.text()).toContain('Konfigurátor');

    const buttons = wrapper.findAll('button');
    const toggleBtn = buttons.find(b => b.text() === 'cs');

    expect(toggleBtn).toBeDefined();

    await toggleBtn!.trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Language');
    expect(wrapper.text()).toContain('Configurator');

    expect(toggleBtn!.text()).toBe('en');
  });
});
