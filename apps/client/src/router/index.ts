import { createRouter, createWebHistory } from 'vue-router'
import GroupView from '../views/GroupView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GroupView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('../views/UploadView.vue')
    },
    {
      path: '/seed_groups/:seed_group',
      name: 'seed_groups',
      component: () => import('../views/SeedView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/logged_in',
      name: 'logged_in',
      component: () => import('../views/LoggedInView.vue')
    },
    {
      path: '/form_group',
      name: 'form_group',
      component: () => import('../views/FormGroupView.vue')
    },
    {
      path: '/student_list',
      name: 'student_list',
      component: () => import('../views/StudentListView.vue')
    },
    {
      path: '/person/:id',
      name: 'student_detail',
      component: () => import('../views/StudentView.vue')
    }
  ]
})
export default router
