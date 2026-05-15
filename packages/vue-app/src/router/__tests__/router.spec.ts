import { describe, it, expect } from 'vitest';
import router from '../index';

describe('Vue Router', () => {
  it('contains correct main route definitions', () => {
    const routes = router.getRoutes();

    expect(routes.length).toBe(3);

    const dashboardRoute = routes.find(r => r.name === 'dashboard');
    const configuratorRoute = routes.find(r => r.name === 'configurator');
    const loginRoute = routes.find(r => r.name === 'login');

    expect(dashboardRoute).toBeDefined();
    expect(dashboardRoute?.path).toBe('/');

    expect(configuratorRoute).toBeDefined();
    expect(configuratorRoute?.path).toBe('/configurator');

    expect(loginRoute).toBeDefined();
    expect(loginRoute?.path).toBe('/login');
  });
});
