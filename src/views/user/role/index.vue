<template>
  <div class="roleList-container">
    <el-card class="roleList-wrapper">
      <el-table class="roleList-table" :data="roleList" border>
        <el-table-column
          width="100"
          align="center"
          type="index"
          :label="$t('msg.role.index')"
        ></el-table-column>

        <el-table-column
          prop="title"
          :label="$t('msg.role.name')"
        ></el-table-column>

        <el-table-column
          prop="describe"
          :label="$t('msg.role.desc')"
        ></el-table-column>

        <el-table-column
          width="180"
          align="center"
          :label="$t('msg.role.action')"
          #default="{ row }"
        >
          <el-button
            v-permission="['distributePermission']"
            type="primary"
            size="small"
            @click="onDistribute(row)"
          >
            {{ $t('msg.role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>

    <Distribute v-model="distributeDialogVisible" :roleId="curRoleId" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getRoleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'

import Distribute from './components/distribute.vue'

const roleList = ref([])
const getRoleListData = async () => {
  roleList.value = await getRoleList()
}

const curRoleId = ref('')
const distributeDialogVisible = ref(false)
const onDistribute = (row) => {
  curRoleId.value = row.id
  distributeDialogVisible.value = true
}

getRoleListData()
watchSwitchLang(getRoleListData)
</script>

<style lang="scss" scoped>
.roleList-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .roleList-wrapper {
    flex: 1;

    :deep(.el-card__body) {
      height: 100%;
    }
    .roleList-table {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
