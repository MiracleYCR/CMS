<template>
  <el-breadcrumb class="breadcrumb-wrapper" separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in breadCrumbData"
      :key="item.path"
    >
      <!-- 不可点击项 -->
      <span class="no-redirect" v-if="index === breadCrumbData.length - 1">{{
        item.meta.title
      }}</span>
      <!-- 可点击项 -->
      <span class="redirect" v-else @click="onRedirect(item)">{{
        item.meta.title
      }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { useStore } from 'vuex'
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()

const redirectHoverColor = ref(store.getters.cssVar.menuBg)

const breadCrumbData = ref([])
const getBreadCrumbData = () => {
  breadCrumbData.value = route.matched.filter(
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

  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
