<script>
import { getUserToken } from './utils/token';
export default {
	onLaunch() {
		console.log('App Launch');
	},
	onShow() {
		let userInfo = getUserToken();
		if (!userInfo) {
			uni.reLaunch({
				url: './pages/login/index'
			});
		}
		console.log('App Show');
	},
	onHide() {
		console.log('App Hide');
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}

/* #endif */
</style>
