<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span>{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectTableColumn">
          <el-checkbox
            v-for="(item, index) in defaultTableColumns"
            :key="index"
            :label="item.label"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card class="body">
      <el-table class="body-table" ref="tableRef" border :data="tableData">
        <el-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.width"
          :align="item.align || 'left'"
        >
          <template v-if="item.prop === 'publicDate'" #default="{ row }">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>

          <template v-else-if="item.prop === 'action'" #default="{ row }">
            <el-button type="primary" size="small" @click="onShow(row)">
              {{ $t('msg.article.show') }}
            </el-button>
            <el-button type="danger" size="small" @click="onRemove(row)">
              {{ $t('msg.article.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page-size="size"
        :page-sizes="[10, 15, 20, 30]"
        :current-page="page"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { ref, onActivated, onMounted } from 'vue'
import { getArticleList, deleteArticle } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'
import { tableRef, initSortable } from '@/utils/sortable'
import { ElMessageBox, ElMessage } from 'element-plus'

import {
  selectTableColumn,
  defaultTableColumns,
  tableColumns
} from './hooks/dynamicTable'
import router from '@/router'

const i18n = useI18n()

// 文章数据
const tableData = ref([])
const page = ref(1)
const size = ref(10)
const total = ref(0)

const getArticleListData = async () => {
  const result = await getArticleList({
    page: page.value,
    size: size.value
  })

  tableData.value = result.list
  total.value = result.total
}

const onSizeChange = async (currentSize) => {
  size.value = currentSize
  getArticleListData()
}
const onCurrentChange = async (currentPage) => {
  page.value = currentPage
  getArticleListData()
}

const onShow = (row) => {
  console.log(row)
  router.push(`/article/${row._id}`)
}
const onRemove = (row) => {
  console.log(row)
  ElMessageBox.confirm(
    i18n.t('msg.article.dialogTitle1') +
      row.title +
      i18n.t('msg.article.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteArticle(row._id)
    getArticleListData()
    ElMessage.success(i18n.t('msg.article.removeSuccess'))
  })
}

getArticleListData()
watchSwitchLang(getArticleListData)
onActivated(getArticleListData)

onMounted(() => {
  initSortable(tableData, getArticleListData)
})
</script>

<style lang="scss" scoped>
.article-ranking-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    margin-bottom: 10px;
    .dynamic-box {
      display: flex;
      align-items: center;
      span {
        margin-right: 20px;
      }
    }
  }

  .body {
    flex: 1;
    ::v-deep .el-card__body {
      height: 100%;
    }

    .body-table {
      height: calc(100% - 52px);
      ::v-deep .sortable-ghost {
        opacity: 0.4;
        color: #ffffff;
        background-color: #304156;
      }
    }

    .pagination {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
