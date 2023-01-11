<template>
  <el-submenu v-if="route.children.length > 0" :index="route.path">
    <template #title>
      <MenuItem :title="route.meta.title" :icon="route.meta.icon" />
    </template>

    <sideBarItem
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    />
  </el-submenu>
  <el-menu-item v-else :index="route.path">
    <MenuItem :title="route.meta.title" :icon="route.meta.icon" />
  </el-menu-item>
</template>

<script setup>
import { defineProps } from 'vue'

import MenuItem from './menuItem.vue'

defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
