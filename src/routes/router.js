import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'Login' && localStorage.getItem('isLogin') == 'true') {
    return next('/')
  }
  
  if(to.matched.some(record => record.meta.requiresAuth)) { 
    if(localStorage.getItem('isLogin') == 'true') {
      if(to.matched.some(record => record.meta.protectedLogin)){
        if( parseInt(localStorage.getItem('isAdmin')) === 1){
          next()
        }else{
          next('/')
        }
      }else{
        next()
      }
		}else{
      next('/login')
    }
	}else {
	 next()
	}	
})

export default router