<template>
	<view class="container">
		<scroll-view scroll-y="true" class="scroll-Y">
			<view class="title">我的运动数据</view>
			<br>
			<text class="smallTitle">近7天</text>
				<uni-row class="demo-uni-row" :width="nvueWidth">
					<uni-col :span="12">
						<view  class="smallTitle">运动</view>
						<view class="sportData">320分钟</view>
					</uni-col>
					<uni-col :span="12">
						<view  class="smallTitle">消耗</view>
						<view class="sportData">2286千卡</view>
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
				
				<uni-card :is-shadow="false"  style="border-radius: 20px;margin-top: 20px;">
					<text class="thirdTitle" style="margin-left: 20px;">注：以下数据皆来自于近七天</text>
					<view class="smallTitle">跑步</view>
					<!-- <view class="thirdTitle">近7天</view> -->
					<uni-row class="demo-uni-row" :width="nvueWidth">
						<uni-col :span="12">
							<view class="thirdTitle">总时长</view>
							<view class="sportData">200分钟</view>
						</uni-col>
						<uni-col :span="12">
							<view class="thirdTitle">共消耗</view>
							<view class="sportData">1866千卡</view>
						</uni-col>
					</uni-row>
				</uni-card>			
				<uni-card :is-shadow="false">
					<view class="smallTitle">骑行</view>
					<uni-row class="demo-uni-row" :width="nvueWidth">
						<uni-col :span="12">
							<view class="thirdTitle">总时长</view>
							<view class="sportData">30分钟</view>
						</uni-col>
						<uni-col :span="12">
							<view class="thirdTitle">共消耗</view>
							<view class="sportData">210千卡</view>
						</uni-col>
					</uni-row>
				</uni-card>
				<uni-card :is-shadow="false">
					<view class="smallTitle">瑜伽</view>
					<uni-row class="demo-uni-row" :width="nvueWidth">
						<uni-col :span="12">
							<view class="thirdTitle">总时长</view>
							<view class="sportData">90分钟</view>
						</uni-col>
						<uni-col :span="12">
							<view class="thirdTitle">共消耗</view>
							<view class="sportData">210千卡</view>
						</uni-col>
					</uni-row>
				</uni-card>
				<!-- <uni-card :is-shadow="false">
					<view class="smallTitle">瑜伽</view>
					<uni-row class="demo-uni-row" :width="nvueWidth">
						<uni-col :span="12">
							<view class="thirdTitle">总时长</view>
							<view class="sportData">1234分钟</view>
						</uni-col>
						<uni-col :span="12">
							<view class="thirdTitle">共消耗</view>
							<view class="sportData">1234千卡</view>
						</uni-col>
					</uni-row>
				</uni-card> -->
			
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
//存储图片的配置选项
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
	return `${month}-${day}`;
}; */



const getSportRecord = async () => {
  try {
	  //获取每天的运动分钟数
    const response = await sportAPI.sportRecord();
	minute_record.value = response.minute_record;
	console.log(minute_record.value);
	
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
	  categories: dateArray,
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
		padding: 20px;
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