import { createRouter, createWebHistory } from 'vue-router'
import teretane from '../views/teretane.vue'
import registracija from '@/views/registracija.vue'
import prijava from '@/views/prijava.vue'
import dodajgym from '@/views/dodajgym.vue'
import pretrazigym from '@/views/pretrazigym.vue'
import { getAuth } from 'firebase/auth';



const routes = [
 
  {
    path: '/',
    name: 'home',
    component: teretane,
    meta: { requiresAuth: true }
  },
  {
    path: '/prijava',
    name: 'prijava',
    component: () => import(/* webpackChunkName: "login" */ '../views/prijava.vue')
  },
  {
    path: '/registracija',
    name: 'registracija',
    component: () => import(/* webpackChunkName: "registracija" */ '../views/registracija.vue')
  },
  {
    path: '/teretane',
    name: 'Teretane',
    component: teretane, 
    meta: { requiresAuth: true }
  },
  {
    path: '/dodajgym',
    name: 'dodajgym',
    component: () => import(/* webpackChunkName: "dodajgym" */ '../views/dodajgym.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/pretrazigym',
    name: 'pretrazigym',
    component: () => import(/* webpackChunkName: "pretrazigym" */ '../views/pretrazigym.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const isAuthenticated = !!auth.currentUser; // Provjeri je li korisnik prijavljen
  const authRequired = to.matched.some(record => record.meta.requiresAuth);

  if (authRequired && !isAuthenticated) {
    next('/prijava'); // Ako ruta zahtijeva prijavu i korisnik nije prijavljen, preusmjeri na login
  } else {
    next(); // Ako korisnik ima pristup, nastavi dalje
  }
});

export default router
