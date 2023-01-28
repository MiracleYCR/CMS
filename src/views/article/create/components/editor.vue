<template>
  <div class="editor-container">
    <div id="editor-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmit">
        {{ $t('msg.article.commit') }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import i18next from 'i18next'
import Eidtor from 'wangeditor'
import { useStore } from 'vuex'
import { defineProps, defineEmits, onMounted, nextTick, watch } from 'vue'

import { watchSwitchLang } from '@/utils/i18n'
import { commitArticle, updateArticle } from '../hooks/index'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: Object
  }
})

const emits = defineEmits(['onSuccess'])

const store = useStore()

let editor
let editorDom

const initEditor = () => {
  editor = new Eidtor(editorDom)
  editor.config.zIndex = 1
  editor.config.height = editorDom.clientHeight - 42
  editor.config.showMenuTooltips = true
  editor.config.menuTooltipPosition = 'down'
  editor.config.lang = store.getters.lang === 'zh' ? 'zh-CN' : 'en'
  editor.i18next = i18next
  editor.create()
}

const onSubmit = async () => {
  if (props.detail && props.detail._id) {
    await updateArticle({
      id: props.detail._id,
      title: props.title,
      content: editor.txt.html()
    })
  } else {
    await commitArticle({
      title: props.title,
      content: editor.txt.html()
    })
  }
  editor.txt.html('')
  emits('onSuccess')
}

onMounted(() => {
  nextTick(() => {
    editorDom = document.querySelector('#editor-box')
    initEditor()
  })
})

watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      editor.txt.html(val.content)
    }
  },
  {
    immediate: true,
    deep: true
  }
)

watchSwitchLang(() => {
  if (!editorDom) return
  const htmlStr = editor.txt.html()
  editor.destroy()
  initEditor()
  editor.txt.html(htmlStr)
})
</script>

<style lang="scss" scoped>
.editor-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  #editor-box {
    flex: 1;
  }

  .bottom {
    height: 45px;
    line-height: 45px;
    margin-top: 10px;
    text-align: right;
  }
}
</style>
