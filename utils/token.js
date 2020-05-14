import {
  dataStroage
} from './common.js'

const TOKEN = 'TOKEN'
const ACCOUNT_ID = 'ACCOUNT_ID'

/**
 * 用户登录信息模块
 */
export const setUserToken = (data) => dataStroage.setStroage(TOKEN, data)

export const getUserToken = () => dataStroage.getStroage(TOKEN)

export const removeUserToken = () => dataStroage.removeStroage(TOKEN)

/**
 * 用户账户模块
 */
export const setAccountId = (data) => dataStroage.setStroage(ACCOUNT_ID, data)

export const getAccountId = () => dataStroage.getStroage(ACCOUNT_ID)
