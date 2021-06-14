<!-- 组件说明 -->
<template>
  <home-main-template :breadcrumb="breadcrumb">
    <template v-slot:top>
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 搜索框 -->
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
    </template>
    <template v-slot:center>
      <el-table :data="userList" border stripe>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <template v-slot="scope">
            <el-switch v-model="scope.row.mg_state"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable='false'>
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </home-main-template>
</template>

<script>
import HomeMainTemplate from '@/components/content/HomeMainTemplate.vue'

import { getUsersList } from '@/network/user'

//import x from ''
export default {
  name: 'User',
  components: {
    HomeMainTemplate
  },
  created() {
    getUsersList(
      this.queryInfo.query,
      this.queryInfo.pagenum,
      this.queryInfo.pagesize
    )
      .then(result => {
        // console.log(result)
        const { data, meta } = result
        console.log(data)
        console.log(meta)
        if (meta.status !== 200) return this.$msg.error(meta.msg)
        this.userList = data.users
        this.total = data.total
      })
      .catch(err => {})
  },
  data() {
    return {
      breadcrumb: ['用户管理', '用户列表'],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0,
      titleList: ['序号', '姓名', '邮箱', '电话', '角色', '状态', '操作']
    }
  },
  computed: {},
  methods: {}
}
</script>

<style scoped>
/*@import url('')*/
</style>
