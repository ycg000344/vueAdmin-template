<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row @sort-change="sort">
      <el-table-column align="center" prop="log_id" label='序号' sortable="custom" >
        <template slot-scope="scope">
          <span>{{scope.row.logId}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="create_user" label="用户id" sortable="custom"  >
        <template slot-scope="scope">
          <span>{{scope.row.createUser}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="create_uame" label="昵称" >
        <template slot-scope="scope">
          <span>{{scope.row.createName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="create_host" label="主机" >
        <template slot-scope="scope">
          <span>{{scope.row.createHost}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="uri" label="请求资源" sortable="custom">
        <template slot-scope="scope">
          <span>{{scope.row.uri}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="opt"  label="操作方法" >
        <template slot-scope="scope">
          {{scope.row.opt}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="create_time" label="创建时间" sortable="custom"  >
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column> 
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { page } from '@/api/basicmanager/optlog'

export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        prop: 'create_time', // 排序字段
        order: 'desc'// 排序方式
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      page(this.listQuery).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    sort(column) {
      this.listQuery.prop = column.prop
      this.listQuery.order = column.order.replace('ending', '')
      this.getList()
    }
  }
}
</script>
