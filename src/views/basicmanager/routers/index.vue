<template>
    <div class="app-container">
        <el-row :gutter="20">
            <!-- 一级菜单 -->
            <el-col :span="4">
              <div>
                <!-- <el-button type="primary" icon="el-icon-plus" size="mini"  round>新增</el-button> -->
                <el-button type="primary" icon="el-icon-edit" size="mini"  round @click="changeStatus(1)">启用</el-button>
                <el-button type="primary" icon="el-icon-edit" size="mini"  round @click="changeStatus(0)">禁用</el-button>
              </div0
              <div>
                  <ul>
                    <li v-for=" item in parentRouters" :key="item.routerId " >
                      <el-button type="text" @click="change(item.routerId)" :class="{'onClicked' : item.routerId == listQuery.routerParentId }">
                        <span v-if="item.status == 1">
                          {{item.name}}
                        </span>
                        <span v-else :title="isDisabled">
                          <s>{{item.name}}</s>
                        </span>
                      </el-button>
                      <i :class="{ 'el-icon-check' : item.routerId == listQuery.routerParentId }"></i>
                    </li>
                </ul>
              </div>
            </el-col>
            <!-- 二级菜单 -->
            <el-col :span="20">
                <div>
                  <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row >
                    <el-table-column align="center" prop="routerId" label='序号'  >
                      <template slot-scope="scope">
                        <span>{{scope.row.routerId}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" prop="path" label='路由请求路径'  >
                      <template slot-scope="scope">
                        <span>{{scope.row.path}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" prop="component" label='组件'  >
                      <template slot-scope="scope">
                        <span>{{scope.row.component}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" prop="title" label='标题'  >
                      <template slot-scope="scope">
                        <span>{{scope.row.title}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" prop="updateTime" label='更新时间'  >
                      <template slot-scope="scope">
                        <span>{{scope.row.updateTime}}</span>
                      </template>
                    </el-table-column>                    
                    <el-table-column align="center" prop="createTime" label='创建时间'  >
                      <template slot-scope="scope">
                        <span>{{scope.row.createTime}}</span>
                      </template>
                    </el-table-column>   
                    <el-table-column align="center" prop="status" label='可用状态'  >
                      <template slot-scope="scope">
                        <span>{{scope.row.status}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                <div class="pagination-container">
                  <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
                  </el-pagination>
                </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { parents, children, update } from '@/api/basicmanager/routers'
export default {
  name: 'routers-component',
  data() {
    return {
      isDisabled: '当前标题处于禁用状态', //
      parentRouters: null,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        prop: 'create_time', // 排序字段
        order: 'desc', // 排序方式
        routerParentId: null
      }
    }
  },
  methods: {
    getParents() {
      parents().then(response => {
        this.parentRouters = response.data
        this.listQuery.routerParentId = response.data[0].routerId
        console.log(this.listQuery.routerParentId)
        this.getChildren()
      }).catch(err => {
        console.log(err)
      })
    },
    getChildren() {
      this.listLoading = true
      children(this.listQuery).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      }).catch(err => {
        console.log(err)
      })
      this.listLoading = false
    },
    change(routerId) {
      this.listQuery.routerParentId = routerId
      this.getChildren()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getChildren()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getChildren()
    },
    changeStatus(status) {
      const _router = this.parentRouters.find(item => {
        return item.routerId === this.listQuery.routerParentId
      })
      if (status === _router.status) {
        this.$message({
          message: '操作无效！',
          type: 'warning'
        })
      } else {
        const router = {
          routerId: _router.routerId,
          status: status
        }
        update(router).then(response => {
          this.getParents()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        }).catch(err => {
          console.log(err)
          this.$message.error('操作失败！')
        })
      }
    }
  },
  created() {
    this.getParents()
  }

}
</script>

<style scoped>
ul {
  list-style-type:none;
}
.onClicked {
  color: #F56C6C
}



</style>