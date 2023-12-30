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
					<button class="switchButton" @tap="switchToText()">文本</button>
			    </uni-col>
			</uni-row>
		</view>
		 
		<!--血糖数据图像输出-->
		<uni-card :is-shadow="false">
			<view class="empty-body">
				<uni-row class="demo-uni-row">
					<uni-col :span="14">
						<button  v-if = "showReturnTodayButton" class="selectDayButton" @tap="goToTodayButton()">回今天</button>
						<text v-if="!showReturnTodayButton">&nbsp;</text>
					</uni-col>
					<uni-col :span="10">
						<button class="selectDayButton" @tap="goToSelectRecordType()">选择</button>
					</uni-col>
				</uni-row>
				
				<uni-row class="demo-uni-row">
					<uni-col :span="1">
						<button class="leftAndRightButton" @tap="leftButton()">
							&lt
						</button>
					</uni-col>
					<uni-col :span="20">
						<view class="charts-box">
							<qiun-data-charts 
								type="line"
								:opts="opts"
							    :chartData="chartData"
								:ontouch="true"
							/>
						</view>
					</uni-col>
					<uni-col :span="1">
					    <button class="leftAndRightButton" @tap="rightButton()">
						    &gt					
					   </button>
					</uni-col>
				</uni-row>
				
				<text class="annonationText">注：左右滑动曲线图可查看更多的血糖数据，点击曲线图上的点可查看该点的具体信息。蓝色线表示运动的开始时间，绿色线表示运动的结束时间。</text>
			</view>
		</uni-card>
		
		<!--统计数据-->
		<uni-card :is-shadow="false">
			<text class="statics">在{{this.loadedDate.year}}年{{this.loadedDate.month}}月{{this.loadedDate.day}}日，您的血糖值有：</text>
			<br>
			<text class="highText">{{this.highStatistic.value}}%时间偏高</text>
			<br>
			<text class="normalText">{{this.normalStatistic.value}}%时间正常</text>
			<br>
			<text class="lowText">{{this.lowStatistic.value}}%时间偏低</text>
		</uni-card>
		
	</view>
</template>

<script>
import { ref, onMounted} from 'vue';
import DayBloodSugar from '@/api/dailyHistory.js';
import DaySportTime from '@/api/getExerciseTime.js';
	
