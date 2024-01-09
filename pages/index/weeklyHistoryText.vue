<template>
<view class="container">
		<br><br>
		
		<!--标题与文本按钮-->
		<view class="empty-body">
			<uni-row class="demo-uni-row">
				<uni-col :span="14">
				    <view class="intro">&nbsp;&nbsp;我的血糖数据</view>
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
						<button v-if="!isCurrentWeek()" class="selectDayButton" @tap="goToNowButton()">回本周</button>
						<text v-if = "isCurrentWeek()">&nbsp;</text>
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
				uni.showToast({
				  title: '加载较慢，请耐心等待...',
				  icon: 'none', // 这个是为了去掉默认的图标，节省空间
				  duration: 2000 // 调整显示时间，让用户有足够时间看到提示
				});
				const startDate = `${this.loadedDate.year}-${String(this.loadedDate.month).padStart(2, '0')}-${String(this.loadedDate.day).padStart(2, '0')}`;
				const response = await weeklyBloodSugarData.getmonthlyOrWeeklyGlycemia('week',  startDate);
				console.log(response);
				this.highStatistic =response.hyperglycemiaPercentage.toFixed(2);
				this.lowStatistic = response.hypoglycemiaPercentage.toFixed(2);
				this.normalStatistic = response.euGlycemiaPercentage.toFixed(2);
				
				this.weeklyBloodSugar=[];
				console.log(this.weeklyBloodSugar);
				
				response.data.forEach(item=>{
				 	const time=Object.keys(item)[0];
				 	const value=item[time];
					
					console.log("Time"+time);
					const entry = {
					    min_val: value.minValue,
					    max_val: value.maxValue,
					    time: value.time
					  };
					this.weeklyBloodSugar.push(entry);
					}
				 );
				this.weeklyBloodSugar.forEach(item=>{
					console.log(Object.keys(item)[0]);
				})
				//const val=item[time];
				//console.log("Response****"+this.dayBloodSugar);
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
			
			this.getWeeklyBloodSugarData(); // 重新渲染页面
		},
		
		// 检查 loadedDate 是否在当前日期所在的这一周
		isCurrentWeek() {
		    const today = new Date();
		    const todayYear = today.getFullYear();
		    const todayMonth = today.getMonth() + 1;
		    const todayDay = today.getDate();
		
		    const loadedDateYear = this.loadedDate.year;
		    const loadedDateMonth = this.loadedDate.month;
		    const loadedDateDay = this.loadedDate.day;
		
		    const daysDifference = Math.floor((today - new Date(loadedDateYear, loadedDateMonth - 1, loadedDateDay)) / (1000 * 60 * 60 * 24));
		
		    return (
		        (loadedDateYear === todayYear || (loadedDateYear === todayYear - 1 && todayMonth === 1 && loadedDateMonth === 12)) &&
		        loadedDateMonth === todayMonth &&
		        daysDifference >= 0 &&
		        daysDifference < 7
		    ) || (
		        loadedDateYear === todayYear &&
		        loadedDateMonth !== todayMonth &&
		        loadedDateMonth === todayMonth - 1 &&
		        daysDifference > 24 &&
		        daysDifference < 31 &&
		        today.getDate() <= 7
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
.intro {
	font-size: 30px; /* 替换 18px 为你想要的字体大小 */
	font-weight: bold; /* 使用 bold 来将字体加粗 */
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