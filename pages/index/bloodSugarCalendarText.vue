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
		 
		<!--血糖数据文本输出-->
		<uni-card :is-shadow="false" style="border-radius: 20px;">
			<view class="empty-body">
				<uni-row class="demo-uni-row" justify="space-between">
					<uni-col :span="14">&nbsp;</uni-col>
					<uni-col :span="10">
						<button class="selectDayButton" @tap="switchToRecordType()">选择</button>
					</uni-col>
				</uni-row>
				<br>
				<!--展示血糖文本数据-->
				<uni-row class="demo-uni-row">
					<uni-col :span="12">
						<text class="bloodSugerText">时间</text>
					</uni-col>
					<uni-col :span="10">
						<text class="bloodSugerText">血糖值</text>
					</uni-col>
				</uni-row>
				<br>
				<view class="uni-padding-wrap uni-common-mt">
					<view>
						<scroll-view scroll-y="true" class="scroll-Y">
							<uni-grid :column="1" :square="false" :showBorder="false">
							    <uni-grid-item v-for="entry in dayBloodSugar" :key="entry.time">
									<uni-row class="demo-uni-row">
										<uni-col :span="10">
											 <view class="time">{{ formatTime(entry.time) }}</view>
										</uni-col>
										<uni-col :span="14">
											<view class="value" >{{ entry.value }}mmol/L</view>
										</uni-col>
									</uni-row>
							    </uni-grid-item>
							</uni-grid>
						</scroll-view>
					</view>
				</view>
				
			</view>
		</uni-card>
		
		<!--实时血糖-->
		<uni-card :is-shadow="false" style="border-radius: 20px;">
			<view class="empty-body">
				<uni-row class="demo-uni-row">
					<uni-col :span="8" class="text1">
						<text>当前血糖：</text>
					</uni-col>
					<uni-col :span="10" :style="getStyle()" class="prompt">
						{{ bloodsugar.value }} mmol/L
					</uni-col>
				</uni-row>
			</view>
			<br>
			<text :style= "getStyle()" class="prompt">{{ prompt.value }}</text>
		</uni-card>
	</view>
</template>

<script>
import { ref, onMounted} from 'vue';
import bloodSugar from '@/api/bloodSugar';
import Prompt from '@/api/bloodSugarPrompt.js';
import todayBloodSugar from '@/api/currentDayBloodSugar.js';

export default{
	data(){
		return{
			//存储一天的血糖数据
			dayBloodSugar:[],
			bloodsugar : ref([]), // 存储数据库获取到的实时血糖数据
			prompt : ref([]),   //存储血糖小贴士
			color: ref([]),  //存储血糖小贴士应该用的颜色
	    }
	},
	mounted() {
	    this.loadData();
		this.loadPrompt();
		this.loadDayBloodSugar();
	},
	methods: {
		//查看文本数据，跳转到文本数据页面
		switchToGraphic(){
			uni.navigateTo({
				url : "/pages/index/bloodSugarCalendarGraphic",
			});
		},
		//跳转到选择记录类型页面
		switchToRecordType(){
			uni.navigateTo({
				url:'/pages/index/selectRecordType',
			});
		},
		//获取实时血糖
        async loadData() {
		    try {
		        const response = await bloodSugar.realTimeBloodSugar();
		        this.bloodsugar.value = response;
		        // 在这里可以进行其他的初始化操作
		    } catch (error) {
		        console.error('获取血糖数据时出错：', error);
		    }
	    },
		//获取血糖提示
		async loadPrompt() {
			try{
				const response = await Prompt.getBloodSugarPrompt();
				this.prompt.value = response.tip;
				this.color.value = response.color;
			}
			catch(error){
				console.error('获取血糖小贴士时出错：',error);
			}
		},
		//获取当日血糖数据
		async loadDayBloodSugar(){
		    try{
				const response = await todayBloodSugar.getGlycemiaData('realtime');
				this.dayBloodSugar =response;
				console.log(response);
			}	
			catch(error){
				console.error('获取本日血糖数据时出错：',error);
			}
		},
		
		// 修改 getStyle 方法
		getStyle() {
		    const color = this.color.value;
		
		    switch (color) {
		        case 'RED':
		            return { color: 'red' };
		        case 'ORANGE':
		            return { color: 'orange' };
		        case 'GREEN':
		            return { color: 'green' };
		        default:
		            return { color: 'black' }; // 默认值，可以根据需要修改
		    }
		},

		formatTime(dateTime) {
		    // 将字符串时间转换为 Date 对象
		    const date = new Date(dateTime);
		      
		    // 获取时、分、秒
		    const hours = date.getHours().toString().padStart(2, '0');
		    const minutes = date.getMinutes().toString().padStart(2, '0');
		    const seconds = date.getSeconds().toString().padStart(2, '0');
		      
		    // 拼接时分秒
		    return `${hours}:${minutes}:${seconds}`;
		},
	},
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
.selectDayButton{
	background-color:ghostwhite;
	color:black;
	font-weight:bold;
	font-size:18px;
	width:100px;
	height:40px;
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
.prompt{
	font-size:20px;
	font-weight: bold;
}
.text1{
	font-size: 15px;
	font-weight: bold;
	color: black;
}
.bloodSugerText{
	margin-left: 40px;
	margin-top: 50px;
	font-size: 20px;
	color: black;
	font-weight: bold;
}
.value {    
	/*血糖数据值的样式*/
  font-size: 15px;
  margin-bottom: 8px;
  margin-top: 5px;
  text-align: center;
  color: black;
}
.time {
	/*血糖时间的样式*/
  font-size: 15px;
  font-weight: bold;
  text-align:left;
  margin-bottom: 8px;
  margin-top: 5px;
  text-align: center;
  color: black;
}
.scroll-Y {
		height: 550rpx;
	}
.scroll-view-item {
	height: 300rpx;
	line-height: 300rpx;
	text-align: center;
	font-size: 36rpx;
}
</style>