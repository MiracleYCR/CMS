<template>
  <div class="user-info-container">
    <el-card class="print-box">
      <el-button type="primary" :loading="printLoading" v-print="printConfig">
        {{ $t('msg.userInfo.print') }}
      </el-button>
    </el-card>

    <el-card>
      <div class="user-info-box" id="userInfoBox">
        <h2 style="text-align: center; margin-bottom: 18px">
          {{ $t('msg.userInfo.title') }}
        </h2>
        <div style="display: flex">
          <el-descriptions :column="2" border style="flex-grow: 1">
            <el-descriptions-item :label="$t('msg.userInfo.name')">
              {{ detailData.username }}
            </el-descriptions-item>

            <el-descriptions-item :label="$t('msg.userInfo.sex')">
              {{ detailData.gender }}
            </el-descriptions-item>

            <el-descriptions-item :label="$t('msg.userInfo.nation')">
              {{ detailData.nationality }}
            </el-descriptions-item>

            <el-descriptions-item :label="$t('msg.userInfo.mobile')">
              {{ detailData.mobile }}
            </el-descriptions-item>

            <el-descriptions-item :label="$t('msg.userInfo.province')">
              {{ detailData.province }}
            </el-descriptions-item>

            <el-descriptions-item :label="$t('msg.userInfo.date')">
              {{ $filters.dateFilter(detailData.openTime) }}
            </el-descriptions-item>

            <el-descriptions-item :label="$t('msg.userInfo.remark')" :span="2">
              <el-tag
                style="margin-right: 12px"
                size="small"
                v-for="(item, index) in detailData.remark"
                :key="index"
              >
                {{ item }}
              </el-tag>
            </el-descriptions-item>

            <el-descriptions-item :label="$t('msg.userInfo.address')" :span="2">
              {{ detailData.address }}
            </el-descriptions-item>
          </el-descriptions>

          <el-image
            :style="{
              width: '187px',
              boxSizing: 'border-box',
              padding: '20px 20px',
              border: '1px solid #ebeef5',
              borderLeft: 'none'
            }"
            :src="detailData.avatar"
            :preview-src-list="[detailData.avatar]"
          ></el-image>
        </div>

        <div style="margin-top: 10px">
          <el-descriptions direction="vertical" :column="1" border>
            <el-descriptions-item :label="$t('msg.userInfo.experience')">
              <ul style="list-style: none">
                <li v-for="(item, index) in detailData.experience" :key="index">
                  <span style="margin-right: 62px">
                    {{ $filters.dateFilter(item.startTime, 'YYYY/MM') }} —
                    {{ $filters.dateFilter(item.endTime, 'YYYY/MM') }}
                  </span>
                  <span style="margin-right: 62px">{{ item.title }}</span>
                  <span style="margin-right: 62px">{{ item.desc }}</span>
                </li>
              </ul>
            </el-descriptions-item>

            <el-descriptions-item :label="$t('msg.userInfo.major')">
              {{ detailData.major }}
            </el-descriptions-item>

            <el-descriptions-item :label="$t('msg.userInfo.glory')">
              {{ detailData.glory }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div style="margin-top: 42px; text-align: right">
          {{ $t('msg.userInfo.foot') }}
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { getUserDetail } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const detailData = ref({})
const getUserDetailData = async () => {
  detailData.value = await getUserDetail(props.id)
  console.log(detailData.value)
}

const printLoading = ref(false)
const printConfig = {
  id: 'userInfoBox',
  popTitle: 'vue3-element-admin',
  beforeOpenCallback() {
    printLoading.value = true
  },
  openCallback() {
    printLoading.value = false
  }
}

getUserDetailData()
watchSwitchLang(getUserDetailData)
</script>

<style lang="scss" scoped>
.user-info-container {
  width: 100%;
  height: 100%;

  .print-box {
    margin-bottom: 20px;
    text-align: right;
  }
  .user-info-box {
    width: 1024px;
    margin: 0 auto;
  }
}
</style>
