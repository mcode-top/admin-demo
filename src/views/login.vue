<template>
  <div id="login">
  </div>
</template>

<style scoped>
  #login {
    width: 100vw;
    height: 100vh;
    background-color: #909399;
  }
</style>

<script>
  import {postData} from "../utlis/api";

  export default {
    name: "login",
    components: {},
    data() {
      return {
        ruleForm: {
          username: "",
          password: ""
        },

      }
    },
    computed: {},
    watch: {},
    methods: {
      submitForm() {
      }
    },
    created() {
      postData('login', {username: 'admin', password: '123456',},
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(res => {
        console.log(res);
      })
    },
    mounted() {
    },
    beforeDestroy() {
    }
  }
</script>
