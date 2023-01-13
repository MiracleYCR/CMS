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
  height: 39px;
  line-height: 39px;
  text-align: center;
  font-size: 14px;

  background-color: #fff;
  border-top: 1px solid #d8dce5;
  box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}
</style>
