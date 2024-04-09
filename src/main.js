import Antd from 'ant-design-vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Particles from '@tsparticles/vue3'

import App from './App.vue'
import router from './router'
import Default from './layouts/Default.vue'
import { loadSlim } from '@tsparticles/slim'
import DashboardLayout from './layouts/Dashboard.vue'

import './scss/app.scss'

const app = createApp(App)

//adding template layouts to vue component
app.component('layout-default', Default)
app.component('layout-dashboard', DashboardLayout)

app.use(Particles, {
  init: async (engine) => {
    await loadSlim(engine)
  }
})

app.use(Antd)
app.use(createPinia())
app.use(router)

app.mount('#app')
