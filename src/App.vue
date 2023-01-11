<template>
  <el-config-provider :locale="$store.getters.lang === 'en' ? en : zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import en from 'element-plus/lib/locale/lang/en'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
