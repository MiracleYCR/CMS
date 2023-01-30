<template>
  <el-dialog
    class="exportExcel-container"
    width="30%"
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="onClose"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onClose">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm">
          {{ $t('msg.excel.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { ref, defineProps, defineEmits } from 'vue'

import { USER_DATAMAP } from '../config'
import { dateFilter } from '@/utils/globals'
import { watchSwitchLang } from '@/utils/i18n'
import { getUserMangaeAllList } from '@/api/user-manage'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const i18n = useI18n()
const emits = defineEmits(['update:modelValue'])

// excel 表名
let defaultExcelName = i18n.t('msg.excel.defaultName')
let excelName = ref(defaultExcelName)
watchSwitchLang(() => {
  defaultExcelName = i18n.t('msg.excel.defaultName')
  excelName.value = defaultExcelName
})

// 导出
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  const result = (await getUserMangaeAllList()).list
  // 工具包
  const excelTool = await import('@/utils/exportExcel')
  // 格式化数据
  const formatData = formatJson(USER_DATAMAP, result)
  excelTool.export_json_to_excel({
    // excel 表头
    header: Object.keys(USER_DATAMAP),
    // excel 数据
    data: formatData,
    // 文件名称
    filename: excelName.value || defaultExcelName
    // 是否自动列宽
    // 文件类型
  })
  onClose()
}
const formatJson = (headers, rows) => {
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      // 角色
      if (headers[key] === 'role') {
        const roleArr = item[headers[key]]
        return JSON.stringify(roleArr.map((role) => role.title))
      }
      // 时间
      if (headers[key] === 'openTime') {
        return dateFilter(item[headers[key]])
      }
      return item[headers[key]]
    })
  })
}

const onClose = () => {
  emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
.exportExcel-container {
  .el-input {
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.12) !important;
  }
}
</style>
