
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import QiunDataCharts from '@/uni_modules/qiun-data-charts/index.';

Vue.component('qiun-data-charts', QiunDataCharts);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif