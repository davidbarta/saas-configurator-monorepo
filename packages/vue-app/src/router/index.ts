import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';
import ConfiguratorView from '@/views/ConfiguratorView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/configurator',
      name: 'configurator',
      component: ConfiguratorView
    }
  ]
});

export default router;
