<template>
  <el-breadcrumb class="breadcrumb-wrapper" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <!-- 不可点击项 -->
        <span class="no-redirect" v-if="index === breadcrumbData.length - 1">{{
          generateTitle(item.meta.title)
        }}</span>
        <!-- 可点击项 -->
        <span class="redirect" v-else @click="onRedirect(item)">{{
          generateTitle(item.meta.title)
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { useStore } from 'vuex'
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { generateTitle } from '@/utils/i18n'

const store = useStore()
const route = useRoute()
const router = useRouter()

const redirectHoverColor = ref(store.getters.cssVar.menuBg)

const breadcrumbData = ref([])
const getBreadCrumbData = () => {
  breadcrumbData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
}

const onRedirect = (routeInfo) => {
  router.push(routeInfo.path)
}

watch(
  route,
  () => {
    getBreadCrumbData()
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.breadcrumb-wrapper {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .redirect {
    color: #666;
    font-weight: 600;
    &:hover {
      cursor: pointer;
      color: v-bind(redirectHoverColor);
    }
  }

  :deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }
}
</style>
