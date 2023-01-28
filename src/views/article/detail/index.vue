<template>
  <div class="article-detail-container">
    <h2 class="title">{{ articleDetail.title }}</h2>

    <div class="header">
      <span class="author">
        {{ $t('msg.article.author') }} : {{ articleDetail.author }}
      </span>

      <span class="time">
        {{ $t('msg.article.publicDate') }} :
        {{ $filters.relativeTime(articleDetail.publicDate) }}
      </span>

      <el-button type="text" class="edit" @click="onEdit">
        {{ $t('msg.article.edit') }}
      </el-button>
    </div>

    <div class="content" v-html="articleDetail.content"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticleDetail } from '@/api/article'

const route = useRoute()
const router = useRouter()

const articleId = route.params.id
const articleDetail = ref({})

const getArticleDetailData = async () => {
  articleDetail.value = await getArticleDetail(articleId)
}

const onEdit = () => {
  console.log(router)
  router.push(`/article/editor/${articleId}`)
}

getArticleDetailData()
</script>

<style lang="scss" scoped>
.article-detail-container {
  .title {
    font-size: 22px;
    text-align: center;
    padding: 12px 0;
  }
  .header {
    padding: 15px 0;
    .author {
      font-size: 14px;
      color: #555666;
      margin-right: 20px;
    }
    .time {
      font-size: 14px;
      color: #999aaa;
      margin-right: 20px;
    }
    .edit {
      float: right;
    }
  }
  .content {
    font-size: 14px;
    padding: 20px 0;
    border-top: 1px solid #d4d4d4;
  }
}
</style>
