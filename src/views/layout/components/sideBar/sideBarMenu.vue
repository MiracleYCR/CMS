<template>
  <el-menu
    router
    :collapse="!$store.getters.sideBarOpened"
    :default-active="activeMenu"
    :uniqueOpened="true"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
  >
    <SideBarItem v-for="item in menus" :key="item.path" :route="item" />
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/route'

import SideBarItem from './sideBarItem.vue'

const route = useRoute()
const router = useRouter()

const menus = computed(() => {
  const filterRouteList = filterRoutes(router.getRoutes())
  return generateMenus(filterRouteList)
})
const activeMenu = computed(() => {
  return route.path
})
</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  height: calc(100vh - 40px);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  padding: 70px 20px 20px 20px;
}
</style>
