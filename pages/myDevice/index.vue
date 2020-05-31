<template>
  <view>
    <u-sticky offset-top="0">
      <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#597ef7"></uni-segmented-control>
    </u-sticky>
    <deviceCard v-for="(item, index) of currDeviceList" :key="item.id" :item="item" @del="delDevice"></deviceCard>
    <ourLoading isFullScreen :active="httpStatus" text="loading..." />
	<u-top-tips ref="uTips"></u-top-tips>
  </view>
</template>

<script>
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
import deviceCard from './deviceCard.vue';
import { listDevices, delDevice } from '@/api/device.js';

export default {
  components: { uniSegmentedControl, deviceCard },
  data() {
    return {
      httpStatus: true,
      items: ['全部设备', '个人设备'],
      current: 0,
      currDeviceList: [] // 当前设备列表
    };
  },
  onShow() {
    //加载
    this.listDevices();
  },
  mounted() {
  	this.$refs.uTips.show({
  		title: '滑动设备模块进行删除 ',
  		type: 'success',
  		duration: '2000'
  	});
  },
  methods: {
    onClickItem(e) {
      this.current = e.currentIndex;
    },

    async listDevices() {
      this.httpStatus = true;
      const res = await listDevices(this.current);
      setTimeout(() => {
        this.httpStatus = false;
      }, 700);
      this.currDeviceList = res.result;
    },
    delDevice() {
      this.listDevices();
    }
  },
  watch: {
    current() {
      this.listDevices();
    }
  }
};
</script>
