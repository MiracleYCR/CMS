<template>
  <div class="markdown-container">
    <div id="markdown-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmit">
        {{ $t('msg.article.commit') }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { defineProps, defineEmits, onMounted, watch, nextTick } from 'vue'
import MKEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/i18n/zh-cn'
import '@toast-ui/editor/dist/toastui-editor.css'
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

let mkEditor
let mkEditorDom
const initEditor = () => {
  mkEditor = new MKEditor({
    el: mkEditorDom,
    height: `${mkEditorDom.clientHeight}px`,
    previewStyle: 'vertical',
    language: store.getters.lang === 'zh' ? 'zh-CN' : 'en'
  })

  mkEditor.getMarkdown()
}

const onSubmit = async () => {
  if (props.detail && props.detail._id) {
    await updateArticle({
      id: props.detail._id,
      title: props.title,
      content: mkEditor.getHTML()
    })
  } else {
    await commitArticle({
      title: props.title,
      content: mkEditor.getHTML()
    })
  }
  mkEditor.reset()
  emits('onSuccess')
}

onMounted(() => {
  nextTick(() => {
    mkEditorDom = document.querySelector('#markdown-box')
    initEditor()
  })
})

watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      mkEditor.setHTML(val.content)
    }
  },
  {
    immediate: true,
    deep: true
  }
)

watchSwitchLang(() => {
  if (!mkEditorDom) return
  const htmlStr = mkEditor.getHTML()
  mkEditor.destroy()
  initEditor()
  mkEditor.setHTML(htmlStr)
})
</script>

<style lang="scss" scoped>
.markdown-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  #markdown-box {
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
