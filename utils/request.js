import Request from '@/js-sdk/luch-request/index.js' // 下载的插件

const http = new Request({
  baseUrl: '',
  dataType: 'json',
  responseType: 'text',
  // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
  custom: {}, // 全局自定义参数默认值
  timeout: 30000,
  // #ifdef H5
  // 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
  withCredentials: false,
  // #endif

  // 局部优先级高于全局，返回当前请求的task,options。请勿在此处修改options。非必填
  // getTask: (task, options) => {
  // 相当于设置了请求超时时间500ms
  //   setTimeout(() => {
  //     task.abort()
  //   }, 500)
  // }
});


http.validateStatus = (statusCode) => {
  return statusCode && statusCode >= 200 && statusCode < 300
}


http.interceptor.request((config, cancel) => { /* cancel 为函数，如果调用会取消本次请求。需要注意：调用cancel,本次请求的catch仍会执行。必须return config */
  config.header = {
    ...config.header,
    a: 1 // 演示拦截器header加参
  }
  // 演示custom 用处
  // if (config.custom.auth) {
  //   config.header.token = 'token'
  // }
  /**
  /* 演示cancel 函数
  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，不会进入响应拦截器，但是该函数的catch() 仍会执行
    cancel('token 不存在', config) //  把修改后的config传入，之后响应就可以拿到修改后的config。 如果调用了cancel但是不传修改后的config，则catch((err) => {}) err.config 为request拦截器修改之前的config
  }
  **/
  return config
})

http.interceptor.response((response) => { /* 对响应成功做点什么 （statusCode === 200），必须return response*/
  //  if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
  //    return Promise.reject(response) // return Promise.reject 可使promise状态进入catch
  // if (response.config.custom.verification) { // 演示自定义参数的作用
  //   return response.data
  // }
  console.log(response)
  return response
}, (response) => { /*  对响应错误做点什么 （statusCode !== 200），必须return response*/
  console.log(response)
  return response
})
