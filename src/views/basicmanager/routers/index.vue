<template>
    <div class="app-container">
        <el-row :gutter="20">
            <!-- 一级菜单 -->
            <el-col :span="4">
              <div>
                <el-button type="success" size="mini" v-waves round @click="changeStatus(1)">启用</el-button>
                <!-- <el-button type="danger" size="mini" v-waves round @click="changeStatus(0)">禁用</el-button> -->
              </div>
              <div >
                <div class="mainlist" v-for=" item in parentRouters" :key="item.routerId" >
                  <el-button type="text" @click="change(item.routerId)" :class="{'onClicked' : item.routerId == listQuery.routerParentId }">
                      {{item.name}}
                  </el-button>
                  <span v-if="item.status == 1">
                    <svg-icon icon-class="qiyong" />
                  </span>
                  <span v-else>
                    <svg-icon icon-class="jinyong" />
                  </span>
                </div>
              </div>
            </el-col>
            <!-- 二级菜单 -->
            <el-col :span="20">
                <div>
                  <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row >
                    <el-table-column align="center" prop="routerId" label='序号'>
                      <template slot-scope="scope">
                        <span>{{scope.row.routerId}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" prop="path" label='路由请求路径'>
                      <template slot-scope="scope">
                        <span>{{scope.row.path}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" prop="component" label='组件'>
                      <template slot-scope="scope">
                        <span>{{scope.row.component}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" prop="title" label='标题'>
                      <template slot-scope="scope">
                        <span>{{scope.row.title}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" prop="updateTime" label='更新时间'>
                      <template slot-scope="scope">
                        <span>{{scope.row.updateTime}}</span>
                      </template>
                    </el-table-column>                    
                    <el-table-column align="center" prop="createTime" label='创建时间'>
                      <template slot-scope="scope">
                        <span>{{scope.row.createTime}}</span>
                      </template>
                    </el-table-column>   
                    <el-table-column align="center" prop="status" label='使用状态'>
                      <template slot-scope="scope">
                        <span>{{scope.row.status | statusFilter }}</span>
                      </template>
                    </el-table-column>
                      <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
                        <template slot-scope="scope">
                          <el-button size="mini" type="success" @click="handleModifyStatus(scope.row,1)" round v-waves >启用</el-button>
                          <!-- <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,0)" round v-waves >禁用</el-button> -->
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
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'routers-component',
  directives: {
    waves
  },
  data() {
    return {
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
      this.handleModifyStatus(_router, status)
    },
    handleModifyStatus(_router, status) {
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
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: '被禁用',
        1: '使用中'
      }
      return statusMap[status]
    }
  }

}
</script>

<style lang="less" scoped>
ul {
  list-style-type:none;
}
.onClicked {
  color: #F56C6C
}
.mainlist {
  margin: 10px 20px;
  border-bottom: 1px dashed #d2d3d2;
  text-align: center;
  button {
    width: 80%;
  }
}
</style>