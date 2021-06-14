<!-- 
组件说明：目前还抽取不出来，俺也不懂哪不对
 -->
<template>
  <el-header>
    <div>
      <img src="~@/assets/img/heima.png" alt="" />
      <span>电商后台管理系统</span>
    </div>
    <el-button type="info" @click="logout">退出</el-button>
  </el-header>
</template>

<script>
//import x from ''
export default {
  name: 'HomeHeader',
  components: {},
  data() {
    return {}
  },
  computed: {},
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
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  width: 100%;
}
.el-header div {
  display: flex;
  align-items: center;
}
.el-header div span {
  padding-left: 15px;
}
</style>
