import md5 from 'md5'
import router from '@/router/index'
import { TOKEN } from '@/constant/index'
import { login, getUserInfo } from '@/api/user'

import { setTimeStamp } from '@/utils/auth'
import { setItem, getItem, removeItem } from '@/utils/storage'

export default {
  namespaced: true,

  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),

  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },

  actions: {
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then((data) => {
            this.commit('user/setToken', data.token)
            router.push('/')
            // 保存登录时间
            setTimeStamp()
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    logout() {
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeItem(TOKEN)
      router.push('/login')
    },

    async getUserInfo() {
      const resp = await getUserInfo()
      this.commit('user/setUserInfo', resp)
      return resp
    }
  }
}
