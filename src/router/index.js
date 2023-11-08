import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/Home.vue')
    },
    {
      path: '/positions',
      name: 'positions',
      component: () => import('../pages/Positions.vue')
    },
    {
      path: '/positions/:id',
      name: 'position',
      component: () => import('../pages/Position.vue')
    },
    {
      path: '/voting/:id',
      name: 'voting',
      component: () => import('../pages/Voting.vue')
    },
    {
      path: '/results',
      name: 'results',
      component: () => import('../pages/Results.vue')
    }
  ]
});

export default router;
