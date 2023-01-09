<template>
  <div class="app-container">
    <SideBar
      class="sidebar-container"
      :style="{ backgroundColor: variable.menuBg }"
    />

    <div class="main-container">
      <div class="fixed-header">
        <NavBar />
      </div>
      <AppMain />
      <FooterBar />
    </div>
  </div>
</template>

<script setup>
import SideBar from './components/sideBar'
import NavBar from './components/navBar.vue'
import AppMain from './components/appMain.vue'
import FooterBar from './components/footerBar.vue'
import variable from '@/styles/variable.module.scss'

console.log(variable)
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variable.module.scss';
.app-container {
  @include clearfix;
  position: relative;
  width: 100%;
  height: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  width: calc(100% - $sideBarWidth);
}
</style>
