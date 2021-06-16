<!-- 

组件说明:

 -->
<template>
  <home-main-template :breadcrumb="breadcrumb">
    <template v-slot:center>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level" v-slot="scope">
          <el-tag v-if="scope.row.level === '0'">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
          <el-tag type="info" v-else>三级</el-tag>
        </el-table-column>
      </el-table>
    </template>
  </home-main-template>
</template>

<script>
import HomeMainTemplate from '@/components/content/HomeMainTemplate.vue'

import { getRightsList } from '@/network/rights'
//import x from ''
export default {
  name: 'Rights',
  components: {
    HomeMainTemplate
  },
  created() {
    //请求数据
    this.requestRightsList()
  },
  data() {
    return {
      //面包屑导航
      breadcrumb: ['权限管理', '权限列表'],
      rightsList: []
    }
  },
  computed: {},
  methods: {
    //请求权限列表
    requestRightsList() {
      getRightsList()
        .then(result => {
          //   console.log(result)
          const { data, meta } = result
          // console.log(data)
          // console.log(meta)
          if (meta.status !== 200) return this.$msg.error(meta.msg)

          this.rightsList = data
        })
        .catch(err => {})
    }
  }
}
</script>

<style scoped></style>
