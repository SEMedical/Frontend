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
				<!-- <uni-row class="demo-uni-row">
					<uni-col :span="1">
						<button class="leftAndRightButton" @tap="leftButton()">
							&lt
						</button>
					</uni-col> -->
					<!-- <uni-col :span="20"> -->
						<view class="charts-box">
							<qiun-data-charts 
								type="line"
								:opts="opts"
							    :chartData="chartData"
								:ontouch="true"
							/>
						</view>
					<!-- </uni-col>
					<uni-col :span="1">
					    <button class="leftAndRightButton" @tap="rightButton()">
						    &gt					
					   </button>
					</uni-col>
				</uni-row> -->
				
				<text class="annonationText">注：左右滑动曲线图可查看更多的血糖数据，点击曲线图上的点可查看该点的具体信息。</text>
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
			//存储当月的血糖数据
			monthBloodSugar:[],
			loadedDate : {
				year : 2023,
				month : 12,
				day : 1,
			},  //要加载的日期数据
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
					title:"日期",
					itemCount:3,
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
		}
	},
	
	//获取从selectMonth页面传递过来的参数
	onLoad: function (option) {
		this.loadedDate = JSON.parse(option.selectedDate);
		console.log(this.loadedDate);
	},
	
	mounted() {
		this.getBloodSugarData();
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
		// async getMonthlyBloodSugarData(){
		// 	try{
		// 		const startDate = `${this.loadedDate.year}-${String(this.loadedDate.month).padStart(2, '0')}-${String(this.loadedDate.day).padStart(2, '0')}`;
		// 		const response = await monthlyBloodSugarData.getmonthlyOrWeeklyGlycemia('month', '12', startDate);
		// 		console.log(response);
		// 		this.highStatistic.value =response.hyper_percent;
		// 		this.normalStatistic.value = response.eu_percent;
		// 		this.lowStatistic.value = response.hypo_percent;
		// 		this.monthBloodSugar = response.enrty;
		// 		console.log(this.monthBloodSugar);
				
		// 	} catch(error){
		// 		console.error('获取月血糖数据时出错：' + error);
		// 	}
		// },
		formatTime(dateTime) {
		    // 将字符串时间转换为 Date 对象
		    const date = new Date(dateTime);
		      
		    // 获取月、日
		    const month = (date.getMonth() + 1).toString().padStart(2, '0');
		    const day = date.getDate().toString().padStart(2, '0');
		      
		    // 拼接月日
		    return `${month}-${day}`;
		},
		//获取月血糖数据并进行图像的数据渲染
		//获取血糖数据、统计值，并将其赋值于图表数据中
		async getBloodSugarData(){
			try{
				uni.showToast({
				  title: '加载较慢，请耐心等待...',
				  icon: 'none', // 这个是为了去掉默认的图标，节省空间
				  duration: 2000 // 调整显示时间，让用户有足够时间看到提示
				});
				//获取血糖和统计值数据
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
				//将血糖数据存储在数组中
				const timeArray = this.monthBloodSugar.map(item => this.formatTime(item.time));
				const maxArray = this.monthBloodSugar.map(item => item.max_val);
				const minArray = this.monthBloodSugar.map(item => item.min_val);
						
				this.chartData = {
				    categories: timeArray,
					series: [
					    {
					        name: "当天最高血糖",
					        data: maxArray
					    },
						{
							name:"当天最低血糖",
							data:minArray
						},
					],
				};
				
			} catch(error){
				console.log('获取该月数据时出错：' + error);
			}
		},
		//查看文本数据，跳转到文本数据页面
		switchToText(){
			uni.navigateTo({
				url : '/pages/index/monthlyHistoryText?selectedDate=' + JSON.stringify(this.loadedDate),
			});
		},
		//回本月
		goToNowButton(){
			// 更新日期为本月
			const today = new Date();
			this.loadedDate.year = today.getFullYear();
			this.loadedDate.month = today.getMonth() + 1;
			
			this.getBloodSugarData();    //重新渲染页面
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
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
    width: 100%;
    height: 300px;
}	
</style>