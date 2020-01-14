<template>
  <div id="login" class="flex">
    <a-form
      :form="form"
      @submit="handleSubmit"
      id="login-form"
    >
      <div class="login-title">后台管理系统</div>

      <a-form-item>
        <a-input
          v-decorator="[
          'username',
          { rules: [{ required: true, message: '用户名必填' }] }
        ]"
          placeholder="请输入用户名"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
          'password',
          { rules: [{ required: true, message: '密码必填' }] }
        ]"
          type="password"
          placeholder="请输入密码"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item
      >
        <a-button
          type="primary"
          html-type="submit"
          block
          :loading="loginLoading"
        >
          登入
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
  #login {
    width: 100vw;
    height: 100vh;
    background-color: #909399;
    justify-content: center;
    align-items: center;
  }

  #login-form {
    width: 400px;
    height: 300px;
    background-color: #fff;
    border-radius: 10px;
    padding: 0 30px;
  }

  .login-title {
    margin-top: 30px;
    padding: 10px 0;
    font-size: 18px;
    font-weight: bold;
    text-align: center;

  }
</style>

<script>
  import {mapActions} from 'vuex';
  // import {Form, Input, Button,Icon} from 'ant-design-vue';
  //
  export default {
    name: "login",
    // components: {
    //   'a-form': Form,
    //   'a-form-item': Form.Item,
    //   'a-input': Input,
    //   'a-button': Button,
    //   'a-icon':Icon
    // },
    data() {
      return {
        form: this.$form.createForm(this),
        loginLoading:false,
        // ruleForm: {
        //   username: "TravisChen",
        //   password: "jjjjjj"
        // },

      }
    },
    computed: {},
    watch: {},
    methods: {
      handleSubmit  (e) {
        e.preventDefault();
        this.loginLoading=true;
        this.form.validateFields((err, values) => {
          if (!err) {
            const {username,password}=values;
            this.login({username,password}).then(res => {
              this.$router.push('/')
            }).catch(err=>{
              this.loginLoading=false;
              this.$message.warning(err.message);
            })
          }
        });
      },
      getUsers() {
      },
      ...mapActions(['login'])
    },
    created() {
    },
    mounted() {
    },
    beforeDestroy() {
    }
  }
</script>
