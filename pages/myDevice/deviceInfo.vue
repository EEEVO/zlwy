<template>
  <view class="main">
    <view class="data-content">
      <u-cell-group>
        <u-cell-item title="数据质量" :value="dataQuality" :arrow="false" :center="true" :title-style="titleStyle" :value-style="titleStyle" @click="paramList">
          <u-icon slot="right-icon" size="32" name="reload"></u-icon>
        </u-cell-item>
        <u-cell-item v-for="(item, index) of dataList" :key="index" :title="item.name" :value="item.param_value" :center="true" :arrow="false" :use-label-slot="true">
          <view slot="label">更新时间{{ item.time }}</view>
        </u-cell-item>
      </u-cell-group>
    </view>
    <view class="btn-content" v-if="admin === '1'">
      <u-button type="primary" :custom-style="customStyle" @click="goHistoryData">历史数据</u-button>
      <u-button type="success" :custom-style="customStyle" @click="managPersonnel">管理绑定人员</u-button>
    </view>
    <ourLoading isFullScreen :active="httpStatus" text="loading..." />
  </view>
</template>

<script>
import { deviceDetail, paramList } from '@/api/device.js';
export default {
  data() {
    return {
      customStyle: {
        marginBottom: '10px'
      },
      titleStyle: {
        fontSize: '18px'
      },
      httpStatus: true,
      deviceId: '',
      dataQuality: '差',
      dataList: [],

      accountList: [],
      admin: '' // 0-无权限 1-权限
    };
  },
  onLoad(option) {
    this.deviceId = option.deviceId;
  },
  onShow() {
    this.deviceDetail();
    this.paramList();
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
      const res = await deviceDetail(this.deviceId);
      this.admin = res.result.admin;
      this.accountList = res.result.accountList;
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
.main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: space-between;
  .data-content {
    flex: 1;
  }
  .btn-content {
    padding: 0 20px;
  }
}
</style>
