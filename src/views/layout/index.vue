<template>
  <div
    class="app-container"
    :class="[$store.getters.sideBarOpened ? 'openSideBar' : 'hideSideBar']"
  >
    <SideBar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVar.menuBg }"
    />

    <div class="main-container">
      <div class="fixed-header">
        <NavBar />
        <TagsView />
      </div>

      <AppMain />

      <FooterBar />
    </div>
  </div>
</template>

<script setup>
import SideBar from './components/sideBar'
import NavBar from './components/navBar.vue'
import TagsView from '@/components/tagsView/index.vue'
import AppMain from './components/appMain.vue'
import FooterBar from './components/footerBar.vue'
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
  transition: width $sideBarDuration;
}

.hideSideBar .fixed-header {
  width: calc(100% - $hideSideBarWidth);
}
</style>
