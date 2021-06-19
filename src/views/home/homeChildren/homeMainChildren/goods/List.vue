<!-- 组件说明 -->
<template>
  <home-main-template :breadcrumb="breadcrumb">
    <template v-slot:top>
      <el-row :gutter="15">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="querayInfo.query"
            clearable
            @clear="requestGoodsList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="requestGoodsList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddGoods">添加商品</el-button>
        </el-col>
      </el-row>
    </template>
    <template v-slot:center>
      <el-table :data="goodsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column
          label="商品价格(元)"
          prop="goods_price"
          width="110px"
        ></el-table-column>
        <el-table-column
          label="商品重量"
          width="95px"
          prop="goods_weight"
        ></el-table-column>
        <el-table-column label="创建时间" width="200px" prop="add_time">
          <template v-slot="scope">{{
            scope.row.add_time | dateFormat
          }}</template>
        </el-table-column>
        <el-table-column label="操作" width="250px">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeById(scope.row.goods_id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-slot:bottom>
      <!-- size-change监听每页显示数据数改变 -->
      <!-- current-change监听页码数改变 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querayInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="querayInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </template>
  </home-main-template>
</template>

<script>
import HomeMainTemplate from '@/components/content/HomeMainTemplate.vue'

import { getGoodsList, removeGoods } from '@/network/list'
export default {
  name: 'List',
  components: {
    HomeMainTemplate
  },
  data() {
    return {
      breadcrumb: ['商品管理', '商品列表'],
      //   查询商品列表
      querayInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      //   商品列表
      goodsList: [],
      //   总数据条数
      total: 0,
    }
  },
  created() {
    this.requestGoodsList()
  },
  computed: {},
  methods: {
    //获取商品列表
    requestGoodsList() {
      const queray = this.querayInfo
      getGoodsList(queray.query, queray.pagenum, queray.pagesize)
        .then(result => {
          const { data, meta } = result
          //   console.log(data)
          //   console.log(meta)
          if (meta.status !== 200) return this.$msg.error(meta.msg)

          this.$msg.success(meta.msg)
          this.goodsList = data.goods
          this.total = data.total
        })
        .catch(err => {})
    },
    handleSizeChange(newSize) {
      this.querayInfo.pagesize = newSize
      this.requestGoodsList()
    },
    handleCurrentChange(newPage) {
      this.querayInfo.pagenum = newPage
      this.requestGoodsList()
    },
    removeById(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          removeGoods(id)
            .then(result => {
              const { data, meta } = result
              //   console.log(data)
              //   console.log(meta)
              if (meta.status !== 200) return this.$msg.error(meta.msg)

              this.requestGoodsList()
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
    goAddGoods() {
      this.$router.push('/goods/add')
    }
  }
}
</script>

<style scoped>
/*@import url('')*/
</style>
