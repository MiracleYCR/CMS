<template>
  <div class="permissionList-container">
    <el-card class="permissionList-wrapper">
      <el-table
        border
        row-key="id"
        default-expand-all
        class="permissionList-table"
        :data="permissionList"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          width="240"
          prop="permissionName"
          :label="$t('msg.permission.name')"
        ></el-table-column>

        <el-table-column
          width="240"
          prop="permissionMark"
          :label="$t('msg.permission.mark')"
        ></el-table-column>

        <el-table-column
          prop="permissionDesc"
          :label="$t('msg.permission.desc')"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getPermissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'

const permissionList = ref([])
const getPermissionListData = async () => {
  permissionList.value = await getPermissionList()
}

getPermissionListData()
watchSwitchLang(getPermissionListData)
</script>

<style lang="scss" scoped>
.permissionList-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .permissionList-wrapper {
    flex: 1;

    ::v-deep .el-card__body {
      height: 100%;
    }
    .permissionList-table {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
