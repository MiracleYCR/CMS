<template>
  <div class="navBar-container">
    <!-- 折叠按钮 -->
    <Collapse class="collapse-container" />
    <!-- 面包屑 -->
    <BreadCrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="circle"
            :size="40"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click="onLogout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

import Collapse from '@/components/collapse/index.vue'
import BreadCrumb from '@/components/breadCrumb/index.vue'

const store = useStore()

const onLogout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navBar-container {
  width: 100%;
  height: 50px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .collapse-container {
    height: 100%;
    float: left;
    transition: background 0.5s;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    height: 100%;
    display: flex;
    align-items: center;
    float: right;
    padding-right: 20px;
    ::v-deep .avatar-container {
      cursor: pointer;

      .avatar-wrapper {
        display: flex;
        align-items: center;
        .el-avatar {
          --el-avatar-background-color: none;
        }
      }
    }
  }
}
</style>
