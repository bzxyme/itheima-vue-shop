<!-- 组件说明 -->
<template>
  <div>
    <h2>Home页</h2>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
//import x from ''
export default {
  name: 'Home',
  components: {},
  data() {
    return {}
  },
  computed: {},
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
/*@import url('')*/
</style>
