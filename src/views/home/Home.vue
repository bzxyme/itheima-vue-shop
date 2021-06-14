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
      <home-aside :menuList="menuList" />
      <!-- 右侧内容 -->
      <el-main>
        <home-main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HomeAside from './homeChildren/HomeAside.vue'
import HomeMain from './homeChildren/HomeMain.vue'

import { getHomeAside } from '@/network/home.js'

export default {
  name: 'Home',
  components: { HomeAside, HomeMain },
  created() {
    getHomeAside()
      .then(result => {
        // console.log(result)
        const { data, meta } = result
        // console.log(data)
        if (meta.status !== 200) return this.$msg.error(meta.msg)
        this.menuList = data
        // console.log(this.menuList)
      })
      .catch(err => {})
  },
  data() {
    return {
      menuList: []
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
</style>
