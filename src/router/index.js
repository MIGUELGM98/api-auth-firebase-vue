import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      rutaProtegida:true
    }
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: () => import(/* webpackChunkName: "about" */ '../views/Editar.vue'),
    meta:{
      rutaProtegida:true
    }
  },
  {
    path: '/login', 
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/ingreso', 
    name: 'Ingreso',
    component: () => import(/* webpackChunkName: "about" */ '../views/Ingreso.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


//hacer una ruta protegida con vue
router.beforeEach((to,from,next)=>{
  if(to.meta.rutaProtegida){
    if(store.getters.usuarioAutenticado){ 
      next()
    }else{
      next('/ingreso')
    }
  }else{
    next()
  }
})

export default router
