<template>
  <el-card
    class="calendar-container"
    :body-style="{
      padding: 0
    }"
  >
    <el-calendar v-model="currentDate" class="calendar">
      <template #date-cell="{ data }">
        <p
          :class="[
            data.isSelected ? 'is-selected' : '',
            calendarChartBgClass(data.day)
          ]"
        >
          {{ data.day.split('-').slice(2).join('') }}
          <br />
          <span class="amount" v-if="getTodayAmount(data.day)">{{
            getTodayAmount(data.day)
          }}</span>
        </p>
      </template>
    </el-calendar>
  </el-card>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getCalendarChart } from '@/api/chart'

import eventBus from '@/utils/eventBus'

// 当前日期
const currentDate = ref(new Date())

// 接口数据
const calendarChartData = ref([])
const getCalendarChartData = async () => {
  const { result } = await getCalendarChart()
  calendarChartData.value = result
}

// 缓存收益数据
// key: 日期
// value: 金额
const calendarChartCacheData = ref({})

// 获取指定日期收益
const getTodayAmount = (date) => {
  if (calendarChartCacheData.value[date]) {
    return calendarChartCacheData.value[date]
  }

  const todayData = calendarChartData.value.find((item) => item.date === date)
  if (!todayData) return 0

  calendarChartCacheData.value[date] = todayData.amount

  return todayData.amount
}

// 日历背景样式
const calendarChartBgClass = (day) => {
  const amount = getTodayAmount(day)
  return amount === 0 ? '' : amount > 0 ? 'profit' : 'loss'
}

getCalendarChartData()

watch(currentDate, (val) => {
  eventBus.emit('calendarChange', val)
})
</script>

<style lang="scss" scoped>
.calendar-container {
  height: 443px;
  .calendar {
    ::v-deep .el-calendar__body {
      padding: 0 12px 12px;
      font-size: 14px;
    }
    ::v-deep .el-calendar-day {
      height: 66px !important;
      padding: 0 !important;
      p {
        height: 100%;
        padding: 8px;
      }
      // 金额样式
      .amount {
        font-size: 12px;
      }
      // 正收益
      .profit {
        background-color: #f3fff3;
        span {
          color: #649840;
        }
      }
      // 负收益
      .loss {
        background-color: #ffe7e7;
        span {
          color: #b65d59;
        }
      }

      .is-selected {
        background-color: #d6f2ff;
      }
    }
  }
}
</style>
