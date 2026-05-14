import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export interface AddonModule {
  id: string;
  name: string;
  price: number;
  category: 'resource' | 'feature' | 'support';
}

export interface TariffPlan {
  id: string;
  name: string;
  basePrice: number;
  description: string;
}

export const useConfiguratorStore = defineStore('configurator', () => {
  const selectedTariff = ref<TariffPlan | null>(null);
  const selectedModules = ref<AddonModule[]>([]);
  const availableModules = ref<AddonModule[]>([]);
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

  return {
    selectedTariff,
    selectedModules,
    availableModules,
    isLoading,
    totalPrice,
    selectTariff,
    addModule,
    removeModule,
    updateModuleOrder
  };
});
