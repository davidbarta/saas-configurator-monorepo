import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import AddonSelector from '../AddonSelector';
import { useConfiguratorStore } from '@/stores/configurator';

describe('AddonSelector', () => {
  const initialStoreState = useConfiguratorStore.getState();

  beforeEach(() => {
    useConfiguratorStore.setState(initialStoreState, true);
  });

  it('renders available and selected modules correctly', () => {
    useConfiguratorStore.setState(state => ({
      ...state,
      availableModules: [
        {
          id: 'module-a',
          category: 'feature',
          nameKey: 'Module A',
          price: 15
        }
      ],
      selectedModules: [
        {
          id: 'module-b',
          category: 'resource',
          nameKey: 'Module B',
          price: 35
        }
      ]
    }));

    render(<AddonSelector />);

    expect(screen.getByText('Module A')).toBeInTheDocument();
    expect(screen.getByText('Module B')).toBeInTheDocument();
  });

  it('shows empty state message when no selected modules', () => {
    useConfiguratorStore.setState(state => ({
      ...state,
      availableModules: [
        {
          id: 'module-a',
          category: 'feature',
          nameKey: 'Module A',
          price: 15
        }
      ]
    }));

    render(<AddonSelector />);

    expect(screen.getByText('Module A')).toBeInTheDocument();
    expect(screen.getByText('Zatím nemáš vybrané žádné moduly')).toBeInTheDocument();
  });
});
