<template>
  <div id="menu">
    <a-menu
      @click="handleClick"
      style="width: 256px"
      mode="inline"
      theme="dark"
      :selectedKeys="menuSelect"
      :openKeys.sync="menuSub"
    >
      <a-sub-menu v-for="item in menuTree" :key="item.id">
        <span slot="title"><a-icon type="appstore"/><span>{{item.title}}</span></span>
        <a-menu-item v-for="jtem in item.children" :key="jtem.id">{{jtem.title}}</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<style scoped>
  #menu {
    /*width: 375px;*/
    height: 100%;
    background-color: #001529;
  }
</style>

<script>
  export default {
    name: "layoutMenu",
    data() {
      return {
        current: ['mail'],
        openKeys: ['sub1'],
        menuSearch:{},
        menuTree:[],
        menuSelect:[],
        menuSub:[],
      }
    },
    methods: {
      handleClick(e) {
        console.log('click', e);
        const {key}=e;
        this.$router.push(this.menuSearch[key].path);

      },
    },
    watch: {
    },
    created() {
      const {menuTrees,menus}=this.$store.state.userInfo;
      this.menuTree=menuTrees;
      for(let item of menus){
        this.menuSearch[item.id]=item;
        this.menuSearch[item.path]=item;
      }
      //路由更改时动态绑定菜单栏位置
      this.menuSelect=[this.menuSearch[this.$route.path].id];
      this.menuSub=[this.menuSearch[this.$route.path].superMenuId];
      this.$router.afterEach((to, from) => {
        this.menuSelect=[this.menuSearch[to.path].id];
        this.menuSub=[this.menuSearch[to.path].superMenuId];
      })
    },
  }
</script>
