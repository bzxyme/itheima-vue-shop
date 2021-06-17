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
          <el-button type="primary" @click="setAddDialogVisible(true)"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
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
          <template v-slot="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="setEditDialogVisible(true, scope.row.id)"
            ></el-button>
            <!-- 删除用户 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.id)"
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
                @click="setRoles(scope.row)"
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

    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="dialogClose"
    >
      <!-- 内容主题 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="addForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWd">
          <el-input v-model="addForm.passWd"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="setAddDialogVisible(false)">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户的对话框 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClose"
    >
      <!-- 内容主题 -->
      <el-form
        :model="editForm"
        :rules="addFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="setEditDialogVisible(false)">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRolesDialogVisible"
      width="50%"
      @close="setRolesDialogClose"
    >
      <div>
        <p>当前的用户：{{ usersInfo.username }}</p>
        <p>当前的角色：{{ usersInfo.role_name }}</p>
        <p>
          分配新角色：
          <el-select v-model="selectedRolesId" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
              <!-- vmodel绑定的是value的值 -->
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRolesDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRolesInfo">确 定</el-button>
      </span>
    </el-dialog>
  </home-main-template>
</template>

<script>
import HomeMainTemplate from '@/components/content/HomeMainTemplate.vue'

import {
  getUsersList,
  setUsersStatus,
  addUser,
  getIdInfo,
  setUserInfo,
  removeUserInfo,
  getRoleList,
  setNewRole
} from '@/network/user'

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
    // 自定义校验规则
    //验证邮箱

    // value待校验的值
    let checkEmail = (rule, value, callback) => {
      // 验证邮箱正则
      const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if (reg.test(value)) return callback()

      callback(new Error('请输入合法邮箱'))
    }
    //验证手机
    let checkMobile = (rule, value, callback) => {
      const reg = /^1[3|4|5|7|8][0-9]{9}$/
      if (reg.test(value)) return callback()
      callback(new Error('请输入合法手机号'))
    }

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
      addDialogVisible: false,

      // 添加用户的表单数据
      addForm: {
        userName: '',
        passWd: '',
        email: '',
        mobile: ''
      },
      // 添加表单的验证规则对象
      addFormRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        passWd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ]
      },
      // 控制修改用户对话框的显示隐藏
      editDialogVisible: false,
      // 查询用户信息列表
      editForm: {},
      // 显示隐藏分配角色对话框
      setRolesDialogVisible: false,
      // 需要分配权限的角色
      usersInfo: {},
      // 所有角色的列表
      rolesList: {},
      // 选中的角色
      selectedRolesId: ''
    }
  },
  computed: {},
  methods: {
    // 请求用户列表数据
    getUserList() {
      getUsersList(
        this.queryInfo.query,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      )
        .then(result => {
          // console.log(result)
          const { data, meta } = result
          // console.log(data)
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
    setAddDialogVisible(val) {
      this.addDialogVisible = val
    },
    //监听添加用户关闭
    dialogClose() {
      //表单重置
      this.$refs.addFormRef.resetFields()
    },
    // 添加用户
    addUser() {
      // 表单预验证
      this.$refs.addFormRef.validate(val => {
        // console.log(val)
        if (!val) return

        console.log(this.addForm.userName)
        //发起添加用户网络请求
        addUser(
          this.addForm.userName,
          this.addForm.passWd,
          this.addForm.email,
          this.addForm.mobile
        )
          .then(result => {
            console.log(result)
            const { data, meta } = result

            if (meta.status !== 201) {
              return this.$msg.error(meta.msg)
            }
            this.$msg.success(meta.msg)
            //隐藏添加用户对话框
            this.setAddDialogVisible(false)
            // 刷新用户列表
            this.getUserList()
          })
          .catch(err => {})
      })
    },
    // 设置修改用户对话框显示隐藏
    setEditDialogVisible(val, id) {
      if (id) {
        // console.log(id)
        getIdInfo(id)
          .then(result => {
            // console.log(result)
            const { data, meta } = result
            // console.log(data)
            // console.log(meta)

            if (meta.status !== 200) return this.$msg.error(mete.msg)

            this.editForm = data
          })
          .catch(err => {})
      }
      this.editDialogVisible = val
    },
    //修改用户对话框关闭
    editDialogClose() {
      this.$refs.editFormRef.resetFields()
    },
    //修改用户对话框确定后提交
    editUser() {
      // 表单预验证
      this.$refs.editFormRef.validate(val => {
        // console.log(val)
        if (!val) return

        //发起修改用户信息请求
        setUserInfo(this.editForm.id, this.editForm.email, this.editForm.mobile)
          .then(result => {
            console.log(result)
            const { data, meta } = result
            if (meta.status !== 200) return this.$msg.error(meta.msg)

            this.$msg.success(meta.msg)

            this.getUserList()
            this.setEditDialogVisible(false)
          })
          .catch(err => {})
      })
    },
    //监听删除单击
    removeUserById(id) {
      // console.log(id);

      const conFirmResult = this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }
      )
        .then(() => {
          removeUserInfo(id)
            .then(result => {
              console.log(result)
              const { data, meta } = result
              if (meta.status !== 200) return this.$msg.error('删除失败')

              this.getUserList()
            })
            .catch(err => {})
          this.$msg({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$msg({
            type: 'info',
            message: '已取消删除'
          })
        })

      console.log(conFirmResult)
    },
    //展示分配角色的对话框
    setRoles(Info) {
      console.log(Info)
      this.usersInfo = Info

      getRoleList()
        .then(result => {
          // console.log(result)
          const { data, meta } = result
          // console.log(data)
          // console.log(meta)
          if (meta.status !== 200) return this.$msg.error(meta.msg)

          this.rolesList = data
        })
        .catch(err => {})
      this.setRolesDialogVisible = true
    },
    //确定后分配角色
    setRolesInfo() {
      if (!this.selectedRolesId) return this.$msg.error('请分配角色')

      setNewRole(this.usersInfo.id, this.selectedRolesId)
        .then(result => {
          const { data, meta } = result
          console.log(data)
          // console.log(meta)
          if (meta.status !== 200) return this.$msg.error(meta.msg)

          this.$msg.success(meta.msg)

          this.setRolesDialogVisible = false

          this.getUserList()
        })
        .catch(err => {})
    },
    //监听分配角色对话框关闭后
    setRolesDialogClose() {
      this.selectedRolesId = ''
      this.usersInfo = {}
    }
  }
}
</script>

<style scoped>
/*@import url('')*/
</style>
