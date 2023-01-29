<template>
  <div class="trend-data-container">
    <div class="title">
      <div class="title-name">{{ $t('msg.chart.trendDataTitle') }}</div>
      <div class="title-amount">
        &yen;
        <span ref="allAmountRef"></span>
      </div>
    </div>

    <!-- 今日新增 -->
    <div class="item">
      <div class="item-name item-name-border-1">
        {{ $t('msg.chart.trendDataTadayAdded') }}
      </div>
      <div class="item-amount">
        <span class="item-amount-number" ref="tadayAddedRef"></span>
        {{ $t('msg.chart.unit') }}
      </div>
    </div>

    <!-- 今日支出 -->
    <div class="item">
      <div class="item-name item-name-border-2">
        {{ $t('msg.chart.trendDataTadayExpend') }}
      </div>
      <div class="item-amount">
        <span class="item-amount-number" ref="tadaySubRef"></span>
        {{ $t('msg.chart.unit') }}
      </div>
    </div>

    <!-- 今日结余 -->
    <div class="item">
      <div class="item-name item-name-border-3">
        {{ $t('msg.chart.trendDataTadayBalance') }}
      </div>
      <div class="item-amount">
        <span class="item-amount-number" ref="tadayAmountRef"></span>
        {{ $t('msg.chart.unit') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue'
import { CountUp } from 'countup.js'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const allAmountRef = ref(null)
const tadayAddedRef = ref(null)
const tadaySubRef = ref(null)
const tadayAmountRef = ref(null)

onMounted(() => {
  const options = {
    decimalPlaces: 2,
    duration: 0.7
  }
  new CountUp(allAmountRef.value, props.data.allAmount, options).start()
  new CountUp(tadayAddedRef.value, props.data.tadayAdded, options).start()
  new CountUp(tadaySubRef.value, props.data.tadaySub, options).start()
  new CountUp(tadayAmountRef.value, props.data.tadayAmount, options).start()
})
</script>

<style lang="scss" scoped>
.trend-data-container {
  .title {
    padding: 12px 20px;
    background: linear-gradient(to right, #0ea5e9, #6366f1);
    border-radius: 5px;
    color: white;
    .title-name {
      font-size: 12px;
      font-weight: bold;
    }
    .title-amount {
      font-size: 24px;
      margin-top: 4px;
    }
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #c9c9c9;
    padding: 16px 0;
    color: #666;
    .item-name {
      font-size: 12px;
      padding: 4px 0 4px 8px;
    }
    .item-amount {
      font-size: 12px;
      .item-amount-number {
        color: #333;
        font-weight: bold;
        font-size: 20px;
      }
    }

    .item-name-border-1 {
      border-left: 6px solid #409eff;
    }
    .item-name-border-2 {
      border-left: 6px solid #e6a23c;
    }
    .item-name-border-3 {
      border-left: 6px solid #67c23a;
    }
  }
}
</style>
