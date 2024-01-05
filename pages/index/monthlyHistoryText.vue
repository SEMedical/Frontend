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
		<uni-card :is-shadow="false" style="border-radius: 20px;">
			<view class="empty-body">
				<uni-row class="demo-uni-row">
					<uni-col :span="14">
						<button  v-if = "showReturnNowButton" class="selectDayButton" @tap="goToNowButton()">回本月</button>
						<text v-if="!showReturnNowButton">&nbsp;</text>
					</uni-col>
					<uni-col :span="10">
						<button class="selectDayButton" @tap="goToSelectRecordType()">选择</button>
					</uni-col>
				</uni-row>
				<br>
				<!--展示血糖文本数据-->
				<uni-row class="demo-uni-row">
					<uni-col :span="8">
						<text class="bloodSugerText">日期</text>
					</uni-col>
					<uni-col :span="8">
						<text class="bloodSugerText">最高值</text>
					</uni-col>
					<uni-col :span="8">
						<text class="bloodSugerText">最低值</text>
					</uni-col>
				</uni-row>
				<br>
				<view class="uni-padding-wrap uni-common-mt">
					<view>
						<scroll-view scroll-y="true" class="scroll-Y">
							<uni-grid :column="1" :square="false" :showBorder="false">
							    <uni-grid-item v-for="entry in monthBloodSugar" :key="entry.time">
									<uni-row class="demo-uni-row">
										<uni-col :span="8">
											 <view class="time">{{ formatTime(entry.time) }}</view>
										</uni-col>
										<uni-col :span="8">
											<view class="value" >{{ entry.max_val }}mmol/L</view>
										</uni-col>
										<uni-col :span="8">
											<view class="value" >{{ entry.min_val }}mmol/L</view>
										</uni-col>
									</uni-row>
							    </uni-grid-item>
							</uni-grid>
						</scroll-view>
					</view>
				</view>
			</view>
		</uni-card>
		
		<!--统计数据-->
		<uni-card :is-shadow="false" style="border-radius: 20px;">
			<text class="statics">在{{this.loadedDate.year}}年{{this.loadedDate.month}}月，您的血糖值有：</text>
			<br>
			<text class="highText">{{this.highStatistic}}%时间偏高</text>
			<br>
			<text class="normalText">{{this.normalStatistic}}%时间正常</text>
			<br>
			<text class="lowText">{{this.lowStatistic}}%时间偏低</text>
		</uni-card>
		
	</view>
</template>

<script>
import { ref, onMounted} from 'vue';
import monthlyBloodSugarData from '@/api/monthlyOrWeeklyHistory.js';

export default{
	data(){
		return{
			highStatistic: ref([]),    //存储高血糖概率值
			normalStatistic: ref([]),   //存储正常血糖概率值
			lowStatistic: ref([]),    //存储低血糖概率值
			//存储当天的血糖数据
			monthBloodSugar:[],
			loadedDate : {
				year : 2023,
				month : 12,
				day : 1,
			},  //要加载的日期数据
		}
	},
	
	//获取从monthlyHistoryGraphic页面传递过来的参数
	onLoad: function (option) {
		console.log(1);
		this.loadedDate = JSON.parse(option.selectedDate);
		console.log(this.loadedDate);
	},
	
	mounted() {
		this.getMonthlyBloodSugarData();
	},
	
	computed:{
		//是否显示“回本月”按钮
		showReturnNowButton(){
			// 获取现在的日期
			const today = new Date();
			const todayDate = {
			    year: today.getFullYear(),
			    month: today.getMonth() + 1,
			    day: today.getDate(),
			};
			
			// 比较 loadedDate 和今天的日期
			return (
			    this.loadedDate.year !== todayDate.year ||
			    this.loadedDate.month !== todayDate.month
			);
		},
	},
	
	methods:{
		//获取月血糖数据
		async getMonthlyBloodSugarData(){
			try{
				uni.showToast({
				  title: '加载较慢，请耐心等待...',
				  icon: 'none', // 这个是为了去掉默认的图标，节省空间
				  duration: 2000 // 调整显示时间，让用户有足够时间看到提示
				});
				const startDate = `${this.loadedDate.year}-${String(this.loadedDate.month).padStart(2, '0')}-${String(this.loadedDate.day).padStart(2, '0')}`;
				const response = await monthlyBloodSugarData.getmonthlyOrWeeklyGlycemia('month', startDate);
				console.log(response);
				this.highStatistic =response.hyperglycemiaPercentage.toFixed(2);
				this.normalStatistic = response.euGlycemiaPercentage.toFixed(2);
				this.lowStatistic = response.hypoglycemiaPercentage.toFixed(2);
				this.monthBloodSugar = [];
				console.log(this.monthBloodSugar);
				
				response.data.forEach(item=>{
				 	const time=Object.keys(item)[0];
				 	const value=item[time];
					
					console.log("Time"+time);
					const entry = {
					    min_val: value.minValue,
					    max_val: value.maxValue,
					    time: value.time
					  };
					this.monthBloodSugar.push(entry);
					}
				 );
				this.monthBloodSugar.forEach(item=>{
					console.log(Object.keys(item)[0]);
				})
			} catch(error){
				console.error('获取月血糖数据时出错：' + error);
			}
		},
		formatTime(dateTime) {
		    // 将字符串时间转换为 Date 对象
		    const date = new Date(dateTime);
		      
		    // 获取月、日
		    const month = (date.getMonth() + 1).toString().padStart(2, '0');
		    const day = date.getDate().toString().padStart(2, '0');
		      
		    // 拼接月日
		    return `${month}-${day}`;
		},
		//“图像”按钮
		switchToGraphic(){
			console.log(this.loadedDate);
			uni.navigateTo({
				url:'/pages/index/monthlyHistoryGraphic?selectedDate=' + JSON.stringify(this.loadedDate),
			});
		},
		//回本月
		goToNowButton(){
			// 更新日期为本月
			const today = new Date();
			this.loadedDate.year = today.getFullYear();
			this.loadedDate.month = today.getMonth() + 1;
			
			this.getMonthlyBloodSugarData();    //重新渲染页面
		},
		//“选择”按钮
		goToSelectRecordType(){
			uni.navigateTo({
				url:'/pages/index/selectRecordType',
			});
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
.bloodSugerText{
	margin-left: 40px;
	margin-top: 50px;
	font-size: 15px;
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