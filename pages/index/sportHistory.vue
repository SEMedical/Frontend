<template>
	<view class="container">
		<scroll-view scroll-y="true" class="scroll-Y">
			<view class="title">我的运动数据</view>
			<br>
			<text class="smallTitle">近7天</text>
				<uni-row class="demo-uni-row" :width="nvueWidth">
					<uni-col :span="12">
						<view  class="smallTitle">运动</view>
						<view class="sportData">{{total_minute}}分钟</view>
					</uni-col>
					<uni-col :span="12">
						<view  class="smallTitle">消耗</view>
						<view class="sportData">{{total_calorie}}千卡</view>
					</uni-col>
				</uni-row>
				
				<!--运动数据周报部分-->
				<uni-card :is-shadow="false"  style="border-radius: 20px;margin-top: 20px;">
					<text class="smallTitle">运动数据周报</text>
					<view class="charts-box">
						<qiun-data-charts 
							type="line"
							:opts="opts"
							:chartData="chartData"
							:ontouch="true"
						/>
						<text class="annonationText">注：左右滑动曲线图可查看更多的运动数据，点击曲线图上的点可查看该点的具体信息。</text>
					</view>
					
				</uni-card>
				
				<uni-card :is-shadow="false" v-if=showWalkingMinute style="border-radius: 20px;margin-top: 20px;">
					<text class="thirdTitle" style="margin-left: 20px;">注：以下数据皆来自于近七天</text>
					<view class="smallTitle">散步</view>
					<!-- <view class="thirdTitle">近7天</view> -->
					<uni-row class="demo-uni-row" :width="nvueWidth">
						<uni-col :span="12">
							<view class="thirdTitle">总时长</view>
							<view class="sportData">{{walking_minute}}分钟</view>
						</uni-col>
						<uni-col :span="12">
							<view class="thirdTitle">共消耗</view>
							<view class="sportData">{{walking_calorie}}千卡</view>
						</uni-col>
					</uni-row>
				</uni-card>			
				<uni-card :is-shadow="false" v-if=showJoggingMinute style="border-radius: 20px;margin-top: 20px;">
					<text class="thirdTitle" style="margin-left: 20px;">注：以下数据皆来自于近七天</text>
					<view class="smallTitle">慢跑</view>
					<!-- <view class="thirdTitle">近7天</view> -->
					<uni-row class="demo-uni-row" :width="nvueWidth">
						<uni-col :span="12">
							<view class="thirdTitle">总时长</view>
							<view class="sportData">{{jogging_minute}}分钟</view>
						</uni-col>
						<uni-col :span="12">
							<view class="thirdTitle">共消耗</view>
							<view class="sportData">{{jogging_calorie}}千卡</view>
						</uni-col>
					</uni-row>
				</uni-card>	
				<uni-card :is-shadow="false" v-if=showYogaMinute style="border-radius: 20px;margin-top: 20px;">
					<text class="thirdTitle" style="margin-left: 20px;">注：以下数据皆来自于近七天</text>
					<view class="smallTitle">瑜伽</view>
					<!-- <view class="thirdTitle">近7天</view> -->
					<uni-row class="demo-uni-row" :width="nvueWidth">
						<uni-col :span="12">
							<view class="thirdTitle">总时长</view>
							<view class="sportData">{{yoga_minute}}分钟</view>
						</uni-col>
						<uni-col :span="12">
							<view class="thirdTitle">共消耗</view>
							<view class="sportData">{{yoga_calorie}}千卡</view>
						</uni-col>
					</uni-row>
				</uni-card>	
				<uni-card :is-shadow="false" v-if=showRopeskippingMinute style="border-radius: 20px;margin-top: 20px;">
					<text class="thirdTitle" style="margin-left: 20px;">注：以下数据皆来自于近七天</text>
					<view class="smallTitle">跳绳</view>
					<!-- <view class="thirdTitle">近7天</view> -->
					<uni-row class="demo-uni-row" :width="nvueWidth">
						<uni-col :span="12">
							<view class="thirdTitle">总时长</view>
							<view class="sportData">{{ropeSkipping_minute}}分钟</view>
						</uni-col>
						<uni-col :span="12">
							<view class="thirdTitle">共消耗</view>
							<view class="sportData">{{ropeSkipping_calorie}}千卡</view>
						</uni-col>
					</uni-row>
				</uni-card>
				
			
		</scroll-view>
		
		
	</view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import sportAPI from '@/api/sport.js';
const sport_list = ref([]);
const total_sport = ref([]);
const minute_record = ref([]);
const chartData = ref([]);
const total_minute=ref([]);

