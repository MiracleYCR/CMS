<template>
  <div class="collapse-wrapper" @click="onTriggerCollapse">
    <svgIcon class="collapse" :icon="icon"></svgIcon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import SvgIcon from '@/components/svgIcon/index.vue'

const store = useStore()

const icon = computed(() => {
  return store.getters.sideBarOpened ? 'hamburger-opened' : 'hamburger-closed'
})

const onTriggerCollapse = () => {
  store.commit('app/triggerSideBarOpened')
}
</script>

<style lang="scss" scoped>
.collapse-wrapper {
  padding: 0 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  .collapse {
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
