import http from '@/utils/request.js'

/**
 * 获取短信验证码
 * @param {Object} phoneNo
 */
export const verificationMsg = (phoneNo) => {
  return http.get('v1/account/getVerificationMsg', {
    params: {
      phoneNo
    }
  })
}

/**
 * 不带用户名登录
 * @param {string} phoneNo 电话号码
 * @param {string} verificationMsg 验证码
 */
export const login = (phoneNo, verificationMsg) => {
  return http.post('v1/account/login', {
    phoneNo,
    verificationMsg
  })
}


/**
 * 带用户名登录
 * @param {string} phoneNo 电话号码
 * @param {string} verificationMsg 验证码
 * @param {string} nick_name 用户名
 */
export const loginWithName = (phoneNo, verificationMsg, nick_name) => {
  return http.post('v1/account/loginWithName', {
    phoneNo,
    verificationMsg,
    nick_name
  })
}

/**
 * 修改账户属性
 * @param {string} nick_name 用户名
 */
export const updateProperty = (nick_name) => {
  return http.post('v1/account/updateProperty', {
    nick_name
  })
}

/**
 * 获取账号详情
 * @param {string} nick_name 用户名
 */
export const getDetail = () => {
  return http.get('v1/account/getDetail')
}
