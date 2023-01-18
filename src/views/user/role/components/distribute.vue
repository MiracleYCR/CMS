<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-tree
      ref="treeRef"
      node-key="id"
      show-checkbox
      check-strictly
      default-expand-all
      :data="permissionList"
      :props="defaultProps"
    ></el-tree>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">
          {{ $t('msg.universal.cancel') }}
        </el-button>
        <el-button type="primary" @click="onConfirm">
          {{ $t('msg.universal.confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { defineProps, defineEmits, ref, watch } from 'vue'

import { watchSwitchLang } from '@/utils/i18n'
import { getPermissionList } from '@/api/permission'
import { getRolePermission, distributeRolePermission } from '@/api/role'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})
const i18n = useI18n()
const emits = defineEmits(['update:modelValue'])

const onConfirm = async () => {
  await distributeRolePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  closed()
}
const closed = () => {
  emits('update:modelValue', false)
}

// 获取所有权限数据
const permissionList = ref([])
const getPermissionListData = async () => {
  permissionList.value = await getPermissionList()
}

const treeRef = ref(null)
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}

// 获取当前角色的权限
const getRolePermissionData = async () => {
  const checkedKeys = await getRolePermission(props.roleId)
  treeRef.value.setCheckedKeys(checkedKeys)
}

watch(
  () => props.roleId,
  (val) => {
    val && getRolePermissionData(val)
  }
)

getPermissionListData()
watchSwitchLang(getPermissionListData)
</script>
