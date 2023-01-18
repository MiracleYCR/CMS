<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="priamry" @click="onImportExcel">
          {{ $t('msg.excel.importExcel') }}
        </el-button>
        <el-button type="success" @click="onExportExcel">
          {{ $t('msg.excel.exportExcel') }}
        </el-button>
      </div>
    </el-card>

    <el-card class="body">
      <el-table class="body-table" :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column
          :label="$t('msg.excel.name')"
          prop="username"
        ></el-table-column>

        <el-table-column
          :label="$t('msg.excel.mobile')"
          prop="mobile"
        ></el-table-column>

        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[
                'https://avatars.githubusercontent.com/u/29778918?v=4'
              ]"
            ></el-image>
          </template>
        </el-table-column>

        <el-table-column :label="$t('msg.excel.role')">
          <template v-slot="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="small">
                {{ item.title }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="small">
                {{ $t('msg.excel.defaultRole') }}
              </el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="250"
        >
          <template #default="{ row }">
            <div class="btn-group">
              <el-button type="primary" size="small" @click="onShow(row)">
                {{ $t('msg.excel.show') }}
              </el-button>
              <el-button type="info" size="small" @click="onShowRole(row)">
                {{ $t('msg.excel.showRole') }}
              </el-button>
              <el-button type="danger" size="small" @click="onRemove(row)">
                {{ $t('msg.excel.remove') }}
              </el-button>
            </div>
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

    <ExportExcel v-model="exportExcelVisible" />

    <RolesDialog
      v-model="roleDialogVisible"
      :userId="curUserId"
      @updateRole="getListData"
    />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { ref, onActivated, watch } from 'vue'
import { useRouter } from 'vue-router'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getUserManageList, deleteUser } from '@/api/user-manage'

import RolesDialog from './components/roles.vue'
import ExportExcel from './components/exportExcel.vue'

const i18n = useI18n()
const router = useRouter()

const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(10)

const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}

const onSizeChange = async (currentSize) => {
  size.value = currentSize
  getListData()
}
const onCurrentChange = async (currentPage) => {
  page.value = currentPage
  getListData()
}

// 详情按钮
const onShow = (row) => {
  router.push(`/user/info/${row._id}`)
}

// 删除按钮
const onRemove = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      row.username +
      i18n.t('msg.excel.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteUser(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    getListData()
  })
}

// 导入
const onImportExcel = async () => {
  router.push('/user/import')
}

// 导出
const exportExcelVisible = ref(false)
const onExportExcel = () => {
  exportExcelVisible.value = true
}

// 用户角色
const curUserId = ref('')
const roleDialogVisible = ref(false)
const onShowRole = (row) => {
  curUserId.value = row._id
  roleDialogVisible.value = true
}
watch(roleDialogVisible, (val) => {
  !val && (curUserId.value = '')
})

// 获取数据
getListData()
// 监听语言变化
watchSwitchLang(getListData)
// 重新刷新数据表
onActivated(getListData)
</script>

<style lang="scss" scoped>
.user-manage-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    margin-bottom: 10px;
    text-align: right;
  }

  .body {
    flex: 1;

    ::v-deep .el-card__body {
      height: 100%;
    }

    .body-table {
      height: calc(100% - 52px);
    }
  }

  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }

  .btn-group {
    display: flex;
    justify-content: center;
  }
}
</style>
