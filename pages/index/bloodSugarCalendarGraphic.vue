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
				<uni-row class="demo-uni-row" justify="space-between">
					<uni-col :span="14">&nbsp;</uni-col>
					<uni-col :span="10">
						<button class="selectDayButton" @tap="switchToRecordType()">选择</button>
					</uni-col>
				</uni-row>
				<!--血糖数据图-->
				
				
				<text class="annonationText">注：左右滑动曲线图可查看具体的血糖数据</text>
			</view>
		</uni-card>
		
		<!--实时血糖-->
		<uni-card :is-shadow="false">
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

export default{
	data(){
		return{
			chart:null,
			//存储一天的血糖数据
			bloodSugerValue:[
				{time: "0:00",value :"50"},
				
			],
			bloodsugar : ref([]), // 存储数据库获取到的实时血糖数据
			prompt : ref([]),   //存储血糖小贴士
	    }
	},
	mounted() {
	    this.loadData();
		this.loadPrompt();
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
		
        async loadData() {
		    try {
		        const response = await bloodSugar.realTimeBloodSugar();
		        this.bloodsugar.value = response;
		        // 在这里可以进行其他的初始化操作
		    } catch (error) {
		        console.error('获取血糖数据时出错：', error);
		    }
	    },
		
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
</style>