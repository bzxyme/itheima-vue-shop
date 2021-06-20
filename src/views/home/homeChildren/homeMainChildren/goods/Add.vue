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
          <el-tab-pane label="商品参数" name="1">
            <el-form-item
              :label="item.attr_name"
              v-for="item in manyTableData"
              :key="item.attr_id"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  border
                  :label="items"
                  v-for="(items, index) in item.attr_vals"
                  :key="index"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              :label="only.attr_name"
              v-for="only in onlyTableData"
              :key="only.attr_id"
            >
              <el-input v-model="only.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!-- action图片要上传的后台api -->
            <!-- list-type指定预览效果 -->
            <el-upload
              :action="uploadURl"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headerObj"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!-- 富文本编辑器 -->
            <quill-editor v-model="addForm.goods_introduce"></quill-editor>
            <el-button type="primary" class="btnAdd" @click="add"
              >添加商品</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </template>
    <template>
      <el-dialog
        title="图片预览"
        :visible.sync="previewDialogVisible"
        width="50%"
      >
        <img :src="previewPath" alt="" class="previewImg" />
      </el-dialog>
    </template>
  </home-main-template>
</template>

<script>
import HomeMainTemplate from '@/components/content/HomeMainTemplate.vue'

import { getCateList } from '@/network/cate'
import { getParamsList } from '@/network/params'
import { addGoods } from '@/network/add'

import _ from 'lodash'

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
        goods_cat: [],
        pics: [],
        // 商品详情
        goods_introduce: '',
        attrs: []
      },
      //   动态参数列表数据
      manyTableData: [],
      // 静态属性列表数据
      onlyTableData: [],
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
      },
      // 上传图片地址
      uploadURl: 'https://itheimashop.credere.top/api/upload',
      // 添加图片上传的请求头
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      // 图片预览url
      previewPath: '',
      previewDialogVisible: false
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
            // console.log(data)
            // console.log(meta)
            if (meta.status !== 200) return this.$msg.error(meta.msg)

            data.forEach(element => {
              element.attr_vals.length === 0
                ? []
                : (element.attr_vals = element.attr_vals.split(','))
            })
            this.manyTableData = data

            console.log(this.manyTableData)
          })
          .catch(err => {})
      }
      if (this.activeIndex === '2') {
        getParamsList(this.cateId, 'only')
          .then(result => {
            const { data, meta } = result
            // console.log(data)
            // console.log(meta)
            if (meta.status !== 200) return this.$msg.error(meta.msg)

            this.onlyTableData = data
            console.log(this.onlyTableData)
          })
          .catch(err => {})
      }
    },
    // 处理图片预览效果
    handlePreview(file) {
      console.log(file)
      this.previewPath = file.url
      this.previewDialogVisible = true
    },
    //  处理移除图片
    handleRemove(file) {
      const tmpPath = file.response.data.tem_path
      const i = this.addForm.pics.findIndex(x => x.pic === tmpPath)
      this.addForm.pics.splice(i, 1)
      console.log(this.addForm.pics)
    },
    // 监听图片上传成功
    handleSuccess(response) {
      // console.log(response)
      const picInfo = { pic: response.data.tmp_path }
      this.addForm.pics.push(picInfo)
      console.log(this.addForm.pics)
    },
    add() {
      this.$refs.addFormRef.validate(val => {
        if (!val) return this.$msg.error('请填写必要的选项!')

        const form = _.cloneDeep(this.addForm)

        form.goods_cat = form.goods_cat.join(',')

        // 处理动态参数
        this.manyTableData.forEach(val => {
          const newInfo = {
            attr_id: val.attr_id,
            attr_value: val.attr_vals.join(',')
          }
          this.addForm.attrs.push(newInfo)
        })
        // 处理静态属性
        this.onlyTableData.forEach(val => {
          const newInfo = {
            attr_id: val.attr_id,
            attr_value: val.attr_vals
          }
          this.addForm.attrs.push(newInfo)
        })

        form.attrs = this.addForm.attrs
        console.log(form)

        addGoods(form)
          .then(result => {
            // console.log(result)
            const { data, meta } = result
            // console.log(data)
            // console.log(meta)
            if (meta.status !== 201) return this.$msg.error(meta.msg)

            this.$msg.success(meta.msg)
            this.$router.push('/goods')
          })
          .catch(err => {})
      })
    }
  }
}
</script>

<style scoped>
/*@import url('')*/
.el-steps .el-step {
  flex-basis: 16.6667% !important;
}
.el-checkbox {
  margin: 0 10px 0 0 !important;
}
.previewImg {
  width: 100%;
}
.btnAdd {
  margin-top: 15px;
}
</style>
