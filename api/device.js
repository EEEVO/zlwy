import http from '@/utils/request.js'

/**
 * 添加设备
 * @param {string}
 */
export const newBind = (device_id) => {
	return http.post('v1/device/newBind', {
		device_id
	})
}

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
 * 删除设备
 * @param {string}
 */
export const delDevice = (device_id) => {
	return http.post('/v1/device/delDevice', {
		device_id
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

/**
 * 查看指定参数详情
 * @param {string} device_id 设备ID
 */
export const paramData = (param_code) => {
	return http.get('v1/mine/param', {
		params: {
			param_code
		}
	})
}

/**
 * 获取查询历史条件数据
 * @param {string} device_id 设备ID
 */
export const historyCond = (device_id) => {
	return http.get('v1/mine/historyCond', {
		params: {
			device_id
		}
	})
}

/**
 * 获取折线图数据
 * @param {string} device_id 设备ID
 */
export const historyQuery = (device_id, duration, endTime, paramCode) => {
	return http.get('v1/mine/historyQuery', {
		params: {
			device_id,
			duration,
			endTime,
			paramCode
		}
	})
}

/**
 * 获取折线图数据
 * @param {string} device_id 设备ID
 */
export const modifyBind = (device_id, uids) => {
	return http.post('v1/device/modifyBind', {
		device_id,
		uids
	})
}

/**
 * 获取数据模型明细
 */
export const modeDetail = (modeId) => {
	return http.get('v1/device/modeDetail', {
		params: {
			modeId
		}
	})
}

/**
 * 修改参数值
 */
export const modifyParam = (deviceId, paramCode, paramValue) => {
	return http.post('/v1/device/modifyParam', {
		deviceId,
		paramCode,
		paramValue
	})
}