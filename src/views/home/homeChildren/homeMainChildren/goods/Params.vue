<!-- 组件说明 -->
<template>
  <div>
    <home-main-template :breadcrumb="breadcrumb">
      <template v-slot:top>
        <!-- 警告提示 -->
        <el-alert
          title="注意：只允许为第三级分类设置相关参数！"
          type="warning"
          :closable="false"
          show-icon
        >
        </el-alert>
        <el-row class="cat_opt">
          <el-col>
            <span>选择商品分类：</span>
            <!-- 选择分类 -->
            <el-cascader
              v-model="selectedKeys"
              :options="cateList"
              :props="cateProps"
              @change="handleChange"
            ></el-cascader>
          </el-col>
        </el-row>
      </template>
      <template v-slot:center>
        <!-- tab 页签区域 -->
        <el-tabs v-model="tabActiveName" @tab-click="handleTabClick">
          <el-tab-pane label="动态参数" name="many">
            <el-button
              type="primary"
              size="mini"
              :disabled="isBtnDisabled"
              @click="addDialogFormVisible = true"
              >添加参数</el-button
            >
            <el-table :data="manyTabData" border stripe>
              <el-table-column type="expand">
                <template v-slot="scope">
                  <!-- 循环渲染tag标签 -->
                  <el-tag
                    v-for="(item, index) in scope.row.attr_vals"
                    :key="index"
                    closable
                    @close="handleClose(index, scope.row)"
                    >{{ item }}</el-tag
                  >
                  <!-- 渲染输入的文本框  -->
                  <el-input
                    class="input-new-tag"
                    v-if="scope.row.inputVisible"
                    v-model="scope.row.inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(scope.row)"
                    @blur="handleInputConfirm(scope.row)"
                  >
                  </el-input>
                  <!-- 添加按钮 -->
                  <el-button
                    v-else
                    class="button-new-tag"
                    size="small"
                    @click="showInput(scope.row)"
                    >+ New Tag</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column type="index"></el-table-column>
              <el-table-column
                label="参数名称"
                prop="attr_name"
              ></el-table-column>
              <el-table-column label="操作">
                <template v-slot="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="showEditDialog(scope.row.attr_id)"
                    >编辑</el-button
                  >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click="removeEditDialog(scope.row.attr_id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="静态属性" name="only">
            <el-button
              type="primary"
              size="mini"
              :disabled="isBtnDisabled"
              @click="addDialogFormVisible = true"
              >添加属性</el-button
            >
            <el-table :data="onlyTabData" border stripe>
              <el-table-column type="expand">
                <template v-slot="scope">
                  <!-- 循环渲染tag标签 -->
                  <el-tag
                    v-for="(item, index) in scope.row.attr_vals"
                    :key="index"
                    closable
                    @close="handleClose(index, scope.row)"
                    >{{ item }}</el-tag
                  >
                  <!-- 渲染输入的文本框  -->
                  <el-input
                    class="input-new-tag"
                    v-if="scope.row.inputVisible"
                    v-model="scope.row.inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(scope.row)"
                    @blur="handleInputConfirm(scope.row)"
                  >
                  </el-input>
                  <!-- 添加按钮 -->
                  <el-button
                    v-else
                    class="button-new-tag"
                    size="small"
                    @click="showInput(scope.row)"
                    >+ New Tag</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column type="index"></el-table-column>
              <el-table-column
                label="参数名称"
                prop="attr_name"
              ></el-table-column>
              <el-table-column label="操作">
                <template v-slot="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="showEditDialog(scope.row.attr_id)"
                    >编辑</el-button
                  >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click="removeEditDialog(scope.row.attr_id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </template>
      <template>
        <!-- visible.sync控制显示隐藏 -->
        <!-- 添加参数对话框 -->
        <el-dialog
          :title="'添加' + setAddParmasTitle"
          :visible.sync="addDialogFormVisible"
          width="50%"
          @close="addDialogClose"
        >
          <el-form
            :model="addForm"
            :rules="addFormRules"
            ref="addFormRef"
            label-width="100px"
          >
            <el-form-item :label="setAddParmasTitle" prop="attr_name">
              <el-input v-model="addForm.attr_name"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addParams">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 修改参数对话框 -->
        <el-dialog
          :title="'修改' + setAddParmasTitle"
          :visible.sync="editDialogFormVisible"
          width="50%"
          @close="editDialogClose"
        >
          <el-form
            :model="editForm"
            :rules="editFormRules"
            ref="editFormRef"
            label-width="100px"
          >
            <el-form-item :label="setAddParmasTitle" prop="attr_name">
              <el-input v-model="editForm.attr_name"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editParams">确 定</el-button>
          </div>
        </el-dialog>
      </template>
    </home-main-template>
  </div>
</template>

<script>
import HomeMainTemplate from '@/components/content/HomeMainTemplate.vue'

