<!-- 组件说明 -->
<template>
  <el-aside :width="isCollapse ? '64px' : '200px'">
    <!-- <el-aside width="getAsideWidth"> -->
    <div class="toggle-button" @click="toggleCollapse">|||</div>
    <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409bff"
      unique-opened
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <!-- 一级菜单 -->
      <el-submenu :index="'' + item.id" v-for="item in menuList" :key="item.id">
        <!-- 一级菜单模板区域 -->
        <template slot="title">
          <!-- 图标 -->
          <i :class="iconsObj[item.id]"></i>
          <!-- 文本 -->
          <span>{{ item.authName }}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item
          :index="subItem.id + ''"
          v-for="subItem in item.children"
          :key="subItem.id"
        >
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-menu"></i>
            <!-- 文本 -->
            <span>{{ subItem.authName }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
//import x from ''
export default {
  name: 'HomeAside',
  components: {},
  data() {
    return {
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      //是否折叠
      isCollapse: false
    }
  },
  props: {
    menuList: {
      type: Array,
      default: []
    }
  },
  computed: {},
  methods: {
    //左侧折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped>
/*@import url('')*/

.el-aside {
  background-color: #333744;
}
.el-aside .el-menu {
  border-right: none;
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
