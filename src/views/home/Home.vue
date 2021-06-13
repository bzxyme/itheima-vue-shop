<!-- 组件说明 -->
<template>
  <el-container class="home_container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="~@/assets/img/heima.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>

    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
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
          <el-submenu
            :index="'' + item.id"
            v-for="item in menuList"
            :key="item.id"
          >
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
      <!-- 右侧内容 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getHomeAside } from '@/network/home.js'

export default {
  name: 'Home',
  components: {},
  created() {
    getHomeAside()
      .then(result => {
        // console.log(result)
        const { data, meta } = result
        // console.log(data)
        if (meta.status !== 200) return this.$msg.error(meta.msg)
        this.menuList = data
        console.log(this.menuList)
      })
      .catch(err => {})
  },
  data() {
    return {
      menuList: [],
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
  computed: {
    //为什么不成功？？？？？？
    getAsideWidth() {
      return isCollapse ? '64px' : '200px'
    }
  },
  methods: {
    //退出登录事件
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    //左侧折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped>
/*@import url('')*/
.el-container {
  width: 100%;
}
.home_container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-header div {
  display: flex;
  align-items: center;
}
.el-header div span {
  padding-left: 15px;
}

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
