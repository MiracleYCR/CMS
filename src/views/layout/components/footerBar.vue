<template>
  <div class="footerBar-container">
    Miracle | Copyright © {{ copyrightYear }} | 备案号: 粤ICP备2022006448号-1
  </div>
</template>

<script setup>
import { computed } from 'vue'

const copyrightYear = computed(() => {
  const date = new Date()
  return date.getFullYear()
})
</script>

<style lang="scss" scoped>
.footerBar-container {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
}
</style>
