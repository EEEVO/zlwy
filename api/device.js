import http from '@/utils/request.js'

/**
 * 查询设备列表
 * @param {string} admin 0-全部设备 1-我管理的设备
 */
export const listDevices = (admin) => {
  return http.get('v1/mine/listDevices', {
    params: {
      admin
    }
  })
}

/**
 * 查看设备 人员详情
 * @param {string} device_id 设备ID
 */
export const deviceDetail = (device_id) => {
  return http.get('v1/mine/deviceDetail', {
    params: {
      device_id
    }
  })
}

/**
 * 查看设备数据详情
 * @param {string} device_id 设备ID
 */
export const paramList = (device_id) => {
  return http.get('v1/mine/paramList', {
    params: {
      device_id
    }
  })
}