const total_calorie=ref([]);
const walking_minute=ref();
const walking_calorie=ref();
const yoga_minute=ref();
const yoga_calorie=ref();
const jogging_minute=ref();
const jogging_calorie=ref();
const ropeSkipping_minute=ref();
const ropeSkipping_calorie=ref();
//存储图片的配置选项
const showWalkingMinute = computed(() => {
  return walking_minute.value!==null && walking_minute.value!==undefined	;
});
const showJoggingMinute = computed(() => {
  return jogging_minute.value!==null && jogging_minute.value!==undefined;
});
const showYogaMinute = computed(() => {
  return yoga_minute.value!==null && yoga_minute.value!==undefined;
});const showRopeskippingMinute = computed(() => {
  return ropeSkipping_minute.value!==null&& ropeSkipping_minute.value!==undefined;
});
const opts= ref ({
	color: ["#00ff00"], // 血糖折线的颜色
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
} );

/* function formatTime(dateTime) {
	// 将字符串时间转换为 Date 对象
	const date = new Date(dateTime);
	  
	// 获取月、日
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	  
	// 拼接月日
	return `${month}-${day}`
}; */



const getSportRecord = async () => {
  try {
	  //获取每天的运动分钟数
    const res = await sportAPI.getSportRecord();
	console.log("xxxx",res);
	const response=res.response;
	console.log(response);
	minute_record.value = response.minute_record;
	total_minute.value=response.total_minute;
	total_calorie.value=response.total_calorie;
	if(response.sport_records.walking!==undefined){
	
	walking_minute.value=response.sport_records.walking.minute;
	walking_calorie.value=response.sport_records.walking.calorie;}
	if(response.sport_records.jogging!==undefined){
	jogging_minute.value=response.sport_records.jogging.minute;
	jogging_calorie.value=response.sport_records.jogging.calorie;}
	if(response.sport_records.yoga!==undefined){
	yoga_minute.value=response.sport_records.yoga.minute;
	yoga_calorie.value=response.sport_records.yoga.calorie;}
	if(response.sport_records.ropeSkipping!==undefined){
	ropeSkipping_minute.value=response.sport_records.ropeSkipping.minute;
	ropeSkipping_calorie.value=response.sport_records.ropeSkipping.calorie;}
	// 获取一周内的日期
	const startDate = new Date(); // 当前日期
	const endDate = new Date(startDate);
	endDate.setDate(startDate.getDate() - 6); // 一周前的日期
	
	// 构建日期数组，只包含月和日
	const dateArray = [];
	while (startDate >= endDate) {
	  const month = (startDate.getMonth() + 1).toString().padStart(2, '0');
	  const day = startDate.getDate().toString().padStart(2, '0');
	  dateArray.push(`${month}-${day}`);
	  startDate.setDate(startDate.getDate() - 1);
	}
	console.log(dateArray);
	
    const minutesArray = minute_record.value;
	console.log(minutesArray);
	// 将日期和分钟数存储在数组中
	chartData.value = {
	  categories: dateArray.reverse(),
	  series: [
		{
		  name: "日运动时长(min)",
		  data: minutesArray,
		},
	  ],
	}
  } catch (error) {
    console.error('获取运动数据时出错：', error);
  }
};

onMounted(() => {
  getSportRecord();
});

/*const getSportRecord = async () => {
  try {
    const response = await sportAPI.sportRecord();
	for (const sport of response) {
		let type = '';
		let species = '';
	    if (adoptpet.SEX === 'M') {
	      gender = '弟弟';
	    } else if (adoptpet.SEX === 'F') {
	      gender = '妹妹';
	    }
	    if (adoptpet.SPECIES === 'cat') {
	      species = '猫';
	    } else if (adoptpet.SPECIES === 'dog') {
	      species = '狗';
	    }
	    console.log(adoptpet.PET_NAME);
	    pets.value.push({
	      id: adoptpet.PET_ID,
	      name: adoptpet.PET_NAME,
	      species: species,
	      gender: gender,
	      age: adoptpet.AGE,
	      image: adoptpet.AVATAR
	    });
  } catch (error) {
    console.error('获取运动数据时出错：', error);
  }
};*/
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
	.scroll-Y {
			height: 1500rpx;
	}
	.scroll-view-item {
			height: 1500rpx;
			line-height: 300rpx;
			text-align: center;
			font-size: 36rpx;
	}
	.title{
		font-size: 30px; /* 替换 18px 为你想要的字体大小 */
		font-weight: bold; /* 使用 bold 来将字体加粗 */
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.smallTitle{
		font-size: 17px;
		margin-top: 10px;
		margin-bottom: 10px;
		font-weight: bold;
		color: #000;
	}
	.thirdTitle{
		font-size: 15px;
		margin-bottom: 10px;
		color: #000;
	}
	.sportData{
		font-size: 25px; /* 替换 18px 为你想要的字体大小 */
		font-weight: bold; /* 使用 bold 来将字体加粗 */
		color: black;
	}
	.annonationText{
		font-size: 12px;;
	}
</style>