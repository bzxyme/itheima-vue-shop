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
          <el-button type="primary" icon="el-icon-edit" size="mini"
            >编辑</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini"
            >删除</el-button
          >
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
    <el-dialog title="添加分类" :visible.sync="editDialogVisible" width="50%">
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
          <el-input v-model="addCateForm.cat_level"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
      // 添加分类对话框显示隐藏
      editDialogVisible: false,
      // 添加分类的表单数据对象
      addCateForm: {
        // 将要添加的分类名称
        cat_name: '',
        // 父级分类id
        cat_pid: null,
        // 分类层级
        cat_level: null
      },
      // 添加分类对话框验证规则对象
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      }
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
          if (meta.status !== 200) return this.$msg.error(meta.status)

          this.cateList = data.result
          this.total = data.total
          console.log(this.cateList)
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
      this.editDialogVisible = true
    }
  }
}
</script>

<style scoped></style>
