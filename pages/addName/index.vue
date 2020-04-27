<template>
  <view class="content">
    <view class="header"><image :src="logoImage"></image></view>
    <view class="main"><wInput v-model="name" type="text" placeholder="姓名"></wInput></view>
    <wButton text="注册" :rotate="isRotate" @click.native="startLogin" class="wbutton"></wButton>
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
      logoImage: '',
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
          title: '姓名必须填写'
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
    }
  }
};
</script>

<style scoped lang="less">
@import url('@/styles/index.less');
@import url('@/components/watch-login/css/icon.css');

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;

  /* 头部 logo */
  .header {
    width: 161upx;
    height: 161upx;
    box-shadow: 0upx 0upx 60upx 0upx rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    margin-top: 128upx;
    margin-bottom: 72upx;
    margin-left: auto;
    margin-right: auto;
  }
  .header image {
    width: 161upx;
    height: 161upx;
    border-radius: 50%;
  }

  /* 主体 */
  .main {
    display: flex;
    flex-direction: column;
    padding-left: 70upx;
    padding-right: 70upx;
  }

  /* 登录按钮 */
  .wbutton {
    margin-top: 96upx;
  }
}
</style>
