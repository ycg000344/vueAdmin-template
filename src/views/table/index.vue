<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="user_id" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.createUser}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="user_name" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.createName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="host" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.createHost}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="请求资源" width="150" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.uri}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作方法" width="120" align="center">
        <template slot-scope="scope">
          {{scope.row.opt}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column> 
    </el-table>
  </div>
</template>

<script>
import { page } from '@/api/optlog'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      page(this.listQuery).then(response => {
        this.list = response.data.rows
        this.listLoading = false
      })
    }
  }
}
</script>
