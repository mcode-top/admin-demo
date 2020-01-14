<template>
  <div id="role">
    <div class="search-box">
      <a-input-group compact>
        <a-select v-model="setting.type">
          <a-select-option value="name">姓名搜索</a-select-option>
          <a-select-option value="id">Id查找</a-select-option>
        </a-select>
        <a-input style="width: 50%" v-model="setting.value" @change="onSearchChange" placeholder="输入相关信息搜索角色"/>
        <a-popover
          title="额外筛选条件"
          trigger="click"
          v-model="setting.visible"
        >
          <!--          <a @click="onToggleSetting" slot="content">Close</a>-->
          <cm-screen slot="content" @ok="onScreenOK" @reset="onScreenReset"></cm-screen>
          <a-button>
            <a-icon type="setting"/>
          </a-button>
        </a-popover>
      </a-input-group>
    </div>
    <a-table rowKey="id"
             :columns="columns" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
             @change="onPaginationChange"
             :pagination="pagination" :dataSource="roleData" :loading="loading">
      <!--             :rowKey="record => record.login.uuid"-->
      <!--             :dataSource="data"-->
      <!--             :pagination="pagination"-->
      <!--             :loading="loading"-->
      <!--             @change="handleTableChange"-->

      <!--      <template slot="name" slot-scope="name">-->
      <!--        {{name.first}} {{name.last}}-->
      <!--      </template>-->
    </a-table>
  </div>
</template>

<style scoped>
  #role {
  }


</style>

<script>
  import {postData} from "../../utlis/api";
  import screen from '@/components/roleScreen'
  import moment from 'moment';

  export default {
    name: "role",
    components: {
      'cm-screen': screen
    },
    data() {
      return {
        selectedRowKeys: [],
        roleData: [],
        pagination: {
          defaultPageSize: 10,
          current: 1,
          defaultCurrent: 1,
          total: 0,
          change: this.onPaginationChange
        },
        loading: false,
        columns: [
          {
            title: "id",
            width: '15%',
            dataIndex: "id"

          },
          {
            title: "创建时间",
            width: '15%',
            dataIndex: "createTime"
          },
          {
            title: "角色姓名",
            width: '25%',
            dataIndex: "roleName"

          },
          {
            title: "备注",
            width: '25%',
            dataIndex: "remark"

          },
          {
            title: "操作",
            width: '25%',
          }
        ],
        setting: {
          visible: false,
          type: "name",
          value: "",
        },
        searchParams: [],
        onlyParams: {},
      }
    },
    computed: {},
    watch: {},
    methods: {
      moment,
      //搜索框改变时
      onSearchChange() {
        setTimeout(()=>{
          let option;
          if (this.setting.type === 'name') {
            option = {
              "key": "roleName",
              "link": "lk",
              "values": [
                this.setting.value
              ]
            }
          }else{
            option={
              "key": "id",
              "link": "lk",
              "values": [
                this.setting.value
              ]
            }
          }
          this.addParams('basicInfo',option);
          this.findTable(this.pagination.defaultPageSize, this.pagination.defaultCurrent, this.searchParams);
        },100)
        // this.removeParams('basicInfo');

      },
      //切换设置框
      onToggleSetting(is) {
        if (is !== undefined) {
          this.setting.visible = is;
        } else {
          this.setting.visible = !this.setting.visible
        }
      },
      //选中复选框时
      onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.selectedRowKeys = selectedRowKeys;
      },
      //当表格分页发生改变时
      onPaginationChange(pagination, filters, sorter) {
        const {current} = pagination;
        console.log(pagination, filters, sorter);
        this.findTable(this.pagination.defaultPageSize, current);

      },
      //筛选额外内容清空时
      onScreenReset() {
        this.onToggleSetting(false);
        this.clearParams(['basicInfo']);
        this.findTable(this.pagination.defaultPageSize, this.pagination.defaultCurrent, this.searchParams);
      },
      //筛选额外内容完成时
      onScreenOK(val) {
        this.onToggleSetting(false);
        let {remark, startTime, endTime} = val;
        this.clearParams(['basicInfo']);
        if (remark) {
          this.addParams('remark', {
            "key": "remark",
            "link": "lk",
            "values": [
              remark
            ]
          });
        }
        if (startTime && endTime) {
          if (startTime > endTime) {
            [startTime, endTime] = [endTime, startTime];
          }
          this.addParams('regTime', {
            "key": "date(createTime)",
            "link": "bt",
            "values": [
              moment(new Date(startTime)).format('YYYY-MM-DD')
              ,
              moment(new Date(endTime)).format('YYYY-MM-DD')
            ]

          });
        } else {
          if (startTime) {
            this.addParams('startTime', {
              "key": "date(createTime)",
              "link": "ge",
              "values": [
                moment(new Date(startTime)).format('YYYY-MM-DD')
              ]
            });
          }
          if (endTime) {
            this.addParams('endTime', {
              "key": "date(createTime)",
              "link": "le",
              "values": [
                moment(new Date(endTime)).format('YYYY-MM-DD')
              ]
            });
          }
        }
        this.findTable(this.pagination.defaultPageSize, this.pagination.defaultCurrent, this.searchParams);
      },
      //添加查询数组
      addParams(key, option) {
        if (this.onlyParams[key]!==undefined) {
          this.searchParams[this.onlyParams[key]] = option
        } else {
          this.onlyParams[key] = this.searchParams.length;
          this.searchParams.push(option)
        }
      },
      //通过key删除查询数组
      removeParams(key) {
        if (this.onlyParams[key]) {
          this.searchParams.splice(this.onlyParams[key], 1);
          this.onlyParams[key] = undefined;
        }
      },
      //清空查询数组
      clearParams(keys) {
        if(keys && keys.length>0){
          let temp=[];
          let onlyTemp={};
          keys.forEach((val,i,arr)=>{
            if(this.onlyParams[val]){
              onlyTemp[val]=temp.length;
              temp.push(this.searchParams[this.onlyParams[val]]);
            }
          })
          this.onlyParams = onlyTemp;
          this.searchParams = temp;
        }else{
          this.onlyParams = {};
          this.searchParams = [];
        }

      },
      //查找数据生成表格
      findTable(size, current, params) {
        postData('sys/role/page', {
          "current": current,
          "size": size,
          "params": params,
        }).then(res => {
          if (res.data.code === 200) {
            const {records, total} = res.data.data;
            this.roleData = records;
            this.pagination.current = current;
            this.pagination.total = Number(total);
          }
        })
      }
    },
    created() {
      this.findTable(this.pagination.defaultPageSize, this.pagination.defaultCurrent);
    },
    mounted() {
    },
    beforeDestroy() {
    }
  }
</script>
