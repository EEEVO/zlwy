<template>
  <view class="main" @click="toDeviceInfo">
    <view class="text-content">
      <view class="device-name">{{ item.name }}</view>
      <view class="device-time">设备编号：{{ item.id }}</view>
      <view class="device-time">服务有效期至: {{ item.end_time }}</view>
    </view>
    <canvas
      canvas-id="qrcode"
      style="height: 80px;
              width: 80px;"
    />
  </view>
</template>

<script>
import uQRCode from '@/js-sdk/Sansnn-uQRCode/uqrcode.js';

export default {
  props: {
    item: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function() {
        return {
          id: '23445446',
          name: '测试设备',
          end_time: '2020-01-01',
          admin: '0'
        };
      }
    }
  },
  mounted() {
    this.make();
  },
  methods: {
    toDeviceInfo() {
      uni.navigateTo({
        url: `./deviceInfo?deviceId=${this.item.id}`,
      });
    },
    make() {
      uQRCode.make({
        canvasId: 'qrcode',
        componentInstance: this,
        text: this.item.id,
        size: 80,
        margin: 10,
        backgroundColor: '#ffffff',
        foregroundColor: '#000000',
        fileType: 'png',
        correctLevel: uQRCode.defaults.correctLevel,
        success: res => {
          console.log(res);
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.main {
  width: calc(100% - 40px);
  height: 100px;
  margin: 20px 20px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 2.5px 4.33px 5px 0px rgba(0, 0, 0, 0.25);
  .text-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    .device-name {
      font-size: 18px;
      font-weight: 700;
      color: #758b9b;
    }
    .device-time {
      font-size: 14px;
      color: #999999;
    }
  }
  .qr-content {
    height: 80px;
    width: 80px;
  }
}
</style>
