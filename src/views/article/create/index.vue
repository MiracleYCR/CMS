<template>
  <div class="article-create-container">
    <el-card class="body">
      <el-input
        class="title"
        clearable
        maxlength="20"
        v-model="title"
        :placeholder="$t('msg.article.titlePlaceholder')"
      ></el-input>

      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <Markdown
            :title="title"
            :detail="articleDetail"
            @onSuccess="onSuccess"
          />
        </el-tab-pane>

        <el-tab-pane :label="$t('msg.article.richText')" name="richText">
          <Editor />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Editor from './components/editor.vue'
import Markdown from './components/markdown.vue'
import { getArticleDetail } from '@/api/article'

const route = useRoute()

const title = ref('')
const activeName = ref('richText')

const onSuccess = () => {
  title.value = ''
}

// 处理编辑相关
const articleId = route.params.id
const articleDetail = ref({})
const getArticleDetailData = async () => {
  articleDetail.value = await getArticleDetail(articleId)
  // 标题
  title.value = articleDetail.value.title
}

if (articleId) {
  getArticleDetailData()
}
</script>

<style lang="scss" scoped>
.article-create-container {
  width: 100%;
  height: 100%;

  .body {
    width: 100%;
    height: 100%;

    ::v-deep .el-card__body {
      height: inherit;
      display: flex;
      flex-direction: column;

      .el-tabs {
        height: 100%;
        display: flex;
        flex-direction: column;
        .el-tabs__content {
          flex: 1;
          .el-tab-pane {
            height: 100%;
          }
        }
      }
    }
  }
  .title {
    margin-bottom: 20px;

    ::v-deep .el-input__wrapper {
      border: 1px solid rgba(0, 0, 0, 0.12);
    }
  }
}
</style>
