<template>
  <view class="main">
    <view class="data-content">
      <u-cell-group>
        <u-cell-item :arrow="false" :title="deviceName" :center="true" :title-style="titleStyle" @click="update">
          <view slot="right-icon" class="title">
            <view slot="label">数据质量：<u-tag :text="dataQuality" mode="dark" :type="type" /><u-icon size="40" name="reload"></u-icon></view>
          </view>
        </u-cell-item>
        <u-cell-item v-for="(item, index) of dataList" :key="index" :title="item.name" :value="item.param_value" :center="true" :arrow="false" :use-label-slot="true">
		  <u-icon slot="icon" size="34" name="tags" color="#2f54eb"></u-icon>
          <view slot="label">刷新时间：{{ item.time }}</view>
        </u-cell-item>
      </u-cell-group>
    </view>
    <view class="btn-content" v-if="admin === '1'"><u-button type="success" :custom-style="customStyle" @click="managPersonnel">管理绑定人员</u-button></view>
    <view class="btn-content" v-if="history_flag === '2'"><u-button type="primary" :custom-style="customStyle" @click="goHistoryData">历史数据</u-button></view>
    <view class="btn-content" v-if="history_flag === '1' && admin === '1'"><u-button type="primary" :custom-style="customStyle" @click="goHistoryData">历史数据</u-button></view>
    <ourLoading isFullScreen :active="httpStatus" text="loading..." />
  </view>
</template>

<script>
import { deviceDetail, paramList } from '@/api/device.js';
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
      history_flag: '' //历史数据查看权限，1仅管理员可看，2所有用户可看
    };
  },
  onLoad(option) {
    this.deviceId = option.deviceId;
  },
  onShow() {
    this.paramList();
    this.setIntervalObj = setInterval(() => {
      this.paramList();
    }, 3000);
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
    goHistoryData() {
      uni.navigateTo({
        url: `./historicalData?deviceId=${this.deviceId}`
      });
    },
    managPersonnel() {
      uni.navigateTo({
        url: `./personnelManagement?accountList=${JSON.stringify(this.accountList)}&deviceId=${this.deviceId}`
      });
    },
    async deviceDetail() {
      this.httpStatus = true;
      const res = await deviceDetail(this.deviceId);
	  this.httpStatus = false;
      this.admin = res.result.admin;
      this.accountList = res.result.accountList;
      this.history_flag = res.result.history_flag;
	  this.deviceName = res.result.name;
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
    font-size: 16px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
  }
}
</style>
