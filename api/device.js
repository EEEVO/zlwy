import http from '@/utils/request.js'

/**
 * 查询设备列表
 * @param {Object} admin 0-全部设备 1-我管理的设备
 */
export const listDevices = (admin) => {
  return http.get('v1/mine/listDevices', {
    params: {
      admin
    }
  })
}
