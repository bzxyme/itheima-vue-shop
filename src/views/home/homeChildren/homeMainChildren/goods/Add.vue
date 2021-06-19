<!-- 
组件说明
https://github.com/Naccl/vue-shop/blob/master/src/components/goods/Add.vue
 -->
<template>
  <home-main-template :breadcrumb="breadcrumb">
    <template v-slot:top>
      <el-alert
        title="添加商品信息"
        type="info"
        show-icon
        center
        :closable="false"
      >
      </el-alert>
    </template>
    <template v-slot:center>
      <!-- 步骤条 -->
      <el-steps :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- tab栏 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-position="top"
      >
        <el-tabs
          :tab-position="'left'"
          v-model="activeIndex"
          :before-leave="beforeTabsLeave"
          @tab-click="tabClick"
        >
          <!-- prop校验规则 -->
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addForm.goods_cat"
                :options="cateList"
                :props="cateProp"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1"></el-tab-pane>
          <el-tab-pane label="商品属性" name="2"></el-tab-pane>
          <el-tab-pane label="商品图片" name="3"></el-tab-pane>
          <el-tab-pane label="商品内容" name="4"></el-tab-pane>
        </el-tabs>
      </el-form>
    </template>
  </home-main-template>
</template>

<script>
import HomeMainTemplate from '@/components/content/HomeMainTemplate.vue'

import { getCateList } from '@/network/cate'
import { getParamsList } from '@/network/params'

export default {
  name: 'Add',
  components: {
    HomeMainTemplate
  },
  data() {
    return {
      breadcrumb: ['商品管理', '添加商品'],
      //   商品分类
      cateList: [],
      activeIndex: '0',
      //   添加商品表单对象
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        // 商品所在的分类
        goods_cat: []
      },
      //   动态参数列表数据
      manyTableData: [],
      //   验证规则
      addFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ]
      },
      cateProp: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      }
    }
  },
  created() {
    this.requestCateList()
  },
  computed: {
    cateId() {
      if (this.addForm.goods_cat.length === 3) return this.addForm.goods_cat[2]
    }
  },
  methods: {
    //请求商品分类列表数据
    requestCateList() {
      getCateList()
        .then(res => {
          const { data, meta } = res
          //   console.log(res);

          //   console.log(result)
          //   console.log(data)
          //   console.log(meta)
          if (meta.status !== 200) return this.$msg.error(meta.msg)

          this.cateList = data
          //   console.log(this.cateList)
        })
        .catch(err => {})
    },
    // 级联选择器改变触发
    handleChange() {
      //   console.log(this.addForm.goods_cat)
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
      }

      //   console.log(this.addForm.goods_cat)
    },
    beforeTabsLeave(active, old) {
      //   return old === '0' && this.addForm.goods_cat.length !== 3
      //     ? false
      //     : true
      if (old === '0' && this.addForm.goods_cat.length !== 3) {
        this.$msg.error('请选择分类后继续')
        return false
      }
    },
    tabClick() {
      //   console.log(this.activeIndex)
      if (this.activeIndex === '1') {
        // console.log('111')
        getParamsList(this.cateId, 'many')
          .then(result => {
            const { data, meta } = result
            console.log(data)
            console.log(meta)
            if (meta.status !== 200) return this.$msg.error(meta.msg)

            this.manyTableData = data
          })
          .catch(err => {})
      }
    }
  }
}
</script>

<style scoped>
/*@import url('')*/
</style>
