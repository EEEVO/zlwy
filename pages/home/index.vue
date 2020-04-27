<template>
  <view class="content">
    <view class="header"></view>
    <view class="main"><wInput v-model="name" type="text" placeholder="请输入设备号"></wInput></view>
    <view class="btn-content">
      <wButton text="添加设备" :rotate="isRotate" @click.native="startLogin" class="wbutton"></wButton>
      <wButton text="扫码添加" @click.native="scanCode" class="wbutton" bgColor="#adc6ff"></wButton>
    </view>
  </view>
</template>

<script>
import wInput from '@/components/watch-login/watch-input.vue'; //input
import wButton from '@/components/watch-login/watch-button.vue'; //button

export default {
  components: {
    wInput,
    wButton
  },
  data() {
    return {
      name: '',
      isRotate: false //是否加载旋转
    };
  },

  methods: {
    startLogin() {
      //登录
      if (this.isRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      if (this.name.length === '') {
        uni.showToast({
          icon: 'none',
          position: 'bottom',
          title: '设备号必须填写'
        });
        return;
      }
      this.isRotate = true;
      setTimeout(() => {
        this.isRotate = false;
      }, 3000);
      uni.switchTab({
        url: '/pages/home/index'
      });
    },
    scanCode() {
      // 允许从相机和相册扫码
      uni.scanCode({
        success(res) {
          console.log('条码类型：' + res.scanType);
          console.log('条码内容：' + res.result);
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
