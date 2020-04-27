<template>
  <view class="content">
    <!-- 头部logo -->
    <view class="header"><image :src="logoImage"></image></view>
    <!-- 主体表单 -->
    <view class="main">
      <wInput v-model="phoneData" type="text" maxlength="11" placeholder="手机号"></wInput>
      <wInput v-model="verCode" type="number" placeholder="验证码" isShowCode codeText="获取验证码" setTime="30" ref="runCode" @setCode="getVerCode"></wInput>
    </view>
    <wButton type="default" text="手机验证码登录" :rotate="isRotate" @click.native="startLogin" class="wbutton"></wButton>

    <!-- 其他登录 -->
    <view class="other_login cuIcon">
      <view class="login_icon"><view class="cuIcon-weixin" @tap="login_weixin"></view></view>
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
      //logo图片 base64
      logoImage: '',
      phoneData: '', //用户/电话
      verCode: '', //验证码
      isRotate: false //是否加载旋转
    };
  },

  methods: {
    //自定义事件
    getVerCode() {
      //获取验证码
      console.log('获取验证码');
      //触发倒计时（一般用于请求成功验证码后调用）
      this.$refs.runCode.$emit('runCode');

      //终止倒计时（用于突然需要终止倒计时的场景）
      // this.$refs.runCode.$emit('runCode', 0);
    },
    startLogin() {
      //登录
      if (this.isRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      // TODO:此处使用
      // if (this.phoneData.length !== 11) {
      //   uni.showToast({
      //     icon: 'none',
      //     position: 'bottom',
      //     title: '手机号不正确'
      //   });
      //   return;
      // }
      // if (this.verCode.length !== 6) {
      //   uni.showToast({
      //     icon: 'none',
      //     position: 'bottom',
      //     title: '验证码未输入'
      //   });
      //   return;
      // }
      this.isRotate = true;
      setTimeout(() => {
        this.isRotate = false;
      }, 3000);
      uni.navigateTo({
        url: '../addName/index'
      });
      // uni.showLoading({
      // 	title: '登录中'
      // });
      // getLogin()
      // .then(res => {
      // 	//console.log(res)
      // 	//简单验证下登录（不安全）
      // 	if(_this.phoneData==res.data.username && _this.passData==res.data.password){
      // 		let userdata={
      // 			"username":res.data.username,
      // 			"nickname":res.data.nickname,
      // 			"accesstoken":res.data.accesstoken,
      // 		} //保存用户信息和accesstoken
      // 		_this.$store.dispatch("setUserData",userdata); //存入状态
      // 		try {
      // 			uni.setStorageSync('setUserData', userdata); //存入缓存
      // 		} catch (e) {
      // 			// error
      // 		}
      // 		uni.showToast({
      // 			icon: 'success',
      // 			position: 'bottom',
      // 			title: '登录成功'
      // 		});
      // 		uni.reLaunch({
      // 			url: '../../../pages/index',
      // 		});
      // 	}else{
      // 		_this.passData=""
      // 		uni.showToast({
      // 			icon: 'error',
      // 			position: 'bottom',
      // 			title: '账号或密码错误，账号admin密码admin'
      // 		});
      // 	}
      // 	uni.hideLoading();
      // }).catch(err => {
      // 	uni.hideLoading();
      // })
    },
    login_weixin() {
      //微信登录
      uni.showToast({
        icon: 'none',
        position: 'bottom',
        title: '...'
      });
    }
  }
};
</script>

<style scoped lang="less">
@import url('@/styles/index.less');

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

  /* 其他登录方式 */
  .other_login {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 256upx;
    text-align: center;
    .login_icon {
      border: none;
      font-size: 64upx;
      margin: 0 64upx 0 64upx;
      color: rgba(@mainBgColor, 0.9);
    }
  }

  /* 登录按钮 */
  .wbutton {
    margin-top: 96upx;
  }
}
</style>
