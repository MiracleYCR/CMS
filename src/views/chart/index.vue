<template>
  <div class="chart-container">
    <TrendComp />
    <el-row class="mt-20" :gutter="20">
      <el-col :span="16">
        <FundComp />
      </el-col>
      <el-col :span="8">
        <CalendarComp />
      </el-col>
    </el-row>

    <el-row class="mt-20" :gutter="20">
      <el-col :span="6">
        <div>
          <PieComp />
          <WordComp class="mt-20" />
        </div>
      </el-col>
      <el-col :span="18">
        <MapComp />
      </el-col>
    </el-row>

    <SheetComp class="mt-20" />
  </div>
</template>

<script setup>
import TrendComp from './components/trend/index.vue'
import FundComp from './components/fund/index.vue'
import CalendarComp from './components/calendar/index.vue'
import PieComp from './components/pie/index.vue'
import WordComp from './components/word/index.vue'
import MapComp from './components/map/index.vue'
import SheetComp from './components/sheet/index.vue'
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-right: 20px;
  overflow-y: auto;

  .mt-20 {
    margin-top: 20px;
  }
}
</style>
