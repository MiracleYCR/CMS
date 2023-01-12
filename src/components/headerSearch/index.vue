<template>
  <div class="header-search-container" :class="{ show: isShow }">
    <SvgIcon class="search-icon" icon="search" @click.stop="onShow" />
    <el-select
      remote
      filterable
      default-first-option
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      :placeholder="$t('msg.navBar.headerSearch')"
      :remote-method="onSearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOption"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import Fuse from 'fuse.js'
import { useRouter } from 'vue-router'
import { ref, computed, watch } from 'vue'
import { generateRoutes } from './fuseData'
import { filterRoutes } from '@/utils/route'
import { watchSwitchLang } from '@/utils/i18n'

const router = useRouter()

// 展示 search
const isShow = ref(false)
const onShow = () => {
  isShow.value = !isShow.value
}

// 数据源
let searchPool = computed(() => {
  const filterRouteList = filterRoutes(router.getRoutes())
  return generateRoutes(filterRouteList)
})

// 搜索库
let fuse
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool.value, {
    shouldSort: true,
    minMatchCharLength: 1,
    keys: [
      {
        name: 'title', // 要搜索的键
        weight: 0.7 // 权重
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(searchPool)

// 搜索
const search = ref('')
const searchOption = ref([])
const onSearch = (query) => {
  if (query !== '') {
    searchOption.value = fuse.search(query)
  } else {
    searchOption.value = []
  }
}
const onSelectChange = (value) => {
  router.push(value.path)
}

// dom 元素
const headerSearchSelectRef = ref(null)
const onCloseSearch = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOption.value = []
  search.value = ''
}

watch(isShow, (value) => {
  if (value) {
    headerSearchSelectRef.value.focus()
    document.body.addEventListener('click', onCloseSearch)
  } else {
    document.body.removeEventListener('click', onCloseSearch)
  }
})

watchSwitchLang(() => {
  searchPool = computed(() => {
    const filterRouteList = filterRoutes(router.getRoutes())
    return generateRoutes(filterRouteList)
  })
  initFuse(searchPool)
})
</script>

<style lang="scss" scoped>
.header-search-container {
  font-size: 0 !important;
  ::v-deep .search-icon {
    cursor: pointer;
    font-size: 22px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
