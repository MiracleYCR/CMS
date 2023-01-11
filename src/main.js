import { createApp } from 'vue'

import i18n from './i18n'
import store from './store'
import router from './router'
import '@/router/permission'

import App from './App.vue'

import '@/styles/index.scss'
import installIcons from '@/icons/index'
import installElementPlus from './plugins/element'

const app = createApp(App)
installElementPlus(app)
installIcons(app)

app.use(i18n).use(store).use(router).mount('#app')
