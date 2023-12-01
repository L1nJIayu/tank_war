
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './styles/common.less'
import './assets/iconfont/iconfont.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')