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
import { loginWithName } from '@/api/user.js';
import { setUserToken, setAccountId } from '@/utils/token.js';

export default {
  components: {
    wInput,
    wButton
  },
  data() {
    return {
      logoImage: '',
      name: '',
      userInfo: '',
      isRotate: false //是否加载旋转
    };
  },
  onLoad(option) {
    this.userInfo = option;
    console.log(option); //打印出上个页面传递的参数。
  },
  methods: {
    async startLogin() {
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
      const res = await loginWithName(this.userInfo.phone, this.userInfo.verCode, this.name);
	  if (res.code === 200) {
	    uni.showToast({
	      icon: 'success',
	      position: 'bottom',
	      title: '注册成功'
	    });
	    // 保存用户信息
	    setUserToken(res.result.access_token);
	    setAccountId(res.result.account_id);
	    uni.switchTab({
	      url: '/pages/my/index'
	    });
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
