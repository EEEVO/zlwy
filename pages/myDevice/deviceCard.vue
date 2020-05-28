<template>
  <view>
    <u-swipe-action :show="item.show" @click="click" @content-click="toDeviceInfo" :options="options" :vibrate-short="true">
      <view class="main">
        <view class="text-content">
          <view class="device-name">{{ item.name }}</view>
          <view class="device-time">服务有效期至: {{ item.end_time }}</view>
        </view>
        <tki-qrcode @click.native.stop="imgClick" @result="result" v-if="item.admin === 1" ref="qrcode" :cid="item.id" :val="item.id" loadMake :size="70" unit="px" />
      </view>
    </u-swipe-action>
    <u-mask :show="show" @click="show = false">
      <view class="warp"><image :src="qrImageUrl"></image></view>
    </u-mask>
    <u-modal v-model="deleteShow" :content="content" @cancel="modalCancel" :async-close="true" @confirm="confirm" :show-cancel-button="true"></u-modal>
  </view>
</template>

<script>
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
import { delDevice } from '@/api/device.js';

// TODO:1、删除完成后卡片列表状态有误；2、打开侧边操作之后，点击内容不能先关闭，再次点击在跳转
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
      qrImageUrl: '',
      show: false,

      options: [
        {
          text: '删除',
          style: {
            backgroundColor: '#dd524d'
          }
        }
      ],
      /**
       * 删除模态框
       */
      deleteShow: false
    };
  },
  methods: {
    imgClick() {
      this.show = true;
    },
    // 二维码产生成功
    result(res) {
      this.qrImageUrl = res;
    },
    click(index) {
      this.deleteShow = true;
    },
    async confirm() {
      const res = await delDevice(this.item.id);
      if (res.code === 200) {
        this.$u.toast('删除成功');
        this.$emit('del');
        setTimeout(() => {
          // 3秒后自动关闭
          this.deleteShow = false;
        }, 300);
      } else {
        this.$u.toast(res.message);
      }
    },
    toDeviceInfo() {
      uni.navigateTo({
        url: `./deviceInfo?deviceId=${this.item.id}`
      });
    },
    modalCancel() {
      this.currDeviceList[this.currDeviceIndex].show = false;
    }
  },
  computed: {
    content() {
      return `请确定删除 ${this.item.name}吗?`;
    }
  }
};
</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
