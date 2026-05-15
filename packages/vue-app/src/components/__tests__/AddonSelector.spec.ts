import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { createPinia, setActivePinia, type Pinia } from 'pinia';
import AddonSelector from '../AddonSelector.vue';
import { useConfiguratorStore } from '../../stores/configurator';
import i18n from '../../i18n';
import { afterEach } from 'node:test';

let pinia: Pinia;
let store: ReturnType<typeof useConfiguratorStore>;

function createWrapper(): VueWrapper {
  return mount(AddonSelector, {
    global: {
      plugins: [pinia, i18n]
    }
  });
}

describe('AddonSelector.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    pinia = createPinia();
    store = useConfiguratorStore(pinia);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders available modules correctly', () => {
    store.fetchInitialData();

    const wrapper = createWrapper();

    expect(wrapper.text()).toContain('Extra databáze'); // Uses localized text from cs.ts
    expect(wrapper.text()).toContain('+15');
  });

  it('shows empty state when no modules are selected', () => {
    const wrapper = createWrapper();

    expect(wrapper.text()).toContain('Zatím jsi nepřetáhl žádný modul');
  });

  it('updates rendering when a module is selected via store', async () => {
    store.fetchInitialData();

    const wrapper = createWrapper();

    const availableModules = store.availableModules;
    expect(availableModules.length).toBe(3);

    const moduleToAdd = store.availableModules[0]!;
    store.addModule(moduleToAdd);

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).not.toContain('Zatím jsi nepřetáhl žádný modul');
  });
});
