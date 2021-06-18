<!-- 

组件说明:
带佬做好的示例
https://github.com/Naccl/vue-shop/blob/master/src/components/goods/Cate.vue
 -->
<template>
  <home-main-template :breadcrumb="breadcrumb">
    <!-- 添加分类 -->
    <template v-slot:top>
      <!-- 添加角色 -->
      <!-- row分栏间隔布局效果 -->
      <el-row>
        <el-col :span="6">
          <el-button type="primary" @click="showEditDialogVisible"
            >添加分类</el-button
          >
        </el-col>
      </el-row>
    </template>
    <!-- 商品分类列表 -->
    <template v-slot:center>
      <el-table
        :data="cateList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="cat_id"
        border
        stripe
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <!-- <el-table-column label="序号" type="index" width="60"></el-table-column> -->
        <el-table-column prop="cat_name" label="分类名称" width="180">
        </el-table-column>

        <el-table-column label="是否有效">
          <template v-slot="scope">
            <!-- {{ scope.row.cat_deleted }} -->
            <i
              class="el-icon-success"
              v-if="!scope.row.cat_deleted"
              style="color: lightgreen"
            ></i>
            <i class="el-icon-error" v-else style="color: red"></i>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template v-slot="scope">
            <!-- {{ scope.row.cat_level }} -->
            <el-tag v-if="scope.row.cat_level === 0" size="mini">一级</el-tag>
            <el-tag
              type="success"
              v-else-if="scope.row.cat_level === 1"
              size="mini"
              >二级</el-tag
            >
            <el-tag type="info" v-else size="mini">三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeCateList(scope.row.cat_id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <template v-slot:bottom>
      <!-- current-change监听页码值改变 -->
      <!-- current-page当前渲染页码 -->
      <!-- page-size当前页渲染多少条数据 -->
      <!-- total总数据 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </template>

    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="addCateDialogCloser"
    >
      <!-- 对话框内容 -->

      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称: " prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类: ">
          <!-- options指定数据源 -->
          <!-- props指定配置对象 -->
          <!-- change发生改变触发函数 -->
          <el-cascader
            v-model="selectedKeys"
            :options="parantCateList"
            :props="cascaderProps"
            @change="parentCateChange"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCateSort">确 定</el-button>
      </span>
    </el-dialog>
  </home-main-template>
</template>

<script>
import HomeMainTemplate from '@/components/content/HomeMainTemplate.vue'

import {
  getCateList,
  getParentCateList,
  addCateSort,
  removeCateSort
} from '@/network/cate.js'

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
      // 添加分类对话框显示隐藏
      editDialogVisible: false,
      // 添加分类的表单数据对象
      addCateForm: {
        // 将要添加的分类名称
        cat_name: '',
        // 父级分类id
        cat_pid: 0,
        // 当前分类层级
        cat_level: 0
      },
      // 添加分类对话框验证规则对象
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      // 父级分类列表
      parantCateList: [],
      // 设置级联选择器的配置对象
      cascaderProps: {
        //连接单独的id
        value: 'cat_id',
        //页面显示
        label: 'cat_name',
        //子集
        children: 'children',
        //是否可以选中一级分类
        checkStrictly: 'true'
      },
      //选中后的父级分类
      selectedKeys: []
    }
  },
  created() {
    this.requestCateList()
  },
  computed: {},
  methods: {
    //请求列表数据
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
          if (meta.status !== 200) return this.$msg.error(meta.msg)

          this.cateList = data.result
          this.total = data.total
          // console.log(this.cateList)
        })
        .catch(err => {})
    },
    // 监听pagesize改变
    handleSizeChange(val) {
      this.queryInfo.pagesize = val
      this.requestCateList()
    },
    //监听pagenum改变
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val
      this.requestCateList()
    },
    // 显示添加分类对话框
    showEditDialogVisible() {
      // 获取父级分类
      this.requestCateParentList()
      // 展示对话框
      this.editDialogVisible = true
    },
    //请求腹肌分类列表数据
    requestCateParentList() {
      getParentCateList(2)
        .then(res => {
          const { data, meta } = res
          //   console.log(res);

          //   console.log(result)
          // console.log(data)
          // console.log(meta)
          if (meta.status !== 200) return this.$msg.error('获取父级分类失败')

          this.parantCateList = data
        })
        .catch(err => {})
    },
    //父级分类选择项改变触发
    parentCateChange() {
      // console.log(this.selectedKeys)
      if (this.selectedKeys.length > 0) {
        // 为父级分类id赋值
        this.addCateForm.cat_pid = this.selectedKeys[
          this.selectedKeys.length - 1
        ]
        // console.log(this.addCateForm.cat_pid)
        // 当前分类层级赋值
        this.addCateForm.cat_level = this.selectedKeys.length
      } else {
        // 为父级分类id赋值
        this.addCateForm.cat_pid = 0
        // console.log(this.addCateForm.cat_pid)
        // 当前分类层级赋值
        this.addCateForm.cat_level = 0
      }
    },
    //添加分类对话框单击确定
    addCateSort() {
      // console.log(this.addCateForm)
      //表单与验证
      this.$refs.addCateFormRef.validate(val => {
        // console.log(val)
        if (!val) return this.$msg.error('请输入信息')

        addCateSort(
          this.addCateForm.cat_pid,
          this.addCateForm.cat_name,
          this.addCateForm.cat_level
        )
          .then(result => {
            const { data, meta } = result
            //   console.log(res);

            //   console.log(result)
            //   console.log(data)
            //   console.log(meta)
            if (meta.status !== 201) return this.$msg.error(meta.msg)

            this.$msg.success(meta.msg)
            // 刷新数据列表
            this.requestCateList()
            //隐藏对话框
            this.editDialogVisible = false
          })
          .catch(err => {})
      })
    },
    // 监听对话框关闭
    addCateDialogCloser() {
      this.$refs.addCateFormRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.cat_pid = 0
      this.addCateForm.cat_level = 0
    },
    //删除分类
    removeCateList(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          removeCateSort(id)
            .then(result => {
              const { data, meta } = result
              // console.log(data)
              // console.log(meta)

              if (meta.status !== 200) return this.$msg.error(meta.msg)

              this.requestCateList()
            })
            .catch(err => {})

          this.$msg({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$msg({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style scoped>
.el-cascader {
  width: 100%;
}
</style>
