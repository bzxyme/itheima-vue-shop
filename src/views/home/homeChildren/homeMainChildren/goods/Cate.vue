<!-- 

组件说明:

 -->
<template>
  <home-main-template :breadcrumb="breadcrumb">
    <!-- 添加分类 -->
    <template v-slot:top>
      <!-- 添加角色 -->
      <!-- row分栏间隔布局效果 -->
      <el-row>
        <el-col :span="6">
          <el-button type="primary">添加分类</el-button>
        </el-col>
      </el-row>
    </template>
    <!-- 商品分类列表 -->
    <template v-slot:center>
      <tree-table :data="cateList" :columns="columns"></tree-table>
    </template>
    <!-- 分页 -->
  </home-main-template>
</template>

<script>
import HomeMainTemplate from '@/components/content/HomeMainTemplate.vue'

import { getCateList } from '@/network/cate.js'

//import x from ''
export default {
  name: 'Cate',
  components: { HomeMainTemplate },
  data() {
    return {
      // 面包屑导航
      breadcrumb: ['商品管理', '商品分类'],
      //商品分类列表
      cateList: [],
      //   请求分类列表参数
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      //   总数据条数
      total: null,
      //为table指定列定义
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          //将当前列定义为模板列
          type: 'template',
          //模板名称
          template: 'isok'
        },
        {
          label: '排序',
          //将当前列定义为模板列
          type: 'template',
          //模板名称
          template: 'order'
        },
        {
          label: '操作',
          //将当前列定义为模板列
          type: 'template',
          //模板名称
          template: 'opt'
        }
      ]
    }
  },
  created() {
    this.requestCateList()
  },
  computed: {},
  methods: {
    requestCateList() {
      getCateList(
        this.queryInfo.type,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      )
        .then(res => {
          const { data, meta } = res
          //   console.log(res);

          //   console.log(result)
          //   console.log(data)
          //   console.log(meta)
          if (meta.status !== 200) return this.$msg.error(meta.status)

          this.cateList = data.result
          this.total = data.total
          //   console.log(this.cateList)
        })
        .catch(err => {})
    }
  }
}
</script>

<style scoped></style>
