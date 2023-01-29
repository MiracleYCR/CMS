<template>
  <el-card class="trend-container">
    <el-row :gutter="32" v-if="trendChartData.allAmount">
      <el-col :span="6">
        <TrendData :data="trendChartData" />
      </el-col>
      <el-col :span="18">
        <TrendChart :data="trendChartData" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import TrendData from './data.vue'
import TrendChart from './chart.vue'
import { getTrendChart } from '@/api/chart'

const trendChartData = ref({})
const getTrendChartData = async () => {
  trendChartData.value = await getTrendChart()
}

getTrendChartData()
</script>

<style lang="scss" scoped>
.trend-container {
  height: 300px;
}
</style>
