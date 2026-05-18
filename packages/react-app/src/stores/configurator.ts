import { create } from 'zustand';

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

interface ConfiguratorState {
  selectedTariff: TariffPlan | null;
  selectedModules: AddonModule[];
  availableModules: AddonModule[];
  availableTariffs: TariffPlan[];
  isLoading: boolean;

  // Actions
  selectTariff: (tariff: TariffPlan) => void;
  addModule: (mod: AddonModule) => void;
  removeModule: (id: string) => void;
  updateModuleOrder: (newOrder: AddonModule[]) => void;
  fetchInitialData: () => void;
}

export const useConfiguratorStore = create<ConfiguratorState>(set => ({
  selectedTariff: null,
  selectedModules: [],
  availableModules: [],
  availableTariffs: [],
  isLoading: false,

  selectTariff: tariff => set({ selectedTariff: tariff }),

  addModule: mod =>
    set(state => {
      if (state.selectedModules.some(item => item.id === mod.id)) {
        return state;
      }
      return {
        selectedModules: [...state.selectedModules, mod]
      };
    }),

  removeModule: id =>
    set(state => ({
      selectedModules: state.selectedModules.filter(item => item.id !== id)
    })),

  updateModuleOrder: newOrder => set({ selectedModules: newOrder }),

  fetchInitialData: () => {
    set({ isLoading: true });

    const mockTariffs: TariffPlan[] = [
      {
        id: 'starter',
        nameKey: 'Starter',
        descriptionKey: 'Ideální pro začínající projekty a jednotlivce.',
        basePrice: 29
      },
      {
        id: 'professional',
        nameKey: 'Professional',
        descriptionKey: 'Pro rostoucí týmy vyžadující pokročilé funkce.',
        basePrice: 99
      },
      {
        id: 'enterprise',
        nameKey: 'Enterprise',
        descriptionKey: 'Maximální výkon a neomezené zdroje.',
        basePrice: 249
      }
    ];

    const mockModules: AddonModule[] = [
      { id: 'mod-db', nameKey: 'Extra databáze (+10GB)', price: 15, category: 'resource' },
      { id: 'mod-analytics', nameKey: 'Pokročilá analytika', price: 25, category: 'feature' },
      { id: 'mod-sla', nameKey: 'SLA Podpora 24/7', price: 50, category: 'support' }
    ];

    set({
      availableTariffs: mockTariffs,
      availableModules: mockModules,
      selectedTariff: mockTariffs[0],
      isLoading: false
    });
  }
}));
