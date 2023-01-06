<template>
  <div class="app_container">
    <SideBar />

    <div class="main_container">
      <div class="fixed_header">
        <NavBar />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<script setup>
import SideBar from './components/sideBar'
import NavBar from './components/navBar.vue'
import AppMain from './components/appMain.vue'
</script>

<style lang="scss" scoped>
.app_container {
}
</style>
