<template>
	<view class="wrap">
        <u-tabs :list="tab_list" :is-scroll="true" :current="current" @change="change"></u-tabs>
        	<view v-show="current==0">
        		<u-cell-group>
        		<u-swipe-action :show="false" :index="index" v-for="(item, index) in bindedUsers" :key="item.account_id" @click="click" :options="options" :vibrate-short="true">
        		   <u-cell-item :title="item.nick_name" :value="item.account_id" :arrow="false"></u-cell-item>
        		</u-swipe-action>
        		</u-cell-group>
        	</view>
        	<view v-show="current==1">
        		<view  @click="hanlderThe(item)" v-for="(item,index) in waitBindingUsers">
        			<u-row gutter="16">
        				<u-col span="8">
        					<div >{{item.nick_name}}</div>	
        				</u-col>
        				<u-col span="2">
							<u-button size="mini" @click="handleAgree(item.account_id)">同意</u-button>
        				</u-col>
        				<u-col span="2">
        					<u-button size="mini" @click="handleDegree(item.account_id)">拒绝</u-button>
        				</u-col>
        			</u-row>
        		</view>
			</view>
        <u-top-tips ref="uTips"></u-top-tips>
    </view>
</template>

<script>
import { modifyBind } from '@/api/device.js';
import {sendGetManagerUserList, sendAuditBindRequest} from '@/api/user.js'

export default {
	data() {
		return {
			current:0,
			tab_list:[
			{name:"已绑定"},
			{name:"待确认"},
			],
			
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
		this.$refs.uTips.show({
			title: '滑动人员模块进行删除 ',
			type: 'success',
			duration: '2000'
		});
		this.getBindedUserList()
		this.getWaitBindUserList()
	},
	methods: {
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
		
		change(index) {
	  		this.current = index;
			console.log(this.current);
	  	},
		async click(index) {
			const uids = [this.bindedUsers[index].account_id];
			const res = await modifyBind(this.deviceId, uids);
			
			if (res.code === 200) {
				this.$u.toast('删除成功');
				this.bindedUsers.splice(index, 1);
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
