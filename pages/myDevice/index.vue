<template>
	<view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#597ef7"></uni-segmented-control>
		<view class="content">
			<view v-show="current === 0"><deviceCard v-for="(item, index) of currDeviceList" :key="index" :item="item"></deviceCard></view>
			<view v-show="current === 1"><deviceCard v-for="(item, index) of currDeviceList" :key="index" :item="item"></deviceCard></view>
		</view>
		<ourLoading isFullScreen :active="httpStatus" text="loading..." />
	</view>
</template>

<script>
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
import deviceCard from './deviceCard.vue';
import { listDevices } from '@/api/device.js';

export default {
	components: { uniSegmentedControl, deviceCard },
	data() {
		return {
			httpStatus: true,
			items: ['全部设备', '个人设备'],
			current: 0,
			currDeviceList: [] // 当前设备列表
		};
	},
	onShow() {
		//加载
		this.listDevices();
	},
	methods: {
		onClickItem(e) {
			console.log(e);
			this.current = e.currentIndex;
		},
		async listDevices() {
			this.httpStatus = true;
			const res = await listDevices(this.current);
			setTimeout(() => {
				this.httpStatus = false;
			}, 700);
			this.currDeviceList = res.result;
		}
	},
	watch: {
		current() {
			this.listDevices();
		}
	}
};
</script>
