<template>
  <el-dialog
    width="20%"
    :title="$t('msg.navBar.themeChange')"
    :model-value="modelValue"
    @close="onClose"
  >
    <div class="content">
      <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
      <el-color-picker
        v-model="curColor"
        :predefine="predefineColors"
      ></el-color-picker>
    </div>

    <template #footer>
      <div class="btn-group">
        <el-button size="small" @click="onClose">{{
          $t('msg.universal.cancel')
        }}</el-button>
        <el-button size="small" type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { useStore } from 'vuex'
import { defineProps, ref, defineEmits } from 'vue'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const store = useStore()

const emits = defineEmits(['update:modelValue'])

// 默认色值
const curColor = ref(store.getters.mainColor)
// 预制颜色
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'rgb(48, 65, 86)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]

const onClose = () => {
  emits('update:modelValue', false)
}
const onConfirm = async () => {
  const newStyle = await generateNewStyle(curColor.value)
  writeNewStyle(newStyle)
  store.commit('app/setMainColor', curColor.value)
  onClose()
}
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}

.btn-group {
  display: flex;
  justify-content: center;
}
</style>
