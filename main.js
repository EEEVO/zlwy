import Vue from 'vue'
import App from './App'
import uView from "./uview-ui/index.js";
import ourLoading from '@/components/our-loading/our-loading.vue'
Vue.component('ourLoading', ourLoading)

Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
