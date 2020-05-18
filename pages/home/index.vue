<template>
  <view class="content">
    <view class="header"></view>
    <view class="main"><wInput v-model="deviceId" type="text" placeholder="请输入设备号"></wInput></view>
    <view class="btn-content">
      <wButton text="扫码添加" @click.native="scanCode" class="wbutton" bgColor="#adc6ff"></wButton>
      <wButton text="添加设备" :rotate="isRotate" @click.native="addDevice" class="wbutton"></wButton>
    </view>
  </view>
</template>

<script>
import wInput from '@/components/watch-login/watch-input.vue'; //input
import wButton from '@/components/watch-login/watch-button.vue'; //button
import { newBind } from '@/api/device.js'; //button

export default {
  components: {
    wInput,
    wButton
  },
  data() {
    return {
      deviceId: '',
      isRotate: false //是否加载旋转
    };
  },

  methods: {
    async addDevice() {
      //登录
      if (this.isRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      if (this.deviceId.length === '') {
        uni.showToast({
          icon: 'none',
          position: 'bottom',
          title: '设备号必须填写'
        });
        return;
      }
      this.isRotate = true;
      const res = await newBind(this.deviceId);
      uni.showToast({
        icon: 'none',
        title: res.message
      });
      setTimeout(() => {
        this.isRotate = false;
      }, 3000);
    },
    scanCode() {
      // 允许从相机和相册扫码
      uni.scanCode({
        success(res) {
          this.deviceId = res.result;
          if (this.deviceId) {
            this.addDevice();
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
@import url('@/styles/index.less');
@import url('@/components/watch-login/css/icon.css');

@paddingLR: 70upx;

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;

  /* 头部 logo */
  .header {
    width: 161upx;
    height: 161upx;
    border-radius: 50%;
    margin: 40upx auto;
  }

  /* 主体 */
  .main {
    display: flex;
    flex-direction: column;
    padding-left: @paddingLR;
    padding-right: @paddingLR;
  }

  .btn-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 96upx;
    padding-left: @paddingLR;
    padding-right: @paddingLR;
    .wbutton {
      /deep/ .dlbutton {
        height: 90upx;
        width: 260upx;
      }
    }
  }
}
</style>
