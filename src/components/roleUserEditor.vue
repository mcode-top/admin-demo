<template>
  <div id="roleUserEditor">
    <a-modal
      :title="title"
      :visible="value"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form :form="form">
        <a-form-item label="角色名">
          <a-input
            v-decorator="[ 'roleName',ruleName ]"
            placeholder="请输入角色名"
          >
          </a-input>
        </a-form-item>
        <a-form-item label="角色代码">
          <a-input
            v-decorator="[ 'roleCode',ruleCode]"
            placeholder="请输入角色名"
          >
          </a-input>
        </a-form-item>
        <a-form-item label="备注">
          <a-input
            v-decorator="[ 'remark']"
            placeholder="请输入角色名"
          >
          </a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style scoped>
  #roleUserEditor {
  }
</style>

<script>
  import {postData} from "../utlis/api";

  export default {
    name: "roleUserEditor",
    data() {
      return {
        title: "新增角色",
        confirmLoading: false,
        ruleName: {rules: [{required: true, message: '角色名必填'}]},
        ruleCode: {rules: [{required: true, message: '角色代码必填'}]},
        form: this.$form.createForm(this),
      }
    },
    props: {
      value:false
    },
    computed: {
    },
    watch: {
    },
    methods: {
      handleOk(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            const {roleName, roleCode, remark}=values;
            this.addRole(roleName, roleCode, remark);
            this.$emit('ok', values);
          }
        });
      },
      handleCancel() {
        this.$emit('input',false)
      },
      addRole(roleName, roleCode, remark){
        this.confirmLoading = true;
        postData('sys/role/create',{roleName, roleCode, remark}).then(res=>{
          console.log(res);
          if(res.data.code===200){
            this.$message.success(`角色${roleName}新建成功`);
            this.$emit('input',false);
            this.$emit('ok',"");
          }
          this.confirmLoading = false;
        }).catch(err=>{
          this.confirmLoading = false;
          console.error(err);
        })
      }
    },
    created() {
    },
    mounted() {
    },
    beforeDestroy() {
    }
  }
</script>
