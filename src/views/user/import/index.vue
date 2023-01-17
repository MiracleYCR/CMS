<template>
  <div class="user-import-container">
    <UploadFile :onSuccess="onSuccess" />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import { USER_DATAMAP, formatDate } from './config'
import { userBatchImport } from '@/api/user-manage'

import UploadFile from '@/components/uploadFile/index.vue'

const i18n = useI18n()
const router = useRouter()

const onSuccess = async ({ results }) => {
  const formatData = generateData(results)

  await userBatchImport(formatData)

  ElMessage.success({
    type: 'success',
    message: results.length + i18n.t('msg.excel.importSuccess')
  })

  router.push('/user/manage')
}

const generateData = (results) => {
  const arr = []
  results.forEach((item) => {
    const userInfo = {}
    Object.keys(item).forEach((key) => {
      if (USER_DATAMAP[key] === 'openTime') {
        console.log(item[key])
        userInfo[USER_DATAMAP[key]] = formatDate(item[key])
        return
      }
      userInfo[USER_DATAMAP[key]] = item[key]
    })
    arr.push(userInfo)
  })
  return arr
}
</script>

<style lang="scss" scoped>
.user-import-container {
  width: 100%;
  height: 100%;
}
</style>
