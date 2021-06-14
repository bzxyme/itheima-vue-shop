<!-- 组件说明 -->
<template>
  <home-main-template :breadcrumb="breadcrumb">
    <template v-slot:top>
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 搜索框 -->
          <el-input
            clearable
            placeholder="请输入内容"
            v-model="queryInfo.query"
            @clear="getUserList()"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList()"
            ></el-button>
          </el-input>
        </el-col>
        <!-- 按钮 -->
        <el-col :span="4">
          <el-button type="primary" @click="setDialogVisible(true)"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 添加用户的对话框 -->
      <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%">
        <!-- 内容主题 -->
        <span>这是一段信息</span>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="setDialogVisible(false)">取 消</el-button>
          <el-button type="primary" @click="setDialogVisible(false)"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </template>
    <!-- 用户列表区域 -->
    <template v-slot:center>
      <el-table :data="userList" border stripe>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStatusChanged(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template>
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
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
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
    <!-- 分页栏 -->
    <template v-slot:bottom>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </template>
  </home-main-template>
</template>

<script>
import HomeMainTemplate from '@/components/content/HomeMainTemplate.vue'

import { getUsersList, setUsersStatus } from '@/network/user'

//import x from ''
export default {
  name: 'User',
  components: {
    HomeMainTemplate
  },
  created() {
    this.getUserList()
  },
  data() {
    return {
      breadcrumb: ['用户管理', '用户列表'],
      // 用户列表参数
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 当前页数显示几个数据
        pagesize: 2
      },
      userList: [],
      total: 0,
      // titleList: ['序号', '姓名', '邮箱', '电话', '角色', '状态', '操作']
      // 控制添加用户对话框的显示隐藏
      dialogVisible: false
    }
  },
  computed: {},
  methods: {
    // 请求数据
    getUserList() {
      getUsersList(
        this.queryInfo.query,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      )
        .then(result => {
          // console.log(result)
          const { data, meta } = result
          console.log(data)
          // console.log(meta)
          if (meta.status !== 200) return this.$msg.error(meta.msg)
          this.userList = data.users
          this.total = data.total
          // this.queryInfo.pagenum = 1
        })
        .catch(err => {})
    },
    //设置分页栏
    handleSizeChange(val) {
      // console.log(val)
      this.queryInfo.pagesize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      // console.log(newPage)
      this.queryInfo.pagenum = val
      this.getUserList()
    },
    // 监听switch开关状态的改变
    userStatusChanged(userInfo) {
      console.log(userInfo)
      console.log(userInfo.mg_state)
      setUsersStatus(userInfo.id, userInfo.mg_state)
        .then(result => {
          console.log(result)
          const { data, meta } = result
          if (meta.status !== 200) return this.$msg.error(meta.msg)
          return this.$msg.success(meta.msg)
        })
        .catch(err => {})
    },
    // 设置添加用户对话框显示隐藏
    setDialogVisible(val) {
      this.dialogVisible = val
    }
  }
}
</script>

<style scoped>
/*@import url('')*/
</style>
