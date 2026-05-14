import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export interface AddonModule {
  id: string;
  nameKey: string;
  price: number;
  category: 'resource' | 'feature' | 'support';
}

export interface TariffPlan {
  id: string;
  nameKey: string;
  basePrice: number;
  descriptionKey: string;
}

export const useConfiguratorStore = defineStore('configurator', () => {
  const selectedTariff = ref<TariffPlan | null>(null);
  const selectedModules = ref<AddonModule[]>([]);
  const availableModules = ref<AddonModule[]>([]);
  const availableTariffs = ref<TariffPlan[]>([]);
  const isLoading = ref(false);

  const totalPrice = computed(() => {
    const base = selectedTariff.value?.basePrice ?? 0;
    const addons = selectedModules.value.reduce((sum, item) => sum + item.price, 0);
    return base + addons;
  });

  function selectTariff(tariff: TariffPlan) {
    selectedTariff.value = tariff;
  }

  function addModule(mod: AddonModule) {
    if (!selectedModules.value.some(item => item.id === mod.id)) {
      selectedModules.value.push(mod);
    }
  }

  function removeModule(id: string) {
    selectedModules.value = selectedModules.value.filter(item => item.id !== id);
  }

  function updateModuleOrder(newOrder: AddonModule[]) {
    selectedModules.value = newOrder;
  }

  function fetchInitialData() {
    isLoading.value = true;
    selectedModules.value = [];
    try {
      availableTariffs.value = [
        {
          id: 'starter',
          nameKey: 'tariffs.starter.name',
          descriptionKey: 'tariffs.starter.desc',
          basePrice: 29
        },
        {
          id: 'professional',
          nameKey: 'tariffs.professional.name',
          descriptionKey: 'tariffs.professional.desc',
          basePrice: 99
        },
        {
          id: 'enterprise',
          nameKey: 'tariffs.enterprise.name',
          descriptionKey: 'tariffs.enterprise.desc',
          basePrice: 249
        }
      ];

      availableModules.value = [
        { id: 'mod-db', nameKey: 'modules.db', price: 15, category: 'resource' },
        { id: 'mod-analytics', nameKey: 'modules.analytics', price: 25, category: 'feature' },
        { id: 'mod-sla', nameKey: 'modules.sla', price: 50, category: 'support' }
      ];

      if (availableTariffs.value.length > 0) {
        selectedTariff.value = availableTariffs.value[0] ?? null;
      }
    } finally {
      isLoading.value = false;
    }
  }

  function updateAvailableModules(newModules: AddonModule[]) {
    availableModules.value = newModules;
  }

  return {
    selectedTariff,
    selectedModules,
    availableModules,
    availableTariffs,
    isLoading,
    totalPrice,
    selectTariff,
    addModule,
    removeModule,
    updateModuleOrder,
    fetchInitialData,
    updateAvailableModules
  };
});
