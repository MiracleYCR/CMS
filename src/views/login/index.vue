<template>
  <div class="login_container">
    <canvas id="canvas" />
    <el-form class="login_form">
      <div class="title_container">
        <h2 class="title">用户登录</h2>
      </div>
      <el-form-item>
        <span class="svg_container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          type="text"
          name="username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <span class="svg_container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input name="password" placeholder="请输入密码"></el-input>
        <span class="show_pwd">
          <svg-icon icon="eye"></svg-icon>
        </span>
      </el-form-item>

      <el-button
        type="primary"
        :style="{
          width: '100%',
          marginBottom: '30px'
        }"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

import AnimationBg from './animation'

onMounted(() => {
  AnimationBg()
})
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login_container {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  #canvas {
    display: block;
  }

  .login_form {
    position: absolute;
    width: 520px;
    overflow: hidden;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .title_container {
      position: relative;
      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }

    .svg_container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }

    .show_pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>
