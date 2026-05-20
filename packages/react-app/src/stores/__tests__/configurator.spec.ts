import { describe, it, expect, beforeEach } from 'vitest';
import { AddonModule, useConfiguratorStore } from '../configurator';

describe('Configurator Store', () => {
  const initialStoreState = useConfiguratorStore.getState();

  beforeEach(() => {
    useConfiguratorStore.setState(initialStoreState, true);
  });

  it('updates available modules correctly', () => {
    const store = useConfiguratorStore.getState();
    const mockModules: AddonModule[] = [
      {
        id: 'test-1',
        category: 'resource',
        nameKey: 'test-1',
        price: 10
      }
    ];
    store.updateAvailableModules(mockModules);

    expect(useConfiguratorStore.getState().availableModules).toEqual(mockModules);
  });

  it('updates selected modules correctly', () => {
    const store = useConfiguratorStore.getState();
    const mockModules: AddonModule[] = [
      {
        id: 'test-1',
        category: 'resource',
        nameKey: 'test-1',
        price: 10
      }
    ];
    store.updateSelectedModules(mockModules);

    expect(useConfiguratorStore.getState().selectedModules).toEqual(mockModules);
  });
});
