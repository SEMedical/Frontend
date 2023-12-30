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
				<uni-row class="demo-uni-row">
					<uni-col :span="14">
						<button class="selectDayButton" @tap="goToNowButton()">回本周</button>
					</uni-col>
					<uni-col :span="10">
						<button class="selectDayButton" @tap="goToSelectRecordType()">选择</button>
					</uni-col>
				</uni-row>
				<br>
				<view class="uni-padding-wrap uni-common-mt">
					<view>
						<scroll-view scroll-y="true" class="scroll-Y">
							<uni-grid :column="1" :square="false" :showBorder="false">
							    <uni-grid-item v-for="entry in weeklyBloodSugar" :key="entry.time">
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
			<text class="statics">在{{this.loadedDate.year}}年{{this.loadedDate.month}}月第{{weekOfMonth}}周的这几天，您的血糖值有：</text>
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
import weeklyBloodSugarData from '@/api/monthlyOrWeeklyHistory.js';

export default{
	data(){
		return{
			highStatistic: ref([]),    //存储高血糖概率值
			normalStatistic: ref([]),   //存储正常血糖概率值
			lowStatistic: ref([]),    //存储低血糖概率值
			//存储当周的血糖数据
			weeklyBloodSugar:[],
			loadedDate : {
				year : 2023,
				month : 12,
				day : 1,
			},  //要加载的日期数据
		}
	},
	
	computed:{
		// 计算当前日期是这个月的第几周
		weekOfMonth() {
		    const firstDayOfMonth = new Date(this.loadedDate.year, this.loadedDate.month - 1, 1);
		    const firstDayOfWeek = firstDayOfMonth.getDay(); // 获取这个月第一天是星期几
		
		    const dayOfMonth = this.loadedDate.day;
		
		    const weekNumber = Math.ceil((dayOfMonth + firstDayOfWeek) / 7);
		
		    return weekNumber;
		},
	},
	
	//获取从weeklyHistoryGraphic页面传递过来的参数
	onLoad: function (option) {
		this.loadedDate = JSON.parse(option.selectedDate);
		console.log(this.loadedDate);
	},
	
	mounted(){
		this.getWeeklyBloodSugarData();
	},
	
	methods:{
		formatTime(dateTime) {
		    // 将字符串时间转换为 Date 对象
		    const date = new Date(dateTime);
		      
		    // 获取月、日
		    const month = (date.getMonth() + 1).toString().padStart(2, '0');
		    const day = date.getDate().toString().padStart(2, '0');
		      
		    // 拼接月日
		    return `${month}-${day}`;
		},
		
		//获取周血糖数据
		async getWeeklyBloodSugarData(){
			try{
				const startDate = `${this.loadedDate.year}-${String(this.loadedDate.month).padStart(2, '0')}-${String(this.loadedDate.day).padStart(2, '0')}`;
				const response = await weeklyBloodSugarData.getmonthlyOrWeeklyGlycemia('week', '12', startDate);
				console.log(response);
				this.highStatistic.value =response.hyper_percent;
				this.normalStatistic.value = response.eu_percent;
				this.lowStatistic.value = response.hypo_percent;
				this.weeklyBloodSugar = response.entry;
				console.log(this.weeklyBloodSugar);
				
			} catch(error){
				console.error('获取月血糖数据时出错：' + error);
			}
		},
		
		//切换到图像页面
		switchToGraphic(){
			uni.navigateTo({
				url:'/pages/index/weeklyHistoryGraphic?selectedDate=' + JSON.stringify(this.loadedDate),
			});
		},
		
		//“选择”按钮
		goToSelectRecordType(){
			uni.navigateTo({
				url:'/pages/index/selectRecordType',
			});
		},
		
		goToNowButton(){
			// 更新日期为本周
			// 获取当前日期
			const today = new Date();
			
			// 获取今天是周几，0 表示星期天，1 表示星期一，以此类推
			const dayOfWeek = today.getDay();
			
			// 计算距离周一的天数，如果今天是周一，就不需要减去任何天数
			const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
			
			// 计算周一的日期
			const monday = new Date(today);
			monday.setDate(today.getDate() - daysToMonday);
			
			// 设置 loadedDate 为周一的日期
			this.loadedDate.year = monday.getFullYear();
			this.loadedDate.month = monday.getMonth() + 1;
			this.loadedDate.day = monday.getDate();
			
			this.getBloodSugarData(); // 重新渲染页面
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