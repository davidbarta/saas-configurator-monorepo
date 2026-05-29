import { usePathname } from 'next/navigation';
import { describe, it, expect, vi } from 'vitest';
import SidebarNav from '../SidebarNav';
import { render, screen } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    refresh: vi.fn()
  }))
}));

describe('SidebarNav', () => {
  it('highlights the Configurator link when active', () => {
    vi.mocked(usePathname).mockReturnValue('/configurator');

    render(<SidebarNav />);

    const configuratorLink = screen.getByRole('link', { name: 'Configurator' });
    const dashboardLink = screen.getByRole('link', { name: 'Dashboard' });

    expect(configuratorLink).toHaveClass('text-white!', 'bg-indigo-600');
    expect(dashboardLink).not.toHaveClass('bg-indigo-600');
  });
});
