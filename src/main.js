import { createApp } from 'vue'

import router from './router'
import '@/router/permission'

import store from './store'

import App from './App.vue'

import '@/styles/index.scss'
import installIcons from '@/icons/index'
import installElementPlus from './plugins/element'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
app.use(store).use(router).mount('#app')
