<template>
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="onSetTheme"
  >
    <div>
      <el-tooltip :content="$t('msg.navBar.themeChange')" :auto-close="200">
        <SvgIcon icon="change-theme" />
      </el-tooltip>
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t('msg.theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <div>
    <ColorPicker v-model="colorPickerVisible" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ColorPicker from './colorPicker.vue'

const colorPickerVisible = ref(false)
const onSetTheme = (command) => {
  console.log(command)
  colorPickerVisible.value = true
}
</script>

<style lang="scss" scoped></style>
