<template>
  <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
  <svgIcon v-else :icon="icon"></svgIcon>
  <span>{{ title }}</span>
</template>

<script setup>
import { defineProps } from 'vue'
import SvgIcon from '@/components/svgIcon/index.vue'

defineProps({
  title: {
    type: String,
    required: true
  },

  icon: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
