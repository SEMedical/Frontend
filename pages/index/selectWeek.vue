<template>
	<view class="container">
		<view class="warp">
		    <br>
		    <text class="text">请选择您要查看的周</text>
		    <br><br>
		    <!--日历-->
			<view class="uni-padding-wrap">
				<view class="uni-title">请注意：您仅可查看一个月内的血糖数据</view>
			</view>
			<view class="uni-padding-wrap uni-common-mt">
				<!--纵向滚动-->
				<view>
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" >
						<view id="demo1" class="scroll-view-item uni-bg-red">A</view>
						<view id="demo2" class="scroll-view-item uni-bg-green">B</view>
					    <view id="demo3" class="scroll-view-item uni-bg-blue">C</view>
					</scroll-view>
				</view>
			</view>
		</view>
		
		<!--确认按钮-->
		<button class="confirmButton" @tap="leadToRecords()">确认</button>
	</view>
</template>

<script>
export default {
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		methods: {
			leadToRecords(){
				uni.navigateTo({
					url: '/pages/index/weeklyHistoryGraphic',
				});
			},
		}
	}	
</script>

<style>
.container {
	padding: 20px;
	font-size: 14px;
	line-height: 24px;
}
.text{
	font-size:25px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom:10px;
	margin-top:10px;
	font-weight: bold;
	
}
.scroll-Y {
	height: 300rpx;
}
.scroll-view-item {
	height: 300rpx;
	line-height: 300rpx;
	text-align: center;
	font-size: 36rpx;
}
.confirmButton{
	background-color:green;
	color:white;
	font-weight:bold;
	font-size:20px;
	width:200px;
	height:50px;
	border-radius:999px;
	margin-top:100px;
}
</style>