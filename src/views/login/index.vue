<template>
  <div class="login_container">
    <canvas id="canvas" />
    <el-form
      class="login_form"
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title_container">
        <h2 class="title">用户登录</h2>
      </div>
      <el-form-item prop="username">
        <span class="svg_container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          type="text"
          name="username"
          placeholder="请输入用户名"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg_container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          name="password"
          placeholder="请输入密码"
          :type="passwordType"
          v-model="loginForm.password"
        ></el-input>
        <span class="show_pwd" @click="onChangePasswordType">
          <svg-icon
            :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
          ></svg-icon>
        </span>
      </el-form-item>

      <el-button
        type="primary"
        :style="{
          width: '100%',
          marginBottom: '30px'
        }"
        :loading="loading"
        @click="onLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'
import AnimationBg from './animation'
import { validatePassword } from '@/utils/validate'

const store = useStore()

const loginFormRef = ref(null)
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '用户名必填'
    }
  ],

  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})

const passwordType = ref('password')
const onChangePasswordType = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}

const loading = ref(false)
const onLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (!valid) return
    loading.value = true
    store
      .dispatch('user/login', loginForm.value)
      .then(() => {
        loading.value = false
      })
      .catch((err) => {
        console.log(err)
        loading.value = false
      })
  })
}

onMounted(() => {
  AnimationBg()
  window.onresize = () => {
    AnimationBg()
  }
})
</script>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login_container {
  position: relative;
  height: 100%;
  width: 100%;
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
