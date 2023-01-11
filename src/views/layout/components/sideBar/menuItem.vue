<template>
  <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
  <svgIcon v-else :icon="icon"></svgIcon>
  <span>{{ generateTitle(title) }}</span>
</template>

<script setup>
import { defineProps } from 'vue'
import { generateTitle } from '@/utils/i18n'

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
