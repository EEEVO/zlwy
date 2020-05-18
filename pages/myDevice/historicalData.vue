<template>
  <view>
    <u-cell-group>
      <u-field
        @click="showAction('duration', 'durationList')"
        v-model="duration"
        :disabled="true"
        label="时间间隔"
        placeholder="请选择时间间隔"
        right-icon="arrow-down-fill"
      ></u-field>
      <u-field @click="showAction('param', 'paramList')" v-model="param" :disabled="true" label="参数" placeholder="请选择参数" right-icon="arrow-down-fill"></u-field>
    </u-cell-group>
    <u-action-sheet :list="selectList" @click="actionClick" v-model="show"></u-action-sheet>
  </view>
</template>

<script>
import { historyCond, historyQuery } from '@/api/device.js';
export default {
  data() {
    return {
      deviceId: '',

      durationCode: '',
      duration: '', //时间间隔
      durationList: [],

      endTime: '', // 截止时间

      paramCode: '',
      param: '', // 工程参数
      paramList: [],

      selectKey: '',
      selectList: [],
      show: false
    };
  },
  onLoad(option) {
    this.deviceId = option.deviceId;
    this.historyCond();
  },
  methods: {
    showAction(key, arr) {
      this.selectList = this[arr];
      this.selectKey = key;
      this.show = true;
    },
    async historyCond() {
      const res = await historyCond(this.deviceId);
      this.durationList = res.result.durationList.map(item => {
        return {
          text: item.name,
          code: item.code
        };
      });
      this.paramList = res.result.paramList.map(item => {
        return {
          text: item.name,
          code: item.code
        };
      });
    },
    actionClick(index) {
      this[`${this.selectKey}Code`] = this.selectList[index].code;
      this[this.selectKey] = this.selectList[index].text;
    }
  }
};
</script>

<style scoped lang="less"></style>
