<template>
  <el-dialog
    class="roles-dialog-container"
    width="30%"
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="onClose"
  >
    <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox
        v-for="item in roleList"
        :key="item.id"
        :label="item.title"
      ></el-checkbox>
    </el-checkbox-group>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onClose">
          {{ $t('msg.universal.cancel') }}
        </el-button>
        <el-button type="primary" @click="onConfirm">
          {{ $t('msg.universal.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { ref, defineProps, defineEmits, watch } from 'vue'

import { getRoleList } from '@/api/role'
import { getUserRoles, updateUserRoles } from '@/api/user-manage'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})
const i18n = useI18n()
const emits = defineEmits(['update:modelValue', 'updateRole'])

const onConfirm = async () => {
  const roles = userRoleTitleList.value.map((title) => {
    return roleList.value.find((role) => role.title === title)
  })
  await updateUserRoles({ id: props.userId, roles })
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  emits('updateRole')
  onClose()
}

const onClose = () => {
  emits('update:modelValue', false)
}

// 所有用户角色
const roleList = ref([])
const getRoleListData = async () => {
  roleList.value = await getRoleList()
}

// 当前用户角色
const userRoleTitleList = ref([])
const getUserRolesData = async () => {
  userRoleTitleList.value = (await getUserRoles(props.userId)).role.map(
    (item) => item.title
  )
}
watch(
  () => props.userId,
  (val) => {
    val && getUserRolesData()
  }
)

getRoleListData()
watchSwitchLang(getRoleListData)
</script>

<style lang="scss" scoped>
.roles-dialog-container {
}
</style>
