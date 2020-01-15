<template>
  <div id="role">
    <div class="search-box flex">
      <a-input-group compact>
        <a-select v-model="setting.type">
          <a-select-option value="name">姓名搜索</a-select-option>
          <a-select-option value="id">Id查找</a-select-option>
        </a-select>
        <a-input style="width: 20%" v-model="setting.value" @change="onSearchChange" placeholder="输入相关信息搜索角色"/>
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
      <a-button @click="addRoleVisible=true">
        新增
      </a-button>
    </div>
    <a-table rowKey="id"
             :columns="columns"
             @change="onPaginationChange"
             :pagination="pagination" :dataSource="roleData" :loading="loading">
      <!--      <template v-for="col in ['roleName', 'roleCode', 'remark']" :slot="col" slot-scope="text, record, index">-->
      <!--        <div :key="col">-->
      <!--          <a-input-->
      <!--            v-if="!record.editable"-->
      <!--            style="margin: -5px 0"-->
      <!--            :value="text"-->
      <!--          />-->
      <!--          <template v-else>{{text}}</template>-->
      <!--        </div>-->
      <!--      </template>-->
      <template v-for="col in ['roleName','roleCode','remark']" :slot="col" slot-scope="text, record, index">
        <div :key="col">
          <a-input
            v-if="!record.editable"
            style="margin: -5px 0"
            v-model="text"
            @change="e => onTableItemChange(e.target.value, index, col)"
          />
          <template v-else>{{text}}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class='editable-row-operations' v-if="record.editable">
          <a-button type="primary" @click="()=>editableShowRole(record,index)">
            修改
          </a-button>
          <a-popconfirm title="是否删除该角色" @confirm="()=>deleteRole(record.id)" okText="是"
                        cancelText="否">
            <a-button type="danger" :disabled="!record.deletable">
              删除
            </a-button>
          </a-popconfirm>
        </div>
        <!--修改时-->
        <div class='editable-row-operations' v-else>
          <a-popconfirm title="是否修改该角色" @confirm="()=>editableSaveRole(record,index)" okText="是"
                        cancelText="否">
            <a-button type="primary">
              确定
            </a-button>
          </a-popconfirm>

          <a-button type="danger" @click="()=>editableCancelRole(index)">
            取消
          </a-button>
        </div>
      </template>
    </a-table>
    <cm-user-editor v-model="addRoleVisible" @ok="onAddRoleOK"></cm-user-editor>
  </div>
</template>

<style scoped>
  #role {
    overflow-y: auto;
  }

  .search-box {
    justify-content: space-between;
    width: 100%;
    padding: 10px 30px;
  }

</style>

