// 判断是否为外部资源
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 密码校验
export function validatePassword(i18n) {
  return (rule, value, callback) => {
    if (!value) {
      callback(new Error(i18n.t('msg.login.passwordRule1')))
    } else {
      if (value.length < 6) {
        callback(new Error(i18n.t('msg.login.passwordRule2')))
      } else {
        callback()
      }
    }
  }
}
