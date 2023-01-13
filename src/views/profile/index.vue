<template>
  <div class="profile-container">
    <el-row>
      <el-col :span="6">
        <Project class="project-container" :projectData="featureData" />
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeTab">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <Feature />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import Project from './components/project.vue'
import Feature from './components/feature.vue'

import { getFeature } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'

const activeTab = ref('feature')

const featureData = ref([])
const getFeatureData = async () => {
  featureData.value = await getFeature()
}

getFeatureData()

watchSwitchLang(getFeatureData)
</script>

<style lang="scss" scoped>
.profile-container {
  .project-container {
    margin-right: 20px;
  }
}
</style>
