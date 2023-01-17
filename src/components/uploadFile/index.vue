<template>
  <div class="uploadFile-container">
    <div class="btn-upload">
      <el-button type="primary" :loading="loading" @click="onUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>
    <input
      ref="excelUploadInput"
      type="file"
      class="excel-upload-input"
      accept=".xlsx, .xls"
      @change="onDragChange"
    />
    <div
      class="drop"
      @drop.stop.prevent="onDrop"
      @dragover.stop.prevent="onDragover"
      @dragenter.stop.prevent="onDragover"
    >
      <el-icon><UploadFilled /></el-icon>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import * as XLSX from 'xlsx/xlsx.mjs'
import { ref, defineProps } from 'vue'
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'

import { getHeadersRow, isExcel } from './utils'

const props = defineProps({
  // 上传前的回调
  beforeUpload: Function,
  // 上传后的回调
  onSuccess: Function
})

// 点击上传
const loading = ref(false)
const excelUploadInput = ref(null)
// 上传触发函数
const onUpload = () => {
  excelUploadInput.value.click()
}
const onDragChange = (e) => {
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return
  upload(rawFile)
}

// 拖拽上传
const onDrop = (e) => {
  if (loading.value) return
  const files = e.dataTransfer.files
  if (files.length === 0) {
    return ElMessage.error('必须上传一个文件！')
  }

  const rawFile = files[0]

  if (!isExcel(rawFile)) {
    return ElMessage.error('文件必须是 .xlsx, .xls, .csv 格式！')
  }

  upload(rawFile)
}
const onDragover = (e) => {
  // 拖拽到有效区域的用户视觉效果
  e.dataTransfer.dropEffect = 'copy'
}

// 上传处理函数
const upload = (rawFile) => {
  excelUploadInput.value.value = null

  // 用户不添加回调
  if (!props.beforeUpload) {
    renderData(rawFile)
    return
  }

  // 用户添加了上传前的回调
  const beforeStatus = props.beforeUpload(rawFile)

  if (beforeStatus) {
    renderData(rawFile)
  }
}
// 数据解析方法
const renderData = (rawFile) => {
  loading.value = true
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      // 获取到解析后的数据
      const data = e.target.result
      // 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 获取第一张表格的表名
      const firstSheetName = workbook.SheetNames[0]
      // 读取第一张表的数据
      const worksheet = workbook.Sheets[firstSheetName]
      // 解析数据表头
      const header = getHeadersRow(worksheet)
      // 解析数据体
      const results = XLSX.utils.sheet_to_json(worksheet)
      console.log(results)
      // 传入解析之后的数据
      generateData({ header, results })
      // 处理 loading
      loading.value = false
      // 成功的回调
      resolve()
    }

    reader.readAsArrayBuffer(rawFile)
  })
}
// 生成数据
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}
</script>

<style lang="scss" scoped>
.uploadFile-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .excel-upload-input {
    display: none;
    z-index: 9999;
  }

  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }

  .drop {
    color: #bbb;
    display: flex;
    line-height: 60px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
