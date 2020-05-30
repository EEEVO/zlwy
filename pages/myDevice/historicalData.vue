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
      <u-field @click="showPicker" v-model="endTime" :disabled="true" label="截止时间" placeholder="请选择截止时间" right-icon="arrow-down-fill"></u-field>
      <u-field @click="showAction('param', 'paramList')" v-model="param" :disabled="true" label="参数" placeholder="请选择参数" right-icon="arrow-down-fill"></u-field>
    </u-cell-group>
    <view class="qiun-charts">
      <canvas v-if="radarImgShow" canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
      <image v-else :src="radarImg"></image>
    </view>
    <u-action-sheet :list="selectList" @click="actionClick" v-model="show"></u-action-sheet>
    <u-picker v-model="dateShow" mode="time" :params="configuration" @confirm="pickerClick"></u-picker>
  </view>
</template>

<script>
import { historyCond, historyQuery } from '@/api/device.js';
import uCharts from '@/js-sdk/u-charts/u-charts.js';
var canvaLineA = null;

export default {
  data() {
    return {
      deviceId: '',

      durationCode: '1m',
      duration: '一分钟', //时间间隔
      durationList: [],

      dateShow: false,
      endTime: new Date().Format('yyyy-MM-dd hh:mm'), // 截止时间

      paramCode: '',
      param: '', // 工程参数
      paramList: [],
      configuration: {
        year: true,
        month: true,
        day: true,
        hour: true,
        minute: true
      },

      selectKey: '',
      selectList: [],
      show: false,

      cWidth: '',
      cHeight: '',
      pixelRatio: 1,
      radarImg: '' //canvas的临时图片
    };
  },
  onLoad(option) {
    this.cWidth = uni.upx2px(750);
    this.cHeight = uni.upx2px(500);
    this.deviceId = option.deviceId;
    this.historyCond();
  },
  computed: {
    radarImgShow() {
      this.createCanvasImg();
      if (this.show || this.dateShow) {
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    radarImgShow() {
      this.historyQuery();
    }
  },
  methods: {
    // 请求折线图数据
    async historyQuery() {
      const res = await historyQuery(this.deviceId, this.durationCode, this.endTime, this.paramCode);
      let LineA = {
        categories: res.result.chartData.categories,
        series: [
          {
            name: this.param,
            data: res.result.chartData.series[0].data.map(item => `${item}`),
            color: '#000000'
          }
        ]
      };
      this.showLineA('canvasLineA', LineA);
    },
    showLineA(canvasId, chartData) {
      const paras = {
        $this: this,
        canvasId: canvasId,
        type: 'line',
        fontSize: 11,
        legend: { show: true },
        dataLabel: false,
        dataPointShape: true,
        background: '#FFFFFF',
        pixelRatio: this.pixelRatio,
        categories: chartData.categories,
        series: chartData.series,
        animation: true,
        // enableScroll: true,
        xAxis: {
          type: 'grid',
          gridColor: '#CCCCCC',
          gridType: 'dash',
          rotateLabel: true,
          fontSize: '0'
        },
        yAxis: {
          gridType: 'dash',
          gridColor: '#CCCCCC'
        },
        width: this.cWidth * this.pixelRatio,
        height: this.cHeight * this.pixelRatio,
        extra: {
          line: {
            type: 'straight'
          }
        }
      };
      canvaLineA = new uCharts(paras);
    },
    touchLineA(e) {
      canvaLineA.showToolTip(e, {
        format(item, category) {
          return category + ' ' + item.name + ':' + item.data;
        }
      });
    },
    pickerClick(obj) {
      this.endTime = `${obj.year}-${obj.month}-${obj.day} ${obj.hour}:${obj.minute}`;
      this.historyQuery();
    },
    showAction(key, arr) {
      this.selectList = this[arr];
      this.selectKey = key;
      this.show = true;
    },
    // 根据canvas生成图片,绕过canvas在微信小程序内始终只能显示在最上层的问题
    createCanvasImg() {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 750,
        height: 500,
        canvasId: 'canvasLineA',
        success: res => {
          this.radarImg = res.tempFilePath;
        }
      });
    },
    showPicker() {
      this.dateShow = true;
    },
    // 获取查询历史条件数据
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
      this.param = this.paramList[0].text;
      this.paramCode = this.paramList[0].code;
      this.historyQuery();
    },
    actionClick(index) {
      this[`${this.selectKey}Code`] = this.selectList[index].code;
      this[this.selectKey] = this.selectList[index].text;
      this.historyQuery();
    }
  }
};
</script>

<style scoped lang="less">
/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
.qiun-charts {
  width: 750upx;
  height: 500upx;
  background-color: #ffffff;

  .charts {
    width: 750upx;
    height: 500upx;
    background-color: #ffffff;
  }
  image {
    width: 750upx;
    height: 500upx;
  }
}
</style>
