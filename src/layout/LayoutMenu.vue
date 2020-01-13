<template>
  <div id="menu">
    <a-menu
      @click="handleClick"
      style="width: 256px"
      :defaultSelectedKeys="['2']"
      :openKeys.sync="openKeys"
      mode="inline"
      theme="dark"
    >
      <a-sub-menu @titleClick="titleClick" v-for="(item,i) in menuTree" :key="item.idx">
        <span slot="title"><a-icon type="appstore"/><span>{{item.title}}</span></span>
        <a-menu-item key="5" v-for="(jtem,j) in item.children" :key="jtem.idx">{{jtem.title}}</a-menu-item>
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
        menuTree: [
          {
            idx: 1, title: "用户中心",
            children: [
              {idx:1,title:"角色管理"},
              {idx:2,title:"角色管理1"},
              {idx:3,title:"角色管理2"},
              {idx:4,title:"角色管理3"},
            ]
          },
          {idx: 2, title: "用户中心1"},
          {idx: 3, title: "用户中心2"},
        ]
      }
    },
    methods: {
      handleClick(e) {
        console.log('click', e)
      },
      titleClick(e) {
        console.log('titleClick', e)
      },
    },
    watch: {
      openKeys(val) {
        console.log('openKeys', val)
      },
    },
  }
</script>
