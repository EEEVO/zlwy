<template>
	<view>
		<u-sticky offset-top="0">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#597ef7"></uni-segmented-control>
		</u-sticky>
		<view v-show="current==0">
			<u-cell-group>
				<u-cell-item v-for="(item, index) of bindedUsers" :key="index" :center="true" :arrow="false" :use-label-slot="true">
					<view slot="label">{{item.nick_name}} {{ item.account_id }}</view>
					<view slot="right-icon">
						<u-button size="mini" @click="handleDel(item.account_id)">删除</u-button>
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view v-show="current==1">
			<u-cell-group>
				<u-cell-item v-for="(item, index) of waitBindingUsers" :key="index" :center="true" :arrow="false" :use-label-slot="true">
					<view slot="label">{{item.nick_name}} {{ item.account_id }}</view>
					<view slot="right-icon">
						<u-button size="mini" @click="handleAgree(item.account_id)">同意</u-button>
						<u-button size="mini" @click="handleDegree(item.account_id)" style="margin-left: 15upx;">拒绝</u-button>
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
        <u-top-tips ref="uTips"></u-top-tips>
    </view>
</template>

<script>
import { modifyBind } from '@/api/device.js';
import {sendGetManagerUserList, sendAuditBindRequest} from '@/api/user.js'
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';

export default {
	components: { uniSegmentedControl },
	data() {
		return {
			current:0,
			items:['已绑定', '待确认'],
			
			//待绑定的用户列表
			waitBindingUsers:[],
			bindedUsers:[],
			
			deviceId: '',
			options: [
			{
				text: '删除',
				style: {
					backgroundColor: '#dd524d'
				}
			}]
		};
	},
	onLoad(option) {
		this.deviceId = option.deviceId;
	},
	mounted() {
		this.getBindedUserList()
		this.getWaitBindUserList()
	},
	methods: {
		onClickItem(e) {
		  this.current = e.currentIndex;
		},
		handleDegree:function(account_id){
			console.log("handleDegree" + account_id);
			this.handleCommitBind(this.deviceId, account_id, 2)
		},
		handleAgree:function(account_id){
			console.log("handleAgree" + account_id);
			this.handleCommitBind(this.deviceId, account_id, 1)
		},
		
		handleCommitBind:function(device_id,account_id,type){
			sendAuditBindRequest(device_id,account_id,type).then((res)=>{
				console.log("sendAuditBindRequest return");
				console.log(res);
				if(res.code==200){
					console.log("success");
					this.getBindedUserList()
					this.getWaitBindUserList()
					uni.showToast({
						title: res.message,
						icon: 'success',
						duration: 2000
					});
				}else{
					uni.showToast({
						title:res.message,
						icon:'error',
						duration:2000
					})
				}
			})
		},
		
		getWaitBindUserList:function(){
			let params={
				device_id:this.deviceId,
				user_type:2
			}
			sendGetManagerUserList(params).then((res)=>{
				if(res.code==200){
					console.log("query success");
					this.waitBindingUsers=res.result.accountList
					console.log(this.waitBindingUsers);
				}
			});
		},
		
		getBindedUserList:function(){
			let params={
				device_id:this.deviceId,
				user_type:1
			}
			sendGetManagerUserList(params).then((res)=>{
				if(res.code==200){
					console.log("query success");
					this.bindedUsers=res.result.accountList
					console.log(this.waitBindingUsers);
				}
			});
		},
		async handleDel(account_id) {
			const uids = [account_id];
			const res = await modifyBind(this.deviceId, uids);
			
			if (res.code === 200) {
				this.$u.toast('删除成功');
				this.getBindedUserList();
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

.part-demo{
		margin: auto;
		width: 690rpx;
		background:"#ffffff";
		border-radius: 20rpx;
		box-shadow: 0pt 0pt 13pt 6pt rgba(179,179,179,0.1); 
		padding-left: 30rpx;
		padding-right: 32rpx;
		/* 怪异盒子  不会计算padding */
		box-sizing: border-box;
	}
	.part-demo-flex{
		display: flex;
		justify-content: space-between;
		height: 94rpx;
		line-height: 94rpx;
	}
	
	.left-part{
		width: 500rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		font-size: 32rpx;
		font-weight: 400;
		color: #963c3c;
	}
	.right-part{
		font-size: 24rpx;
		font-weight: 400;
		color: #963c3c;
		text-align: right;
	}
	
	.wrap {
	        padding: 24rpx;
	    }
	    .u-row {
	        margin: 40rpx 0;
	    }
	    .demo-layout {
	        height: 80rpx;
	        border-radius: 8rpx;
	    }
	    .bg-purple {
	        background: #d3dce6;
	    }
	    .bg-purple-light {
	        background: #e5e9f2;
	    }
	    .bg-purple-dark {
	        background: #99a9bf;
	    }
</style>