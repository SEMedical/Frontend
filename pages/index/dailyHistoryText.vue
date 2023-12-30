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
import { ref, onMounted} from 'vue';
import DayBloodSugar from '@/api/dailyHistory.js';

export default{
	data(){
		return{
			highStatistic: ref([]),    //存储高血糖概率值
			normalStatistic: ref([]),   //存储正常血糖概率值
			lowStatistic: ref([]),    //存储低血糖概率值
            //存储当天的血糖数据
			dayBloodSugar:[],
			loadedDate : {
				year : 2023,
				month : 12,
				day : 26,
			},  //要加载的日期数据
	    }
	},

	onLoad: function (option) {
		this.loadedDate = JSON.parse(option.selectedDate);
		console.log(this.loadedDate);
	},
	
	methods: {
		//查看文本数据，跳转到文本数据页面
		switchToGraphic(){
			uni.navigateTo({
				url : "/pages/index/dailyHistoryGraphic",
			});
		},
	    
	},
	computed:{
		async getDayBloodSugarData(){
			try{
				const response = await DayBloodSugar.getdailyGlycemia();
				this.highStatistic.value = response.highSta;
				this.normalStatistic.value = response.normalSta;
				this.lowStatistic.value =response.lowSta;
				console.log(this.highStatistic.value);
				console.log(this.normalStatistic.value);
				console.log(this.lowStatistic.value);
				this.dayBloodSugar = response.entry;
				console.log(this.dayBloodSugar);
			} catch(error){
				console.error('获取日血糖数据时出错：' + error);
			}
		},
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