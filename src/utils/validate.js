// 判断是否为外部资源
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 密码校验
export function validatePassword() {
  return (rule, value, callback) => {
    if (!value) {
      callback(new Error('密码必填'))
    } else {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
  }
}
