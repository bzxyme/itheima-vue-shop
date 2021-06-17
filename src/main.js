import Vue from 'vue'
import App from './App.vue'
import router from './router'

//导入element-ui
import './plugins/element.js'
//导入全局样式表
import './assets/css/global.css'
//导入字体图标
import './assets/fonts/iconfont.css'
//导入table样式
import TreeTable from 'vue-table-with-tree-grid'

Vue.config.productionTip = false

vue.component('tree-table', TreeTable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
