<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view/>

    </a-locale-provider>
  </div>
</template>

<script>
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';

  export default {
    name: 'App',
    data() {
      return {
        locale: zhCN,

      }
    }
  }
</script>

<style>
</style>
