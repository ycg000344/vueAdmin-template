<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' >
        <template slot-scope="scope">
          <span>{{scope.row.logId}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="user_id" >
        <template slot-scope="scope">
          <span>{{scope.row.createUser}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="user_name" >
        <template slot-scope="scope">
          <span>{{scope.row.createName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="host" >
        <template slot-scope="scope">
          <span>{{scope.row.createHost}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="请求资源"  align="center">
        <template slot-scope="scope">
          <span>{{scope.row.uri}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作方法"  align="center">
        <template slot-scope="scope">
          {{scope.row.opt}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" >
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
import { page } from '@/api/optlog'

export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
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
    }
  }
}
</script>
