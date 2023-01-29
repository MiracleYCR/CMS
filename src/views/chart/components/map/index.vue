<template>
  <el-card class="map-container">
    <div class="title">{{ $t('msg.chart.bmapChartTitle') }}</div>
    <div ref="mapChartRef" class="map-box"></div>
  </el-card>
</template>

<script setup>
import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap.js'

import { ref, onMounted } from 'vue'
import { getMapChart } from '@/api/chart'

import { useI18n } from 'vue-i18n'

const i18n = useI18n()

let mapChartObj
const mapChartRef = ref(null)

const mapChartData = ref({})
const getMapChartData = async () => {
  mapChartData.value = await getMapChart()
  renderChart()
}

const formatMapData = (data) => {
  const result = []
  data.forEach((item) => {
    const geoCoord = mapChartData.value.geoCoordMap[item.name]
    if (geoCoord) {
      result.push({
        name: item.name,
        value: [...geoCoord, item.value]
      })
    }
  })
  return result
}

const renderChart = () => {
  const options = {
    tooltip: {
      trigger: 'item'
    },
    bmap: {
      // 中心点
      center: [109.114129, 36.550339],
      // 缩放级别
      zoom: 5,
      // 是否可拖动
      roam: true
    },
    series: [
      {
        name: `营收（${i18n.t('msg.chart.unit')}）`,
        // 散点图
        type: 'scatter',
        // 使用的表坐标
        coordinateSystem: 'bmap',
        // 数据源
        data: formatMapData(mapChartData.value.data),
        // 散点的大小
        symbolSize: (val) => val[2] / 10,
        // 数据使用下标为2的值（item.value[2]）
        encode: {
          value: 2
        },
        // 鼠标移入时，高亮的标签样式
        emphasis: {
          label: {
            // 鼠标移入时，显示高亮
            show: true
          }
        },
        // 散点色值
        color: '#15803d'
      },
      {
        name: `营收 TOP 5（${i18n.t('msg.chart.unit')}）`,
        // 包含涟漪特效动画的散点的散点图
        type: 'effectScatter',
        // 使用的表坐标
        coordinateSystem: 'bmap',
        // 数据源（top 5）
        data: formatMapData(
          mapChartData.value.data.sort((a, b) => b.value - a.value).slice(0, 6)
        ),
        // 散点的大小
        symbolSize: function (val) {
          return val[2] / 10
        },
        // 数据使用下标为2的值（item.value[2]）
        encode: {
          value: 2
        },
        // 涟漪特效
        rippleEffect: {
          // stroke 类型的波纹
          brushType: 'stroke'
        },
        // 显示地名
        label: {
          formatter: '{b}',
          position: 'right',
          show: true
        },
        // 散点层级
        zlevel: 2,
        // 散点色值
        color: '#166534'
      }
    ]
  }

  mapChartObj.setOption(options)
}

getMapChartData()

onMounted(() => {
  mapChartObj = echarts.init(mapChartRef.value)
})
</script>

<style lang="scss" scoped>
.map-container {
  height: 500px;
  position: relative;
  .title {
    position: absolute;
    top: 28px;
    margin-left: 50%;
    transform: translateX(-50%);
    color: #333;
    font-size: 22px;
    font-weight: bold;
    z-index: 9;
  }

  .map-box {
    height: 460px;
  }
}
</style>
