import { describe, it, expect } from 'vitest';
import router from '../index';

describe('Vue Router', () => {
  it('contains correct main route definitions', () => {
    const routes = router.getRoutes();

    expect(routes.length).toBe(2);

    const dashboardRoute = routes.find(r => r.name === 'dashboard');
    const configuratorRoute = routes.find(r => r.name === 'configurator');

    expect(dashboardRoute).toBeDefined();
    expect(dashboardRoute?.path).toBe('/');

    expect(configuratorRoute).toBeDefined();
    expect(configuratorRoute?.path).toBe('/configurator');
  });
});
