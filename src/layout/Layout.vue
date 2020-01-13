<template>
<div id="layout" class="flex">
  <div class="layout-menu flex">
    <l-menu></l-menu>
  </div>
  <div class="layout-content flex">
    <div class="layout-header">
      <l-header></l-header>
    </div>
    <div class="layout-container">
      <router-view></router-view>
    </div>
  </div>
</div>
</template>

<style scoped >
  #layout{
    width: 100vw;
    height: 100vh;
  }
  .layout-menu{
    height: 100%;
    flex-shrink: 0;
  }
  .layout-header{
    flex-shrink: 0;
  }
  .layout-content{
    flex-grow: 1;
    height: 100%;
    overflow: hidden;
    flex-direction: column;
  }
  .layout-container{
    padding: 10px;
    flex-grow: 1;
  }
</style>

<script>
  import LayoutMenu from './LayoutMenu';
  import Header from './LayoutHeader';
export default {
  name: "Layout",
  components:{
    'l-header':Header,
    'l-menu':LayoutMenu,
  },
  data(){
    return{
    }
  },
  computed:{},
  watch:{},
  methods:{},
  created(){},
  mounted(){},
  beforeDestroy(){}
}
</script>
