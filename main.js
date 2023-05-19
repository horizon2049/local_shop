// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 引入配置网络请求
import './utils/request.js'
// 引入消息封装
import './utils/showMsg.js'
//  导入 store 的实例对象
import store from './store/store.js'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif