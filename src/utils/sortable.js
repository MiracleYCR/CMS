import { ref } from 'vue'
import i18n from '@/i18n'
import Sortable from 'sortablejs'
import { ElMessage } from 'element-plus'
import { updateArticleList } from '@/api/article'

export const tableRef = ref(null)

export const initSortable = (tableData, cb) => {
  // 要拖拽的元素
  const dom = tableRef.value.$el.querySelector('.el-table__body-wrapper tbody')

  // 配置对象
  Sortable.create(dom, {
    // 拖拽的元素类名
    ghostClass: 'sortable-ghost',
    // 拖拽结束之后的方法
    async onEnd(event) {
      const { newIndex, oldIndex } = event

      if (newIndex === oldIndex) return

      await updateArticleList({
        initRanking: tableData.value[oldIndex].ranking,
        finalRanking: tableData.value[newIndex].ranking
      })

      // 直接获取数据 element-plust 的表格不会重新渲染
      tableData.value = []

      cb && cb()

      ElMessage.success(i18n.global.t('msg.article.sortSuccess'))
    }
  })
}
