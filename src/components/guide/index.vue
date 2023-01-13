<template>
  <div class="guide-container">
    <el-tooltip :content="$t('msg.navBar.guide')" :auto-close="200">
      <SvgIcon id="guide-start" icon="guide" @click="onGuide" />
    </el-tooltip>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'

import steps from './steps'

const i18n = useI18n()

let driver = null

const onGuide = () => {
  driver.defineSteps(steps(i18n))
  driver.start()
}

onMounted(() => {
  driver = new Driver({
    allowClose: false,
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev'),
    doneBtnText: i18n.t('msg.guide.done')
  })
})
</script>

<style lang="scss" scoped></style>
