// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './utlis/store'
import "@/assets/global.css";
import 'ant-design-vue/dist/antd.css';
import antDesign from 'ant-design-vue';
Vue.use(antDesign);
Vue.config.productionTip = false;
/* eslint-disable no-new */

//默认缓存登入
router.beforeEach((to,from,next)=>{
  if(to.path==='/login'){
    next()
  }else{
    if(!store.state.token){
      let userInfo=sessionStorage.getItem('userInfo');
      if(userInfo){
        const {username,password}=JSON.parse(userInfo);
        store.dispatch('login',{username,password}).then(res=>{
          next();
        }).catch(err => {
          next('/login');
          console.error(err.message);
        })
      }else{
        next('/login');
      }
    }else {
      next();
    }

  }
});

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
