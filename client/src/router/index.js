import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/Home.vue'),
  },
  {
    path: '/add-task',
    name: 'AddTask',
    component: () => import('../components/AddTask.vue'),
  },
  {
    path: '/all-tasks',
    name: 'AllTasks',
    component: () => import('../components/AllTasks.vue'),
  },
  {
    path: '/single-task/:id',
    name: 'SingleTask',
    component: () => import('../components/SingleTask.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
