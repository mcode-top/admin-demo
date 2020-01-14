<template>
  <div class="flex screen-content">
    <a-form :form="form"
            @submit="handleSubmit"

    >
      <a-form-item label="备注" :label-col="formItemLayout.labelCol"
                   :wrapper-col="formItemLayout.wrapperCol">
        <a-input
          v-decorator="['remark']"
          placeholder="输入备注"
        />
      </a-form-item>
      <a-form-item label="开始时间" :label-col="formItemLayout.labelCol"
                   :wrapper-col="formItemLayout.wrapperCol">
        <a-date-picker
          ranges=""
          v-decorator="['startTime']"
          format="YYYY-MM-DD"
          placeholder="查找时间之前的数据"

        />

      </a-form-item>
      <a-form-item label="结束时间" :label-col="formItemLayout.labelCol"
                   :wrapper-col="formItemLayout.wrapperCol">
        <a-date-picker
          ranges=""
          format="YYYY-MM-DD"
          placeholder="查找时间之后的数据"
          v-decorator="['endTime']"
        />
      </a-form-item>
      <a-form-item
        :wrapper-col="formItemButton.wrapperCol"
      >
        <div class="flex" style="justify-content: space-between">
          <a-button type="primary" html-type="submit" >
            提交
          </a-button>
          <a-button @click="handleReset">
            重置
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>

</template>

<style scoped>
  .screen-content {
    width: 300px;
    flex-direction: column;
  }
</style>

<script>

  import moment from 'moment';
  import 'moment/locale/zh-cn';

  moment.locale('zh-cn');
  export default {
    name: "roleScreen",
    data() {
      return {
        form: this.$form.createForm(this),
        formItemLayout: {
          labelCol: {span: 5},
          wrapperCol: {span: 16}
        },
        formItemButton: {
          wrapperCol: {span: 14, offset: 5}
        },
      }
    },
    computed: {},
    watch: {},
    methods: {
      //日期选择
      moment,
      //提交
      handleSubmit(e) {
        e.preventDefault();

        this.form.validateFields((err, values) => {
          if (!err) {
            // if(values.startTime.valueOf()>values.endTime.valueOf()){
            //   [values.startTime,values.endTime]=[values.endTime.valueOf(),values.startTime.valueOf()];
            // }
            [values.startTime,values.endTime]=[values.startTime&&values.startTime.valueOf(),values.endTime&&values.endTime.valueOf()];
            this.$emit('ok',values);
          }
        });
      },
      //重置
      handleReset(e){
        e.preventDefault();
        this.form.resetFields();
        this.$emit('reset',"");
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