export default{
	data(){
		return{
			highStatistic: ref([]),    //存储高血糖概率值
			normalStatistic: ref([]),   //存储正常血糖概率值
			lowStatistic: ref([]),    //存储低血糖概率值
			chartData:{},
			//存储图片的配置选项
			opts: {
			    color: ["#FAC858"], // 血糖折线的颜色
				padding: [15, 10, 0, 15],
				enableScroll: true,
				legend: {},
				enableMarkLine:true,
				xAxis: {
					disableGrid: true,
					title:"时间",
					itemCount:4,
					scrollShow:true,
					boundaryGap:"center",
					titleOffsetX:-13,
					titleFontSize:12,
					titleFontColor:"#0055ff",
				},
				yAxis: {
					gridType: "dash",
					dashLength: 2,	
				},
				extra: {
				    line: {
						type: "curve",
						width: 2,
						activeType: "hollow"
					},
					markLine: {
					    labelAlign: 'center', // 标签居中显示
					    labelFontSize: 12,
					    labelFontColor: '#666666',
					    labelBgColor: '#DFE8FF',
					    labelBgOpacity: 0.8,
					},
			    },
			},	
			daySportTime:[], //存储当天的运动时段
			//存储当天的血糖数据
			dayBloodSugar:[],
			loadedDate : {
				year : 2023,
				month : 12,
				day : 26,
			},  //要加载的日期数据
	    }
	},
	
	mounted(){
		this.getBloodSugarAndSportData();
	},
	
	computed:{
		//是否显示“回今天”按钮
		showReturnTodayButton(){
			// 获取今天的日期
			const today = new Date();
			const todayDate = {
			    year: today.getFullYear(),
			    month: today.getMonth() + 1,
			    day: today.getDate(),
			};
			
			// 比较 loadedDate 和今天的日期
			return (
			    this.loadedDate.year !== todayDate.year ||
			    this.loadedDate.month !== todayDate.month ||
			    this.loadedDate.day !== todayDate.day
			);
		},
	},

    //获取从selectDay页面传递过来的参数
    onLoad: function (option) {
		this.loadedDate = JSON.parse(option.selectedDate);
		console.log(this.loadedDate);
	},
	
	methods: {
		//查看文本数据，跳转到文本数据页面
		switchToText(){
			uni.navigateTo({
				url : '/pages/index/dailyHistoryText?selectedDate=' + JSON.stringify(this.loadedDate),
			});
		},
		//跳转到当天的血糖数据页面
		goToTodayButton(){
			// 更新日期为今天
			const today = new Date();
			this.loadedDate.year = today.getFullYear();
			this.loadedDate.month = today.getMonth() + 1;
			this.loadedDate.day = today.getDate();
			
			this.getBloodSugarAndSportData();    //重新渲染图像
		},
		
		//跳转到选择记录类型的页面
		goToSelectRecordType(){
			uni.navigateTo({
				url:'/pages/index/selectRecordType',
			});
		},
		//点击向左按钮，跳转到前一天
		//现在不确定要不要保留
		leftButton(){
			
		},
		//点击向右按钮，跳转到后一天
		//现在不确定要不要保留
		rightButton(){
			
		},
		/* async getDayBloodSugarData(){
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
		}, */
		
		formatTime(dateTime) {
		    // 将字符串时间转换为 Date 对象
		    const date = new Date(dateTime);
		   
		    // 获取时、分
		    const hours = date.getHours().toString().padStart(2, '0');
		    const minutes = date.getMinutes().toString().padStart(2, '0');
		   
		    // 拼接时分
		    return `${hours}:${minutes}`;
		},
		
		//获取血糖数据、统计值、运动数据，并将其赋值于图表数据中
		async getBloodSugarAndSportData(){
			try{
				//获取血糖和统计值数据
				const response = await DayBloodSugar.getdailyGlycemia();
				this.highStatistic.value = response.highSta;
				this.normalStatistic.value = response.normalSta;
				this.lowStatistic.value =response.lowSta;
				console.log(this.highStatistic.value);
				console.log(this.normalStatistic.value);
				console.log(this.lowStatistic.value);
				this.dayBloodSugar = response.entry;
				console.log(this.dayBloodSugar);
				
				//将血糖数据存储在数组中
				const timeArray = this.dayBloodSugar.map(item => this.formatTime(item.time));
				const valueArray = this.dayBloodSugar.map(item => item.value);
				
				//获取运动数据
				const sportResponse = await DaySportTime.getExerciseTime('realtime','12');
				this.daySportTime =sportResponse;
				console.log(sportResponse);
				
				// 添加运动时段标记线
				const markLines = this.daySportTime.map(item => {
					return {
					    type: 'solid', // 实线
					    dashLength: 4,
					    data: [
					        {
					            value: this.formatTime(item.start_time),
					            lineColor: '#00aaff',
					            showLabel: true,
					            labelAlign: 'right',
					            labelOffsetX: 5,
					            labelOffsetY: 0,
					            labelPadding: 6,
					            labelFontSize: 13,
					            labelFontColor: '#666666',
					            labelBgColor: '#DFE8FF',
					            labelBgOpacity: 0.8,
					        },
					        {
					            value: this.formatTime(item.end_time),
					            lineColor: '#55ff7f',
					            showLabel: true,
					            labelAlign: 'left',
					            labelOffsetX: 5,
					            labelOffsetY: 0,
					            labelPadding: 6,
					            labelFontSize: 13,
					            labelFontColor: '#666666',
					            labelBgColor: '#DFE8FF',
					            labelBgOpacity: 0.8,
					        },
					    ],
					};
				});
						
				this.chartData = {
				    categories: timeArray,
					series: [
					    {
					        name: "血糖值",
					        data: valueArray
					    },
					],
					markLine: {
						data: markLines,
					},
				};
				
			} catch(error){
				console.log('获取本日数据时出错：' + error);
			}
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
.statics{
	font-weight:bold;
	font-size: 13px;
}
.highText{
	color:red;
	font-size:15px;
}
.normalText{
	color:green;
	font-size:15px;
}
.lowText{
	color:orange;
	font-size:15px;
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
.leftAndRightButton{
	width: 20px;
	height: 20px;
	line-height: 20px;
	border-radius: 50%;
	background-color: orange;
	color: white;
	text-align: center;
	font-size: 16px;
	margin-top:150px;
}
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
    width: 100%;
    height: 300px;
}
</style>