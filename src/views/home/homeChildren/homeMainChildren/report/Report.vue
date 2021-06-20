<!-- 组件说明 -->
<template>
  <home-main-template :breadcrumb="breadcrumb">
    <template v-slot:center>
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 750px;height:400px;"></div>
    </template>
  </home-main-template>
</template>

<script>
import HomeMainTemplate from '@/components/content/HomeMainTemplate.vue'

import * as echarts from 'echarts'
import _ from 'lodash'

import { getReport } from '@/network/report'

export default {
  name: 'Report',
  components: { HomeMainTemplate },
  data() {
    return {
      breadcrumb: ['数据统计', '数据报表'],
      reports: {},
      //需要合并的数据
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  created() {
    this.requestReport()
  },
  mounted() {
    //实在不知道怎么解决了,只能出此下策
    // 每次都是以下代码先运行
    setTimeout(() => {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
      const result = _.merge(this.options, this.reports)
      // console.log(result)
      // console.log(this.reports)
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(result)
    }, 400)
  },
  computed: {},
  methods: {
    requestReport() {
      getReport()
        .then(result => {
          // console.log(result)
          const { data, meta } = result
          // console.log(data)
          //   console.log(meta)

          if (meta.status !== 200) return this.$msg.error(meta.msg)

          this.$msg.success(meta.msg)

          this.reports = data
          // console.log(this.reports)
          // this.report.legend = data.legend
          // this.report.xAxis = data.xAxis
          // this.report.yAxis = data.yAxis
          // this.report.series = data.series
        })
        .catch(err => {})
    }
  }
}
</script>

<style scoped>
/*@import url('')*/
</style>
