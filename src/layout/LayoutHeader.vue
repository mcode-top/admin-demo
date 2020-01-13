<template>
<div id="Header">
  {{hello}}
</div>
</template>

<style scoped >
  #Header{
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #eee;
  }
</style>

<script>
export default {
  name: "LayoutHeader",
  data(){
    return{
      hello:"Header"
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
