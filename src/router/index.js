import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login.vue';
import Layout from '@/layout/Layout.vue';
import role from '@/layout/ucenter/role.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登入页面',
      component: Login
    },
    {
      path: "/",
      name: "首页",
      component: Layout,
      children: [
        {
          path:"ucenter/role",
          name:"角色管理",
          component:role
        }
      ]
    },
    // {
    //   path:'/ucenter/role',
    //   name:"角色管理",
    //   component:Role
    // }
  ]
})
