<template>
  <view class="content">
    <view class="header"></view>
    <view class="main"><wInput v-model="nick_name" type="text" placeholder="请输入姓名"></wInput></view>
    <view class="btn-content"><wButton text="保存" :rotate="isRotate" @click.native="updateProperty" class="wbutton"></wButton></view>
  </view>
</template>

<script>
import wInput from '@/components/watch-login/watch-input.vue'; //input
import wButton from '@/components/watch-login/watch-button.vue'; //button
import { updateProperty } from '@/api/user.js'; //button

export default {
  components: {
    wInput,
    wButton
  },
  data() {
    return {
      nick_name: '',
      isRotate: false //是否加载旋转
    };
  },
  methods: {
    async updateProperty() {
      const res = await updateProperty(this.nick_name);
      if (res.code === 200) {
        uni.showToast({
          position: 'bottom',
          title: res.message
        });
        uni.navigateBack();
      } else {
        uni.showToast({
          icon: '',
          position: 'bottom',
          title: res.message
        });
      }
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
