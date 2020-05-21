<template>
  <view>
    <u-cell-group>
      <u-swipe-action :show="item.show" :index="index" v-for="(item, index) in accountList" :key="item.id" @click="click" :options="options">
        <u-cell-item :title="item.title" :value="item.account_id" :arrow="false"></u-cell-item>
      </u-swipe-action>
    </u-cell-group>
    <u-top-tips ref="uTips"></u-top-tips>
  </view>
</template>

<script>
import { modifyBind } from '@/api/device.js';

export default {
  data() {
    return {
      deviceId: '',
      accountList: [],
      options: [
        {
          text: '删除',
          style: {
            backgroundColor: '#dd524d'
          }
        }
      ]
    };
  },
  onLoad(option) {
    console.log(option);
    this.deviceId = option.deviceId;
    this.accountList = JSON.parse(option.accountList).map(item => {
      return {
        id: item.account_id,
        title: item.nick_name,
        show: false
      };
    });
  },
  mounted() {
    this.$refs.uTips.show({
      title: '滑动人员模块进行删除 ',
      type: 'success',
      duration: '5000'
    });
  },
  methods: {
    async click(index) {
      const uids = [this.accountList[index].id];
      const res = await modifyBind(this.deviceId, uids);
      if (res.code === 200) {
        this.$u.toast('删除成功');
        this.accountList.splice(index, 1);
      } else {
        this.$u.toast(res.message);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.u-card-wrap {
  background-color: $u-bg-color;
  padding: 1px;
}

.u-body-item {
  font-size: 32rpx;
  color: #333;
  padding: 20rpx 10rpx;
}
</style>
