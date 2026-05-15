import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { createPinia, setActivePinia, type Pinia } from 'pinia';
import ConfiguratorView from '../ConfiguratorView.vue';
import TariffSelector from '../../components/TariffSelector.vue';
import AddonSelector from '../../components/AddonSelector.vue';
import CheckoutForm from '../../components/CheckoutForm.vue';
import { useConfiguratorStore } from '../../stores/configurator';
import i18n from '../../i18n';

let pinia: Pinia;
let store: ReturnType<typeof useConfiguratorStore>;

function createWrapper(): VueWrapper {
  return mount(ConfiguratorView, {
    global: {
      plugins: [pinia, i18n]
    }
  });
}

describe('ConfiguratorView.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    pinia = createPinia();
    store = useConfiguratorStore(pinia);
  });

  it('fetches initial data on mount and renders header', () => {
    const wrapper = createWrapper();

    expect(store.availableTariffs.length).toBeGreaterThan(0);
    expect(wrapper.text()).toContain('SaaS Konfigurátor');
  });

  it('renders child selector components and checkout form', () => {
    const wrapper = createWrapper();

    expect(wrapper.findComponent(TariffSelector).exists()).toBe(true);
    expect(wrapper.findComponent(AddonSelector).exists()).toBe(true);
    expect(wrapper.findComponent(CheckoutForm).exists()).toBe(true);
  });

  it('displays the correct total price in the header badge', async () => {
    const wrapper = createWrapper();

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('29 USD');
  });
});
