import Request from '@/js-sdk/luch-request/index.js' // 下载的插件
import {
	getUserToken,
	removeUserToken
} from './token.js'

const http = new Request();

http.setConfig((config) => {
	config.baseUrl = 'https://zinlin.cn/zleq/';
	return config
})

http.validateStatus = (statusCode) => {
	return statusCode && statusCode >= 200 && statusCode < 300
}

http.interceptor.request((config, cancel) => {
	/* cancel 为函数，如果调用会取消本次请求。需要注意：调用cancel,本次请求的catch仍会执行。必须return config */
	console.log("getUserToken()", getUserToken())
	config.header = {
		...config.header,
		Authorization: getUserToken()
	}
	// 演示custom 用处
	// if (config.custom.auth) {
	//   config.header.token = 'token'
	// }

	// 如果token不存在，调用cancel 会取消本次请求，不会进入响应拦截器，但是该函数的catch() 仍会执行
	// if (!getUserToken()) {
	// 	cancel('token 不存在', config) //  把修改后的config传入，之后响应就可以拿到修改后的config。 如果调用了cancel但是不传修改后的config，则catch((err) => {}) err.config 为request拦截器修改之前的config
	// 	removeUserToken()
	// }
	return config
})

http.interceptor.response((response) => {
	/* 对响应成功做点什么 （statusCode === 200），必须return response*/
	// 服务端返回的状态码不等于200，则reject()
	if (response.data.code === 10004) {
		removeUserToken()
	}
	return response.data
}, (response) => {
	/*  对响应错误做点什么 （statusCode !== 200），必须return response*/
	console.log(response)
	return response
})

export default http
