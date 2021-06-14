<!-- 组件说明 -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">
        {{ item }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <slot name="top" />
      <slot name="center" />
      <slot name="bottom" />
    </el-card>
  </div>
</template>

<script>
//import x from ''
export default {
  name: 'HomeMainTemplate',
  components: {},
  data() {
    return {}
  },
  props: {
    breadcrumb: {
      type: Array,
      default: []
    }
  },
  computed: {},
  methods: {}
}
</script>

<style scoped>
/*@import url('')*/
</style>
