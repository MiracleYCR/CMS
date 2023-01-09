<template>
  <div class="navBar-container">
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
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.navBar-container {
  width: 100%;
  height: 50px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

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
