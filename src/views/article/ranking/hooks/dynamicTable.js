import { ref, watch } from 'vue'
import i18n from '@/i18n'
import { watchSwitchLang } from '@/utils/i18n'

const getDefaultTableColumns = () => [
  {
    label: i18n.global.t('msg.article.ranking'),
    prop: 'ranking',
    width: 100,
    align: 'center'
  },
  {
    label: i18n.global.t('msg.article.title'),
    prop: 'title',
    width: 250
  },
  {
    label: i18n.global.t('msg.article.author'),
    prop: 'author',
    width: 180
  },
  {
    label: i18n.global.t('msg.article.publicDate'),
    prop: 'publicDate',
    width: 180,
    align: 'center'
  },
  {
    label: i18n.global.t('msg.article.desc'),
    prop: 'desc',
    width: 300
  },
  {
    label: i18n.global.t('msg.article.action'),
    prop: 'action',
    width: 120,
    align: 'center'
  }
]

// 默认列
export const defaultTableColumns = ref(getDefaultTableColumns())

// 选择列
export const selectTableColumn = ref([])

// 动态列
export const tableColumns = ref([])
watch(
  selectTableColumn,
  (val) => {
    tableColumns.value = []
    const curTableColumns = defaultTableColumns.value.filter((item) => {
      return val.includes(item.label)
    })

    tableColumns.value.push(...curTableColumns)
  },
  {
    immediate: true
  }
)

// 初始化列
const initSelectTableColumn = () => {
  selectTableColumn.value = defaultTableColumns.value.map((item) => item.label)
}

initSelectTableColumn()
watchSwitchLang(() => {
  defaultTableColumns.value = getDefaultTableColumns()
  initSelectTableColumn()
})
