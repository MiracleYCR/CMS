<template>
  <el-card
    :body-style="{
      padding: 0
    }"
  >
    <div class="word-container" ref="wordChartRef"></div>
  </el-card>
</template>

<script setup>
import 'echarts-wordcloud'
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

// import wordBgImage from '@/assets/logo.png'
import { randomRGB } from '@/utils/color'
import { getWordChart } from '@/api/chart'

const wordChartData = ref([])
const getWordChartData = async () => {
  wordChartData.value = await getWordChart()
  renderChart()
}

let wordChartObj
const wordChartRef = ref(null)
const renderChart = () => {
  // const maskImage = new Image()
  // maskImage.src = wordBgImage

  const options = {
    series: [
      {
        // 类型
        type: 'wordCloud',
        // 数据映射文本的大小范围
        sizeRange: [0, 80],
        // 文字旋转范围
        rotationRange: [0, 0],
        // 单词之间的间距
        gridSize: 0,
        // 绘制将排除图像的轮廓
        // maskImage: maskImage,
        // 渲染动画
        layoutAnimation: true,
        // 字体
        textStyle: {
          // 随机色值
          color: randomRGB
        },
        // 高亮字体
        emphasis: {
          textStyle: {
            fontWeight: 'bold',
            color: '#000'
          }
        },
        // 数据
        data: wordChartData.value
      }
    ]
  }

  // maskImage.onload = () => {
  //   wordChartObj.setOption(options)
  // }
  wordChartObj.setOption(options)
}

getWordChartData()

onMounted(() => {
  wordChartObj = echarts.init(wordChartRef.value)
})
</script>

<style lang="scss" scoped>
.word-container {
  height: 240px;
  padding: 10px 10px 0 10px;
  box-sizing: border-box;
}
</style>
