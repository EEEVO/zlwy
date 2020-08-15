<template>
	<view class="main">
		<view class="data-content">
			<u-cell-group>
				<u-cell-item :arrow="false" :center="true" :title-style="titleStyle" @click="update">
					<view slot="title">{{ deviceName }}
						<u-icon size="40" style="margin-left: 30upx;" name="reload"></u-icon>
					</view>
					<view slot="right-icon" class="title">
						<view slot="label">数据质量：
							<u-tag :text="dataQuality" mode="dark" :type="type" />
						</view>
					</view>
				</u-cell-item>
				<u-cell-item @click="goHistoryData(item.param_code, item.name)" :index="index" v-for="(item, index) of dataList" :value="item.param_value" :center="true" :key="index" :title-style="{'color':'#424242'}">
					<view slot="title">{{ item.name }}</view>
					<view slot="label">{{ item.time }}</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="btn-content" v-if="admin === '1'">
			<u-button type="success" :custom-style="customStyle" @click="managPersonnel">管理绑定人员</u-button>
		</view>
		<ourLoading isFullScreen :active="httpStatus" text="loading..." />
	</view>
</template>

<script>
	import {
		deviceDetail,
		paramList
	} from '@/api/device.js';
	export default {
		data() {
			return {
				setIntervalObj: null,
				customStyle: {
					marginBottom: '10px'
				},
				titleStyle: {
					fontSize: '16px'
				},
				httpStatus: true,
				deviceId: '',
				dataQuality: '差',
				dataList: [],

				deviceName: '',
				accountList: [],
				admin: '', // 0-无权限 1-权限
				modifyShow: false,
				paramCode: '' //当前点选的参数code
			};
		},
		onLoad(option) {
			this.deviceId = option.deviceId;
		},
		onShow() {
			this.paramList();
			this.setIntervalObj = setInterval(() => {
				this.paramList();
			}, 2000);
			this.deviceDetail();
		},
		onHide() {
			clearInterval(this.setIntervalObj);
			this.setIntervalObj = null;
		},
		onUnload() {
			clearInterval(this.setIntervalObj);
			this.setIntervalObj = null;
		},
		computed: {
			type() {
				switch (this.dataQuality) {
					case '差':
						return 'warning';
					case '良好':
						return 'success';
				}
			}
		},
		methods: {
			goHistoryData(paramCode, paramName) {
				uni.navigateTo({
					url: `./historicalData?deviceId=${this.deviceId}&paramCode=` + paramCode + `&paramName=` + paramName
				});
			},
			managPersonnel() {
				uni.navigateTo({
					url: `./personnelManagement?deviceId=${this.deviceId}`
				});
			},
			async deviceDetail() {
				this.httpStatus = true;
				const res = await deviceDetail(this.deviceId);
				this.httpStatus = false;
				this.admin = res.result.admin;
				this.accountList = res.result.accountList;
				this.deviceName = res.result.detail;
			},
			update() {
				this.httpStatus = true;
				this.paramList();
			},
			async paramList() {
				const res = await paramList(this.deviceId);
				this.dataList = res.result.paramDataList.map(item => {
					return {
						...item,
						param_value: `${item.param_value}${item.unit}`
					};
				});
				this.dataQuality = res.result.quality;
				this.httpStatus = false;
			}
		}
	};
</script>

<style scoped lang="less">
	.main {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.data-content {
			flex: 1;
		}

		.btn-content {
			padding: 0 20px;
		}

		.title {
			display: flex;
			align-items: center;
			flex-direction: row-reverse;
		}

		/deep/.u-cell__value {
			// font-size: 14px;
			display: flex;
			align-items: center;
			flex-direction: row-reverse;
		}

		/deep/.u-cell__right-icon-wrap {
			margin-top: 20upx;
		}
	}
</style>
