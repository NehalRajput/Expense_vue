import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Expenses from '../views/Expenses.vue';
import Groups from '../views/Groups.vue';

const routes = [
  { path: '/', component: Dashboard },
  { path: '/expenses', component: Expenses },
  { path: '/groups', component: Groups },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;