import { createApp } from 'vue'

import i18n from './i18n'
import store from './store'
import router from './router'
import '@/router/permission'

import App from './App.vue'
import SvgIcon from '@/components/svgIcon'

import '@/styles/index.scss'
import installIcons from '@/icons/index'
import installElementPlus from './plugins/element'

// 全局属性
import { registerPrint, registerFilter } from '@/utils/globals'

const app = createApp(App)

// 导入 element-plus
installElementPlus(app)
// 导入 icon
installIcons(app)
// 注册打印插件
registerPrint(app)
// 注册全局过滤属性
registerFilter(app)
// 注册全局组件
app.component('SvgIcon', SvgIcon)

app.use(i18n).use(store).use(router).mount('#app')
