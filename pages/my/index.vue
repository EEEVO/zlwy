<template>
  <view>
    <view class="header" v-bind:class="{ status: isH5Plus }">
      <view class="userinfo">
        <view class="info" v-if="isLogin">
		  <open-data type="userAvatarUrl" class="portrait"></open-data>
		  <view class="userview">
			  <view class="username">{{ userinfo.username }}</view>
			  <view class="integral">{{ userinfo.integral }}</view>
		  </view>
        </view>
        <u-button v-else @click.native="login">点击登录</u-button>
      </view>
    </view>
    <view class="list" v-for="(list, list_i) in severList" :key="list_i">
      <view class="li" v-for="(li, li_i) in list" @tap="toPage(list_i, li_i)" :class="{ noborder: li_i == list.length - 1 }" hover-class="hover" :key="li.name">
        <view class="icon"><image :src="'../../static/personalCenter/sever/' + li.icon"></image></view>
        <view class="text">{{ li.name }}</view>
        <image class="to" src="../../static/personalCenter/to.png"></image>
      </view>
    </view>
  </view>
</template>
<script>
import { getUserToken, getAccountId, removeUserToken } from '@/utils/token.js';
import { dataStroage } from '@/utils/common.js';
import { getDetail } from '@/api/user.js';

export default {
  data() {
    return {
      isLogin: true,
      isH5Plus: false,
      userinfo: {},
      severList: [
        [{ name: '个人资料', icon: 'personalData.png', link: '../userData/index' }, 
			{ name: '我的设备', icon: 'myDevice.png', link: '../myDevice/index' }],
        [{ name: '退出', icon: 'logout.png', link: 'logout' }]
      ]
    };
  },
  onShow() {
    this.init();
  },
  methods: {
    async init() {
      const res = await getDetail();
      if (res.code === 200) {
        this.userinfo = {
          face: res.result.phone,
          username: res.result.nick_name,
          integral: res.result.account_id
        };
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    login() {
      uni.navigateTo({
        url: '../login/index'
      });
    },
    //用户点击列表项
    toPage(list_i, li_i) {
      if (this.severList[list_i][li_i].link === 'logout') {
        dataStroage.closeAllStroage();
        uni.navigateTo({
          url: '../login/index'
        });
        return;
      }
      if (getUserToken()) {
        uni.navigateTo({
          url: this.severList[list_i][li_i].link
        });
      } else {
        uni.showToast({ title: '当前未登录，为您跳转登录后使用' });
        uni.navigateTo({
          url: '../login/index'
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
@import url('@/styles/index.less');
page {
  background-color: #fff;
}
.header {
  &.status {
    padding-top: var(--status-bar-height);
  }
  background-color: @base6;
  width: 92%;
  height: 30vw;
  padding: 0 4%;
  display: flex;
  align-items: center;
  .userinfo {
    width: 90%;
    display: flex;
    .face {
      flex-shrink: 0;
      width: 15vw;
      height: 15vw;
      image {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    .info {
      display: flex;
      padding-left: 30upx;
	  .portrait {
		overflow: hidden;
		display: inline-block;
		width: 120upx;
		height: 120upx;
		/* margin-top: 50rpx; */
		border-radius: 50%;
		border: 2px solid #fff;
		box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
	  }
	  .userview{
		  display: flex;
		  padding-left: 30upx;
		  flex-wrap: wrap;
		  .username {
		    color: #fff;
		    font-size: 40upx;
			width: 100%;
		  }
		  .integral {
		    display: flex;
		    align-items: center;
		    padding: 0 20upx;
		    height: 40upx;
		    color: #fff;
		    background-color: rgba(0, 0, 0, 0.1);
		    border-radius: 20upx;
		    font-size: 24upx;
		  }
	  }
    }
  }
  .setting {
    flex-shrink: 0;
    width: 6vw;
    height: 6vw;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
.hover {
  background-color: #eee;
}

.list {
  width: 100%;
  border-bottom: solid 26upx #f1f1f1;
  .li {
    width: 92%;
    height: 100upx;
    padding: 0 4%;
    border-bottom: solid 1upx #e7e7e7;
    display: flex;
    align-items: center;
    &.noborder {
      border-bottom: 0;
    }
    .icon {
      flex-shrink: 0;
      width: 50upx;
      height: 50upx;
      image {
        width: 50upx;
        height: 50upx;
      }
    }
    .text {
      padding-left: 20upx;
      width: 100%;
      color: #666;
    }
    .to {
      flex-shrink: 0;
      width: 40upx;
      height: 40upx;
    }
  }
}

.wbutton {
  height: 90upx;
  width: 260upx;
  // /deep/ .dlbutton {

  // }
}
</style>