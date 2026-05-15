import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useConfiguratorStore } from '../configurator';

describe('Configurator Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('has the correct initial state', () => {
    const store = useConfiguratorStore();
    expect(store.selectedTariff).toBeNull();
    expect(store.selectedModules).toEqual([]);
    expect(store.totalPrice).toBe(0);
  });

  it('fetches initial data and selects the first tariff', () => {
    const store = useConfiguratorStore();
    store.fetchInitialData();

    expect(store.availableTariffs.length).toBeGreaterThan(0);
    expect(store.availableModules.length).toBeGreaterThan(0);
    expect(store.selectedTariff).toEqual(store.availableTariffs[0]);
    expect(store.totalPrice).toBe(store.availableTariffs[0]!.basePrice);
  });

  it('calculates total price correctly with modules', () => {
    const store = useConfiguratorStore();
    store.fetchInitialData();

    expect(store.availableModules.length).toBeGreaterThan(0);

    const initialPrice = store.totalPrice;
    const moduleToAdd = store.availableModules[0]!;

    store.addModule(moduleToAdd);
    expect(store.selectedModules).toContain(moduleToAdd);
    expect(store.totalPrice).toBe(initialPrice + moduleToAdd.price);

    store.addModule(moduleToAdd);
    expect(store.selectedModules.length).toBe(1);

    store.removeModule(moduleToAdd.id);
    expect(store.selectedModules).not.toContain(moduleToAdd);
    expect(store.totalPrice).toBe(initialPrice);
  });
});
