const getters = {
  // 鉴权
  token: (state) => state.user.token,
  // 是否存在用户信息
  hasUserInfo: (state) => JSON.stringify(state.user.userInfo) !== '{}',
  // 用户信息
  userInfo: (state) => state.user.userInfo
}

export default getters
