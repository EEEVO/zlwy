// const socketBase = 'ws://wx.zinlin.cn';
const socketBase = 'ws://127.0.0.1:9194';
export const initSocket = (obj) => {
	let socketUrl = socketBase + obj.url;
	console.log('socketUrl:' + socketUrl);

	let socketTask = uni.connectSocket({
		url: socketUrl,
		complete : ()=> {
			//console.log('调用建立连接完成');
		},
		success : (e)=> {
			//console.log('调用建立连接成功');
		},
		fail : ()=> {
			//console.log('调用建立连接成功');
		}
	});
	if(obj.onSocketOpen != null){
		uni.onSocketOpen(function (res) {
			obj.onSocketOpen(res);
		});
	}
	if(obj.onSocketError != null){
		uni.onSocketError(function (res) {
			obj.onSocketError(res);
		});
	}
	if(obj.onSocketMessage != null){
		uni.onSocketMessage(function (res) {
			obj.onSocketMessage(res);
		});
	}
	if(obj.onSocketClose != null){
		uni.onSocketClose(function (res) {
			obj.onSocketClose(res);
		});
	}
	if(obj.onSocketError != null){
		uni.onSocketError(function (res) {
			obj.onSocketError(res);
		});
	}
	return socketTask;
}