<template>
  <view>
    <view class="main" @click="toDeviceInfo">
      <view class="text-content">
        <view class="device-name">{{ item.name }}</view>
        <!-- <view class="device-time">设备编号：{{ item.id }}</view> -->
        <view class="device-time">服务有效期至: {{ item.end_time }}</view>
      </view>
      <tki-qrcode @click.native.stop="imgClick" @result="result" v-if="item.admin === 1" ref="qrcode" :cid="item.id" :val="item.id" loadMake :size="70" unit="px" />
    </view>
    <u-mask :show="show" @click="show = false">
      <view class="warp"><image :src="curUrl"></image></view>
    </u-mask>
  </view>
</template>

<script>
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';

export default {
  components: { tkiQrcode },
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
  data() {
    return {
      curUrl: '',
      show: false
    };
  },
  methods: {
    imgClick() {
      this.show = true;
    },
    result(res) {
      this.curUrl = res;
    },
    toDeviceInfo() {
      uni.navigateTo({
        url: `./deviceInfo?deviceId=${this.item.id}`
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

.warp {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  image {
    width: 70vw;
    height: 70vw;
  }
}
</style>
