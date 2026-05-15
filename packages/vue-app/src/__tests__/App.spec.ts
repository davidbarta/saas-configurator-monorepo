import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { createPinia, setActivePinia, type Pinia } from 'pinia';
import App from '../App.vue';
import router from '../router';
import i18n from '../i18n';

function createWrapper(): VueWrapper {
  return mount(App, {
    global: {
      plugins: [createPinia(), router, i18n]
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
});
