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
		<uni-card :is-shadow="false" style="border-radius: 20px;">
			<view class="empty-body">
				<uni-row class="demo-uni-row" justify="space-between">
					<uni-col :span="14">&nbsp;</uni-col>
					<uni-col :span="10">
						<button class="selectDayButton" @tap="switchToRecordType()">选择</button>
					</uni-col>
				</uni-row>
				<br>
				<view class="charts-box">
					<qiun-data-charts 
						type="line"
						:opts="opts"
					    :chartData="chartData"
						:ontouch="true"
					/>
				</view>
					
				
				<text class="annonationText">注：左右滑动曲线图可查看更多的血糖数据，点击曲线图上的点可查看该点的具体信息</text>
				
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
			chartData:{},
		    //存储图片的配置选项
			opts: {
			    color: ["#FAC858"], // 血糖折线的颜色
				padding: [15, 10, 0, 15],
				enableScroll: true,
				legend: {},
				ontaouch:true,
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
					}
			    },
			},			
			
			//存储当天的血糖数据
			dayBloodSugar:[],
			bloodsugar : ref([]), // 存储数据库获取到的实时血糖数据
			prompt : ref([]),   //存储血糖小贴士
	    }
	},
	mounted() {
	    this.loadData();
		this.loadPrompt();
		this.getChartData();
	},
	methods: {
		//查看文本数据，跳转到文本数据页面
		switchToText(){
			uni.navigateTo({
				url : "/pages/index/bloodSugarCalendarText",
			});
		},
		//
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
				this.prompt.value = response;
			}
			catch(error){
				console.error('获取血糖小贴士时出错：',error);
			}
		},
		getStyle(){
			const value = this.bloodsugar.value;
			if (value > 80) {
			    return { color: 'red' };
			} else if (value < 45) {
			    return { color: 'orange' };
			} else {
			    return { color: 'green' };
			}
		},
		
		formatTime(dateTime) {
		    // 将字符串时间转换为 Date 对象
		    const date = new Date(dateTime);
		   
		    // 获取时、分
		    const hours = date.getHours().toString().padStart(2, '0');
		    const minutes = date.getMinutes().toString().padStart(2, '0');
		   
		    // 拼接时分
		    return `${hours}:${minutes}`;
		},
		
		async getChartData() {
			try {
				const response = await todayBloodSugar.getGlycemiaData('realtime','12');
				this.dayBloodSugar =response;
				console.log(response);
			    // 直接使用存储在 dayBloodSugar 中的数据
			    const timeArray = this.dayBloodSugar.map(item => this.formatTime(item.time));
			    const valueArray = this.dayBloodSugar.map(item => item.value);
			   
			    this.chartData = {
			        categories: timeArray,
			        series: [
			        {
			            name: "血糖值",
			            data: valueArray
			        }
			        ]
			    };
			} catch (error) {
			    console.error('获取本日血糖数据时出错：', error);
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
.prompt{
	font-size:20px;
	font-weight: bold;
}
.text1{
	font-size: 15px;
	font-weight: bold;
	color: black;
}
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
    width: 100%;
    height: 300px;
}
</style>