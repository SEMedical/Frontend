<template>
	<view class="container">
		<br><br>
		
		<!--标题与文本按钮-->
		<view class="empty-body">
			<uni-row class="demo-uni-row">
				<uni-col :span="14">
				    <text class="title">我的血糖数据</text>
			    </uni-col>
			    <uni-col :span="10">
					<button class="switchButton" @tap="switchToGraphic()">图像</button>
			    </uni-col>
			</uni-row>
		</view>
		 
		<!--血糖数据文本数据框-->
		<uni-card :is-shadow="false">
			<view class="empty-body">
				<uni-row class="demo-uni-row">
					<uni-col :span="14">
						<button v-if = "returnTodayButton" class="selectDayButton">回今天</button>
					</uni-col>
					<uni-col :span="10">
						<button class="selectDayButton">选择</button>
					</uni-col>
				</uni-row>
				<br>
				<uni-row class="demo-uni-row">
					<uni-col :span="10">
						<text class="bloodSugerText">时间</text>
					</uni-col>
					<uni-col :span="10">
						<text class="bloodSugerText">血糖值</text>
					</uni-col>
				</uni-row>
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
		</uni-card>
		
		<!--统计数据-->
		<uni-card :is-shadow="false">
			<text class="statics">在{{loadedDate.year}}年{{loadedDate.month}}月{{loadedDate.day}}日，您的血糖值有：</text>
			<text class="highText">{{highStatistic}}时间偏高</text>
			<text class="normalText">{{normalStatistic}}时间正常</text>
			<text class="lowText">{{lowStatistic}}时间偏低</text>
		</uni-card>
		
	</view>
</template>

<script>
export default{
	data(){
		return{
			highStatistic: {},
			normalStatistic: {},
			lowStatistic: {},
			chart:null,
			//存储一天的血糖数据
			bloodSugerValue:[
				{time: "0:00",value :"50"},
				
			],
			loadedDate : {
				year : 2023,
				month : 12,
				day : 26,
			},  //要加载的日期数据
	    }
	},
	methods: {
		//获取从selectDay页面传递过来的日期数据
		onLoad(options){
			//从页面参数中获取传递的日期数据，此时获取的是传过来的JSON字符串数据
			const selectedDateStr =options.selectedDate;
			//将JSON字符串转换为对象
			const selectedDate = JSON.parse(selectedDateStr);
			//在数据中保存获取到的数据
			this.loadedDate.year = selectedDate[Object.keys(selectedDate)[0]];
			this.loadedDate.month = selectedDate[Object.keys(selectedDate)[1]];
			this.loadedDate.day = selectedDate[Object.keys(selectedDate)[2]];
		},
		//查看文本数据，跳转到文本数据页面
		switchToGraphic(){
			uni.navigateTo({
				url : "/pages/index/dailyHistoryGraphic",
			});
		},
	    
	},
	computed:{
		//是否显示“回今天”按钮
		returnTodayButton(){
			const today = new Date();
			return (
			    this.loadedDate.year === today.getFullYear() &&
			    this.loadedDate.month === today.getMonth() + 1 &&
			    this.loadedDate.day === today.getDate()
			);
		},
	}
}
</script>

<style>
.container {
	padding: 0px;
	font-size: 14px;
	line-height: 24px;
}
.title{
	/*小标题字样式*/
	margin-left:10px;
	font-weight:bold;
	font-size: 25px;
}	
.switchButton{
	background-color:green;
	color:white;
	font-weight:bold;
	font-size:20px;
	width:80px;
	height:50px;
	border-radius:900px;
	margin-top:0px;
	border-color:green;
}
.statics{
	font-weight:bold;
	font-size: 13px;
}
.highText{
	color:red;
}
.normalText{
	color:green;
}
.lowText{
	color:orange;
}
.selectDayButton{
	background-color:ghostwhite;
	color:black;
	font-weight:bold;
	font-size:16px;
	width:100px;
	height:30px;
	border-radius:999px;
	margin-top:10px;
	border-color:midnightblue;
	border-style: solid;
	display: flex;
	justify-content: center;
	align-items: center;
}
.annonationText{
	font-size: 12px;;
}
.bloodSugerText{
	margin-left: 40px;
	margin-top: 50px;
	font-weight: bold;
}
</style>