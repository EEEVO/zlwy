<template>
	<view class="main">
		<u-cell-group>
			<u-cell-item title="数据质量" :value="dataQuality" :arrow="false" :center="true" :title-style="titleStyle" :value-style="titleStyle" @click="paramList">
				<u-icon slot="right-icon" size="32" name="reload"></u-icon>
			</u-cell-item>
			<u-cell-item v-for="(item, index) of dataList" :key="index" :title="item.name" :value="item.param_value" :center="true" :arrow="false" :use-label-slot="true">
				<view slot="label">更新时间{{ item.time }}</view>
			</u-cell-item>
		</u-cell-group>
		<ourLoading isFullScreen :active="httpStatus" text="loading..." />
	</view>
</template>

<script>
import { deviceDetail, paramList } from '@/api/device.js';
export default {
	data() {
		return {
			httpStatus: true,
			titleStyle: {
				fontSize: '18px'
			},
			deviceId: '',
			dataQuality: '差',
			dataList: []
		};
	},
	onLoad(option) {
		this.deviceId = option.deviceId;
	},
	mounted() {
		// this.deviceDetail();
		this.paramList();
	},
	methods: {
		async deviceDetail() {
			const res = await deviceDetail(this.deviceId);
		},
		async paramList() {
			this.httpStatus = true;
			const res = await paramList(this.deviceId);
			this.dataList = res.result.paramDataList;
			this.dataQuality = res.result.quality;
			setTimeout(() => {
				this.httpStatus = false;
			}, 700);
		}
	}
};
</script>

<style scoped lang="less">
.dataQuality {
	margin: 20px 22px;
}
</style>
