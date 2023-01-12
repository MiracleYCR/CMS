<template>
  <div class="login-container">
    <canvas id="canvas" />
    <el-form
      class="login-form"
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title-container">
        <h2 class="title">{{ $t('msg.login.title') }}</h2>
        <LangSelect class="lang-select" />
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          type="text"
          name="username"
          :placeholder="$t('msg.login.usernamePlaceholder')"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          name="password"
          :placeholder="$t('msg.login.passwordPlaceholder')"
          :type="passwordType"
          v-model="loginForm.password"
        ></el-input>
        <span class="show-pwd" @click="onChangePasswordType">
          <svg-icon
            :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
          ></svg-icon>
        </span>
      </el-form-item>

      <el-button
        size="large"
        type="primary"
        :style="{
          width: '100%',
          marginBottom: '30px'
        }"
        :loading="loading"
        @click="onLogin"
        >{{ $t('msg.login.loginBtn') }}</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AnimationBg from './animation'
import { validatePassword } from '@/utils/validate'
import LangSelect from '@/components/langSelect/index.vue'

const i18n = useI18n()
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
      message: i18n.t('msg.login.usernameRule')
    }
  ],

  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword(i18n)
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

.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;

  #canvas {
    display: block;
  }

  .login-form {
    position: absolute;
    width: 520px;
    overflow: hidden;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }

      ::v-deep .lang-select {
        position: absolute;
        top: 4px;
        right: 0;
        padding: 4px;
        font-size: 22px;
        border-radius: 4px;
        cursor: pointer;
        background-color: #ffffff;
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
      background-color: none;

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

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }

    .show-pwd {
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
