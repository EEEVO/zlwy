<template>
  <view>
	  <view class="param-title">
		  {{paramName}}
	  </view>
    <u-cell-group>
	  <u-field v-if="modifyFlag == 0" @click="openModify" right-icon="arrow-right" v-model="valueUnit" :disabled="true" label="参数值"></u-field>
	  <u-field v-else v-model="valueUnit" :disabled="true" label="参数值"></u-field>
      <u-field
        @click="showAction('duration', 'durationList')"
        v-model="duration"
        :disabled="true"
        label="时间间隔"
        placeholder="请选择时间间隔"
        right-icon="arrow-down-fill"
      ></u-field>
      <u-field @click="showPicker" v-model="endTime" :disabled="true" label="截止时间" placeholder="请选择截止时间" right-icon="arrow-down-fill"></u-field>
    </u-cell-group>
	
    <view class="qiun-charts">
	  <canvas v-if="radarImgShow" canvas-id="canvasLineA" id="canvasLineA" class="charts" disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
      <image v-else :src="radarImg"></image>
    </view>
	
	<!-- <u-cell-group>
		<u-cell-item @click="openModify()" :arrow="modifyFlag == 0" :title="showName" :value="valueUnit"></u-cell-item>
	</u-cell-group> -->
	
    <u-action-sheet :list="selectList" @click="actionClick" v-model="show"></u-action-sheet>
    <u-picker v-model="dateShow" mode="time" :params="configuration" @confirm="pickerClick"></u-picker>
	<u-action-sheet :list="modeList" @click="modeClick" v-model="modifyShow"></u-action-sheet>
	<u-popup v-model="commonShow" mode="center" width="80%" height="150rpx">
		<view>
			<u-cell-group>
				<u-field v-model="paramValue" label="参数值" placeholder="请输入新的参数值"></u-field>
			</u-cell-group>
			<u-cell-group>
				<u-button @click="saveParam">确定</u-button>
			</u-cell-group>
		</view>
	</u-popup>
  </view>
</template>

<script>
import { historyCond, historyQuery, paramData, modeDetail, modifyParam } from '@/api/device.js';
import uCharts from '@/js-sdk/u-charts/u-charts.js';
var canvaLineA = null;

export default {
  data() {
    return {
      deviceId: '',

      durationCode: '10min',
      duration: '10分钟(实时数据)', //时间间隔
      durationList: [],

      dateShow: false,
      endTime: new Date().Format('yyyy-MM-dd hh:mm'), // 截止时间

      paramCode: '',
	  paramName: '',
	  paramUnit: '',
	  paramValue: '',
	  modifyFlag: '',
	  paramModel: '',
	  setIntervalObj: null,
	  modeList: [],  //模板数据
	  commonShow: false,
	  modifyShow: false,
	  
      param: '', // 工程参数
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
	this.paramCode = option.paramCode;
	this.paramName = option.paramName;
    this.historyCond();
  },
  onShow() {
  	this.paramData();
	this.setIntervalObj = setInterval(() => {
		this.paramData();
	}, 3000);
  },
  onHide() {
  	clearInterval(this.setIntervalObj);
  	this.setIntervalObj = null;
  },
  onUnload() {
  	clearInterval(this.setIntervalObj);
  	this.setIntervalObj = null;
  },
  computed: {
    radarImgShow() {
      this.createCanvasImg();
      if (this.show || this.dateShow || this.modifyShow || this.commonShow) {
        return false;
      } else {
        return true;
      }
    },
	valueUnit() {
		return this.paramValue + " " + this.paramUnit;
	},
	showName() {
		return "当前参数：" + this.paramName;
	}
  },
  methods: {
	  async openModify(index) {
	  	if(this.modifyFlag == 0){
			if(this.paramModel == 4) {
				this.commonShow = true;
			}else{
				this.modifyShow = true;
				const res = await modeDetail(this.paramModel);
				if(res.result.modeList){
					this.modeList = res.result.modeList;
				}
			}
	  	}
	  },
	  async modeClick(index) {
	  	const res = await modifyParam(this.deviceId, this.paramCode, this.modeList[index].value);
		this.modifyShow = false;
	  	this.$u.toast('修改成功');
	  },
	  async saveParam() {
		  const res = await modifyParam(this.deviceId, this.paramCode, this.paramValue);
		  this.commonShow = false;
		  this.$u.toast('修改成功');
	  },
	async paramData() {
		const res = await paramData(this.paramCode);
		this.paramName = res.result.name;
		this.paramValue = res.result.param_value;
		this.paramUnit = res.result.unit;
		this.modifyFlag = res.result.modify_flag;
		this.paramModel = res.result.model;
	},
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
        dataPointShape: false,
        background: '#FFFFFF',
        pixelRatio: this.pixelRatio,
        categories: chartData.categories,
        series: chartData.series,
        animation: false,
        enableScroll: true,
        xAxis: {
			disableGrid:false,
			type:'grid',
			gridType: 'dash',
			itemCount:30,
			labelCount:30,
			scrollShow:true,
			scrollAlign:'left',
			rotateLabel: true,
			fontSize: '10'
        },
        yAxis: {
          gridType: 'dash',
          gridColor: '#CCCCCC',
		  dashLength: 8,
		  format: (val) => {
			return val.toFixed(0)
		  }
        },
        width: this.cWidth * this.pixelRatio,
        height: this.cHeight * this.pixelRatio,
        extra: {
			line:{
				type: 'straight'
			}
		}
      };
      canvaLineA = new uCharts(paras);
    },
    touchLineA(e) {
		canvaLineA.scrollStart(e);
      canvaLineA.showToolTip(e, {
        format(item, category) {
          return category + ' ' + item.name + ':' + item.data;
        }
      });
    },
	moveLineA(e) {
		canvaLineA.scroll(e);
	},
	touchEndLineA(e) {
		canvaLineA.scrollEnd(e);
		//下面是toolTip事件，如果滚动后不需要显示，可不填写
		canvaLineA.showToolTip(e, {
			format: function (item, category) {
				return category + ' ' + item.name + ':' + item.data 
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
.param-title{
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 10upx 0upx;
}
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
