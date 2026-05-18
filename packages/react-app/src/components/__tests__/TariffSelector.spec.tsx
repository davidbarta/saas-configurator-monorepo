import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import TariffSelector from '../TariffSelector';
import { useConfiguratorStore } from '@/stores/configurator';

describe('TariffSelector', () => {
  beforeEach(() => {
    useConfiguratorStore.getState().fetchInitialData();
  });

  it('renders available tariffs', () => {
    render(<TariffSelector />);

    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('Professional')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('changes active tariff on click', () => {
    render(<TariffSelector />);

    const enterpriseButton = screen.getByRole('button', { name: 'Zvolit tarif Enterprise' });
    fireEvent.click(enterpriseButton);

    expect(screen.getByRole('button', { name: 'Aktivní tarif Enterprise' })).toBeInTheDocument();
  });
});
