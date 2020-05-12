<template>
	<view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#597ef7"></uni-segmented-control>
		<view class="content">
			<view v-show="current === 0"><deviceCard v-for="(item, index) of currDeviceList" :key="index" :item="item"></deviceCard></view>
			<view v-show="current === 1"><deviceCard v-for="(item, index) of currDeviceList" :key="index" :item="item"></deviceCard></view>
		</view>
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
			items: ['全部设备', '个人设备'],
			current: 0,
			currDeviceList: [] // 当前设备列表
		};
	},
	onLoad() {
		//加载
		this.listDevices();
	},
	methods: {
		onClickItem(e) {
			console.log(e);
			this.current = e.currentIndex;
		},
		async listDevices() {
			const res = await listDevices(this.current);
			this.currDeviceList = [
				{
					id: '23445446',
					name: '测试设备',
					end_time: '2020-01-01',
					admin: '0'
				}
			];
			// this.currDeviceList = res.result;
		}
	},
	watch: {
		current() {
			this.listDevices();
		}
	}
};
</script>
