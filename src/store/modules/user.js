import md5 from 'md5'
import router from '@/router/index'
import { login, getUserInfo } from '@/api/user'
import { TOKEN } from '@/constant/index'
import { setItem, getItem } from '@/utils/storage'

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
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    async getUserInfo() {
      const resp = await getUserInfo()
      this.commit('user/setUserInfo', resp)
      return resp
    }
  }
}