<script>
  import {deleteData, postData, putData} from "../../utlis/api";
  import screen from '@/components/roleScreen'
  import userEditor from '@/components/roleUserEditor'
  import moment from 'moment';

  export default {
    name: "role",
    components: {
      'cm-screen': screen,
      'cm-user-editor': userEditor,
    },
    data() {
      const columns = [
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
          title: "角色名",
          width: '25%',
          dataIndex: "roleName",
          scopedSlots: {customRender: 'roleName'},

        },
        {
          title: "角色代码",
          width: '15%',
          dataIndex: "roleCode",
          scopedSlots: {customRender: 'roleCode'},

        },
        {
          title: "备注",
          width: '20%',
          dataIndex: "remark",
          scopedSlots: {customRender: 'remark'},
        },
        {
          title: "操作",
          width: '15%',
          dataIndex: 'operation',
          scopedSlots: {customRender: 'operation'},
        }
      ];
      return {
        roleData: [],
        cacheData: {},
        pagination: {
          defaultPageSize: 7,
          current: 1,
          defaultCurrent: 1,
          total: 0,
          change: this.onPaginationChange
        },
        loading: false,
        columns: columns,
        setting: {
          visible: false,
          type: "name",
          value: "",
        },
        searchParams: [],
        onlyParams: {},
        addRoleVisible: false,
        updateRoleVisible: false,
      }
    },
    computed: {},
    watch: {},
    methods: {
      moment,
      //删除角色
      deleteRole(id) {
        deleteData('sys/role/delete', {id}).then(res => {
          if (res.data.code === 200) {
            this.$message.success(`角色删除成功`);
            this.findTable(this.pagination.defaultPageSize, this.pagination.current, this.searchParams);
          }
        }).catch(err => {
          console.error(err);
        })
      },
      //显示修改框
      editableShowRole(cache, index) {
        let newData={};
        for(let item in cache){
          if(cache.hasOwnProperty(item)){
            newData[item]=cache[item]
          }
        }
        this.cacheData[index] = newData;
        this.roleData[index].editable = false;
      },
      //修改框是否保存
      editableSaveRole(values,index){
        const {roleName,roleCode,remark,id}=values;
        this.loading = true;
        putData('sys/role/update',{id,roleName,roleCode,remark}).then(res=>{
          this.loading = false;
          if(res.data.code===200){
            this.$message.success("修改成功");
            this.roleData[index]=values;
            this.roleData[index].editable = true;
          }else{
            this.$message.warning(res.data.message)
          }
        }).catch(err=>{
          this.loading = false;
          console.error(err);
        })
      },
      //取消修改框时还原
      editableCancelRole(index){
        this.roleData.splice(index,1,this.cacheData[index]);
      },
      onAddRoleOK() {
        this.findTable(this.pagination.defaultPageSize, this.pagination.current, this.searchParams);
      },
      //搜索框改变时
      onSearchChange() {
        setTimeout(() => {
          let option;
          if (this.setting.type === 'name') {
            option = {
              "key": "roleName",
              "link": "lk",
              "values": [
                this.setting.value
              ]
            }
          } else {
            option = {
              "key": "id",
              "link": "lk",
              "values": [
                this.setting.value
              ]
            }
          }
          this.addParams('basicInfo', option);
          this.findTable(this.pagination.defaultPageSize, this.pagination.defaultCurrent, this.searchParams);
        }, 100)
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
      //当表格分页发生改变时
      onPaginationChange(pagination, filters, sorter) {
        const {current} = pagination;
        console.log(pagination, filters, sorter);
        this.findTable(this.pagination.defaultPageSize, current);

      },
      //筛选额外内容清空时
      onScreenReset() {
        this.onToggleSetting(false);
        this.removeParams(['remark', 'regTime', 'startTime', 'endTime']);
        this.findTable(this.pagination.defaultPageSize, this.pagination.defaultCurrent, this.searchParams);
      },
      //筛选额外内容完成时
      onScreenOK(val) {
        this.onToggleSetting(false);
        let {remark, startTime, endTime} = val;
        this.removeParams(['remark', 'regTime', 'startTime', 'endTime']);
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
      onTableItemChange(value, index, column) {
        this.roleData[index][column] = value;
      },
      //添加查询数组
      addParams(key, option) {
        if (this.onlyParams[key] !== undefined) {
          this.searchParams[this.onlyParams[key]] = option
        } else {
          this.onlyParams[key] = this.searchParams.length;
          this.searchParams.push(option)
        }
      },
      //通过key删除查询数组
      removeParams(keys) {
        if (keys && keys.length > 0) {
          keys.forEach((val, i, arr) => {
            if (this.onlyParams[val]) {
              this.searchParams.splice(this.onlyParams[val], 1);
              this.onlyParams[val] = undefined;
            }
          })
        } else {
          if (this.onlyParams[key]) {
            this.searchParams.splice(this.onlyParams[key], 1);
            this.onlyParams[key] = undefined;
          }
        }

      },
      //清空查询数组
      clearParams(keys) {
        if (keys && keys.length > 0) {
          let temp = [];
          let onlyTemp = {};
          keys.forEach((val, i, arr) => {
            if (this.onlyParams[val]) {
              onlyTemp[val] = temp.length;
              temp.push(this.searchParams[this.onlyParams[val]]);
            }
          })
          this.onlyParams = onlyTemp;
          this.searchParams = temp;
        } else {
          this.onlyParams = {};
          this.searchParams = [];
        }

      },
      //查找数据生成表格
      findTable(size, current, params) {
        this.loading = true;
        postData('sys/role/page', {
          "current": current,
          "size": size,
          "params": params,
          "order": [
            {
              key: 'createTime',
              asc: false
            }
          ]
        }).then(res => {
          this.loading = false;

          if (res.data.code === 200) {
            const {records, total} = res.data.data;
            //初始化修改表格缓存
            this.cacheData={};
            this.roleData = records;
            this.pagination.current = current;
            this.pagination.total = Number(total);
          }
        }).catch(err => {
          console.error(err);
          this.loading = false;
        })
      },
      save(e, e1, e2) {
        console.log(e, e1, e2);
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
