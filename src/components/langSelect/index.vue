<template>
  <el-dropdown class="international" trigger="click" @command="onSetLang">
    <div>
      <el-tooltip content="国际化" :effect="effect" :auto-close="400">
        <svgIcon icon="language" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="lang === 'zh'" command="zh"
          >中文</el-dropdown-item
        >
        <el-dropdown-item :disabled="lang === 'en'" command="en"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { computed, defineProps } from 'vue'

import SvgIcon from '@/components/svgIcon'

defineProps({
  effect: {
    type: String,
    required: true,
    validator(value) {
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})

const i18n = useI18n()
const store = useStore()

const lang = computed(() => store.getters.lang)

const onSetLang = (lang) => {
  i18n.locale.value = lang
  store.commit('app/setLang', lang)
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>

<style lang="scss" scoped></style>
