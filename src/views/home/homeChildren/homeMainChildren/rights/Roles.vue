<!-- 

组件说明:

 -->
<template>
  <home-main-template :breadcrumb="breadcrumb">
    <template v-slot:top>
      <!-- 添加角色 -->
      <!-- row分栏间隔布局效果 -->
      <el-row>
        <el-col :span="6">
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
    </template>
    <!-- 角色列表区域 -->
    <template v-slot:center>
      <el-table :data="rolesList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template v-slot="scope">
            <!-- 栅格列表 -->
            <el-row
              :class="['bdbottom', index === 0 ? 'bdtop' : '']"
              v-for="(item1, index) in scope.row.children"
              :key="item1.id"
            >
              <!-- 一级 -->
              <!-- span列数 -->
              <el-col :span="5">
                <el-tag>
                  {{ item1.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级和三级 -->
              <el-col :span="19">
                <!-- for循环嵌套渲染二级 -->
                <el-row
                  v-for="(item2, index) in item1.children"
                  :key="item2.id"
                  :class="{ bdtop: index === 0 ? false : true }"
                >
                  <el-col :span="6">
                    <el-tag type="success">
                      {{ item2.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                    >
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作" width="400">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="mini"
              >删除</el-button
            >
            <el-button type="warning" icon="el-icon-setting" size="mini"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
  </home-main-template>
</template>

<script>
import HomeMainTemplate from '@/components/content/HomeMainTemplate.vue'

import { getRolesList, removeUserRoles } from '@/network/roles'

export default {
  name: 'Roles',
  components: {
    HomeMainTemplate
  },
  data() {
    return {
      // 面包屑导航
      breadcrumb: ['权限管理', '角色列表'],
      // 角色列表
      rolesList: []
    }
  },
  created() {
    this.requestRolesList()
  },
  computed: {},
  methods: {
    //请求数据
    requestRolesList() {
      getRolesList()
        .then(result => {
          // console.log(result)
          const { data, meta } = result
          // console.log(data)
          // console.log(meta)
          if (meta.status !== 200) return this.$msg.error(meta.msg)

          this.rolesList = data
          // console.log(this.rolesList)
        })
        .catch(err => {})
    },

    //监听删除权限
    removeRightById(row, rolesId) {
      console.log(row)
      // console.log(id)
      // console.log(rolesId);
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          //请求删除权限
          removeUserRoles(row.id, rolesId)
            .then(result => {
              console.log(result)
              const { data, meta } = result
              if (meta.status !== 200) return this.$msg.error(meta.msg)

              this.$msg.success(meta.msg)
              // this.requestRolesList()
              //数据双向绑定,局部更新数据即可无需全部重新请求数据
              row.children = data
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
    }
  }
}
</script>

<style scoped>
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.el-row {
  display: flex;
  align-items: center;
}
</style>
