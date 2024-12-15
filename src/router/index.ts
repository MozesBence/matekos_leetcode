import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import LogRegLayout from '@/layouts/LogRegLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default-layout',
      component: DefaultLayout,
      redirect: {name: "home"},
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: '/leader-board',
          name: 'leader-board',
          component: () => import('../views/LeaderBoardView.vue')},
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/AboutView.vue')
        },    
        {
          path: '/community',
          name: 'community',
          component: () => import('../views/CommunityView.vue')
        },
        {
          path: '/contest',
          name: 'contest',
          component: () => import('../views/ContestView.vue')
        },
      ]
    },
    {
      path: '/',
      name: 'logreg-layout',
      component: LogRegLayout,
      redirect: {name: "login"},
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('../views/LogView.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('../views/RegView.vue')
        },
        {
          path: '/forget-password',
          name: 'forget-password',
          component: () => import('../views/ForgetPasswordView.vue')
        },
        {
          path: '/set-new-password',
          name: 'set-new-password',
          component: () => import('../views/SetNewPasswordView.vue')
        },
      ]
    },
    
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/challange',
      name: 'challange',
      component: () => import('../views/ChallangeView.vue')
    },
    {
      path: '/profil/redeem',
      name: 'redeem',
      component: () => import('../views/RedeemView.vue')
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('../views/ReportView.vue')
    },
    {
      path: '/task-submit',
      name: 'task-submit',
      component: () => import('../views/TaskSubmitView.vue')
    },
    {
      path: '/task',
      name: 'task',
      component: () => import('../views/TaskView.vue')
    }
  ]
})

export default router
