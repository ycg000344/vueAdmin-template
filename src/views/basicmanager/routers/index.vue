<template>
    <div class="app-container">
        <el-row :gutter="20">
            <!-- 一级菜单 -->
            <el-col :span="8">
                <div>
                    <ul>
                        <li v-for="pRouter in parentRouters">
                            <span>{{pRouter.name}}</span>
                        </li>
                    </ul>
                </div>
            </el-col>
            <!-- 二级菜单 -->
            <el-col :span="16">
                <div>

                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getParentRouters, getRouters } from '@/api/basicmanager/routers'
export default {
  name: 'routers-component',
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
        router_parent_id: -1 // 父路由id，一级路由为-1
      }
    }
  },
  created() {
    console.log('准备获取一级菜单')
    this.getParentRoutersList()
  },
  methods: {
    getParentRoutersList() {
      getParentRouters().then(response => {
        // this.parentRouters = response.data.data
        console.log('response', response.data.data)
      }).catch(err => {
        console.log('err', err)
      })
    },
    getRoutersList() {
      this.listLoading = true
      getRouters(this.listQuery).then(response => {
        this.list = response.data.row
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }

}
</script>

<style>
</style>