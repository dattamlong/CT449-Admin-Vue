import Antd from 'ant-design-vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Default from './layouts/Default.vue'
import './scss/app.scss'

const app = createApp(App)

//adding template layouts to vue component
app.component('layout-default', Default)

app.use(Antd)
app.use(createPinia())
app.use(router)

app.mount('#app')
