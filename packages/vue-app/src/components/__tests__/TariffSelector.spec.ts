import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { createPinia, setActivePinia, type Pinia } from 'pinia';
import TariffSelector from '../TariffSelector.vue';
import { useConfiguratorStore } from '../../stores/configurator';
import i18n from '../../i18n';

let pinia: Pinia;
let store: ReturnType<typeof useConfiguratorStore>;

function createWrapper(): VueWrapper {
  return mount(TariffSelector, {
    global: {
      plugins: [pinia, i18n]
    }
  });
}

describe('TariffSelector.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    pinia = createPinia();
    store = useConfiguratorStore(pinia);
  });

  it('renders available tariffs from populated store', async () => {
    store.fetchInitialData();

    const wrapper = createWrapper();

    const tariffCards = wrapper.findAll('h3');
    expect(tariffCards.length).toBe(3);

    expect(wrapper.text()).toContain('Starter');
  });

  it('changes selected tariff on card click', async () => {
    store.fetchInitialData();

    const wrapper = createWrapper();

    const cards = wrapper.findAll('.cursor-pointer');
    expect(cards.length).toBe(3);

    await cards[1]!.trigger('click');

    expect(store.selectedTariff?.id).toBe('professional');
  });
});
