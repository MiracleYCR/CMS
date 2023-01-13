<template>
  <el-card class="project-container">
    <template #header>
      <div class="header">
        <span>{{ $t('msg.profile.introduce') }}</span>
      </div>
    </template>

    <div class="project-user">
      <div class="box-center">
        <PanThumb
          width="100px"
          height="100px"
          image="https://avatars.githubusercontent.com/u/29778918?v=4"
        >
          <div>Hello</div>
          {{ $store.getters.userInfo.username }}
        </PanThumb>
      </div>

      <div class="box-center">
        <div class="user-name text-center">
          {{ $store.getters.userInfo.username }}
        </div>
        <div class="user-name text-center text-muted">
          {{ $store.getters.userInfo.title }}
        </div>
      </div>
    </div>

    <div class="project-intro">
      <div class="project-intro-section">
        <div class="project-intro-section-header">
          <SvgIcon icon="introduce" />
          <span>{{ $t('msg.profile.projectIntroduction') }}</span>
        </div>
        <div class="project-intro-section-body">
          <div class="text-muted">
            {{ $t('msg.profile.muted') }}
          </div>
        </div>
      </div>

      <div class="project-intro-section">
        <div class="project-intro-section-header">
          <SvgIcon icon="reward" />
          <span>{{ $t('msg.profile.projectFunction') }}</span>
        </div>
        <div class="project-intro-section-body">
          <div class="progress-item" v-for="item in projectData" :key="item.id">
            <div>{{ item.title }}</div>
            <el-progress
              status="success"
              :percentage="item.percentage"
            ></el-progress>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { defineProps } from 'vue'
import PanThumb from '@/components/panThumb/index.vue'

defineProps({
  projectData: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.project-container {
  .text-muted {
    font-size: 14px;
    color: #777;
  }

  .project-user {
    text-align: center;
    .user-name {
      font-weight: bold;
    }

    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
    }
  }

  .project-intro {
    margin-top: 20px;
    color: #606266;
    span {
      padding-left: 4px;
    }

    .project-intro-section {
      margin-bottom: 36px;
      .project-intro-section-header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }
      .project-intro-section-body {
        .progress-item {
          margin-top: 10px;
          div {
            font-size: 14px;
            margin-bottom: 2px;
          }
        }
      }
    }
  }
}
</style>