import {
  getCateList,
  getParamsList,
  addParamsList,
  getParamsCon,
  setParamsCon,
  removeParams
} from '@/network/params.js'
//import x from ''
export default {
  name: 'Params',
  components: { HomeMainTemplate },
  data() {
    return {
      breadcrumb: ['商品管理', '参数列表'],
      //   商品分类列表
      cateList: [],
      //   级联选择器配置对象
      cateProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      //选中的商品分类双向绑定数组
      selectedKeys: [],
      //tab栏默认选中的栏目/被激活的页签
      tabActiveName: 'many',

      //   动态参数
      manyTabData: [],
      // 静态属性
      onlyTabData: [],
      //   添加参数对话框显示隐藏
      addDialogFormVisible: false,
      //   添加分类参数
      addForm: {
        attr_name: ''
      },
      //   添加分类判断规则
      addFormRules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' }
        ]
      },
      //修改对话框显示隐藏
      editDialogFormVisible: false,
      // 修改的表单数据
      editForm: {},
      //   修改分类判断规则
      editFormRules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.requestCateList()
  },
  computed: {
    //如果按钮被禁用返回true
    isBtnDisabled() {
      return this.selectedKeys.length !== 3 ? true : false
    },
    // 获取选中的三级分类id
    cateId() {
      return this.selectedKeys.length == 3 ? this.selectedKeys[2] : null
    },
    //返回添加参数对话框动态还是静态
    setAddParmasTitle() {
      if (this.tabActiveName === 'many') return '动态参数'
      else return '静态属性'
    }
  },
  methods: {
    //请求分类列表数据
    requestCateList() {
      getCateList()
        .then(res => {
          const { data, meta } = res
          //   console.log(data)
          //   console.log(meta)
          if (meta.status !== 200) return this.$msg.error(meta.msg)

          this.cateList = data
          //   console.log(this.cateList)
        })
        .catch(err => {})
    },
    //请求参数列表
    requestParamsList() {
      getParamsList(this.cateId, this.tabActiveName)
        .then(result => {
          //   console.log(result)
          const { data, meta } = result
          if (meta.status !== 200) return this.$msg.error(meta.msg)

          data.forEach(element => {
            element.attr_vals = element.attr_vals
              ? element.attr_vals.split(',')
              : []
            //单独的控制文本框按钮切换
            element.inputVisible = false
            // 单独的文本框输入的内容
            element.inputValue = ''
          })

          // console.log(data)

          if (this.tabActiveName === 'many') this.manyTabData = data
          else this.onlyTabData = data
        })
        .catch(err => {})
    },
    //监听级联选择框选中变化
    handleChange() {
      //   console.log(this.selectedKeys)
      //   证明选中的是不是三级分类
      if (this.selectedKeys.length !== 3) {
        this.selectedKeys = []
        this.manyTabData = []
        this.onlyTabData = []
        return
      }

      // 发起参数请求
      this.requestParamsList()
    },
    //监听页签单击事件
    handleTabClick() {
      // 发起参数请求
      if (this.selectedKeys.length !== 3) return
      this.requestParamsList()
    },
    // 添加对话框关闭
    addDialogClose() {
      this.$refs.addFormRef.resetFields()
    },
    //单击确定添加参数
    addParams() {
      // 预验证
      this.$refs.addFormRef.validate(val => {
        if (!val) return

        addParamsList(this.cateId, this.addForm.attr_name, this.tabActiveName)
          .then(result => {
            console.log(result)
            const { data, meta } = result
            if (meta.status !== 201) return this.$msg.error(meta.msg)

            this.$msg.success(meta.msg)
            this.requestParamsList()
            this.addDialogFormVisible = false
          })
          .catch(err => {})
      })
    },
    // 展示修改对话框
    showEditDialog(attr_id) {
      getParamsCon(this.cateId, attr_id, this.tabActiveName)
        .then(result => {
          // console.log(result)
          const { data, meta } = result
          // console.log(data)
          // console.log(meta)
          if (meta.status !== 200) return this.$msg.error(meta.msg)

          this.editForm = data
        })
        .catch(err => {})

      this.editDialogFormVisible = true
    },
    //监听修改对话框关闭
    editDialogClose() {
      this.$refs.editFormRef.resetFields()
    },
    //单击确定修改参数
    editParams() {
      // 预验证
      this.$refs.editFormRef.validate(val => {
        if (!val) return

        //修改参数名
        const edit = this.editForm
        setParamsCon(
          edit.cat_id,
          edit.attr_id,
          edit.attr_name,
          this.tabActiveName
        )
          .then(result => {
            // console.log(result)
            const { data, meta } = result
            // console.log(data)
            // console.log(meta)
            if (meta.status !== 200) return this.$msg.error(meta.msg)

            this.$msg.success(meta.msg)
            this.requestParamsList()
            this.editDialogFormVisible = false
          })
          .catch(err => {})
      })
    },
    // 对应id删除参数项
    removeEditDialog(attr_id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          removeParams(this.cateId, attr_id)
            .then(result => {
              console.log(result)
              const { data, meta } = result
              // console.log(data)
              // console.log(meta)
              if (meta.status !== 200) return this.$msg.error(meta.msg)

              this.requestParamsList()
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
    },
    //文本框失去焦点或者按下enter触发
    handleInputConfirm(row) {
      let inputValue = row.inputValue
      if (inputValue) {
        row.attr_vals.push(inputValue)
      }
      //发起请求保存操作
      this.saveAttrVals(row)
      row.inputVisible = false
      row.inputValue = ''
    },
    //点击按钮展示文本框
    showInput(row) {
      row.inputVisible = true
      // 文本框自动获得焦点
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    //删除对应参数
    handleClose(index, row) {
      console.log(row)
      row.attr_vals.splice(index, 1)
      //发起请求保存操作
      this.saveAttrVals(row)
    },

    saveAttrVals(row) {
      setParamsCon(
        this.cateId,
        row.attr_id,
        row.attr_name,
        this.tabActiveName,
        row.attr_vals.join(',')
      )
        .then(result => {
          console.log(result)
          const { data, meta } = result
          if (meta.status !== 200) return this.$msg.error(meta.msg)
          //这里有个一回车就运行两次的bug
          this.$msg.success(meta.msg)
        })
        .catch(err => {})
    }
  }
}
</script>

<style scoped>
/*@import url('')*/
.cat_opt {
  margin: 15px 0;
}
.el-button {
  margin-right: 10px;
}
.el-tag {
  margin: 10px;
}
.input-new-tag {
  width: 120px;
}
.button-new-tag {
  width: 120px;
}
</style>
