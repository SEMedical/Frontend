<template>
	<view class="container">
		
		<view class="intro">我的运动数据</view>
		<view>近7天</view>
		<uni-row class="demo-uni-row" :width="nvueWidth">
			<uni-col :span="12">
				<view>运动</view>
				<view class="intro">1234分钟</view>
			</uni-col>
			<uni-col :span="12">
				<view>消耗</view>
				<view class="intro">1234千卡</view>
			</uni-col>
		</uni-row>
		<uni-card :is-shadow="false">
			<view class="intro">跑步</view>
			<view>近7天</view>
			<uni-row class="demo-uni-row" :width="nvueWidth">
				<uni-col :span="12">
					<view>总时长</view>
					<view class="intro">1234分钟</view>
				</uni-col>
				<uni-col :span="12">
					<view>共消耗</view>
					<view class="intro">1234千卡</view>
				</uni-col>
			</uni-row>
		</uni-card>
		<!--<uni-card :is-shadow="false">
			<view class="intro">骑行</view>
			<uni-row class="demo-uni-row" :width="nvueWidth">
				<uni-col :span="12">
					<view>总时长</view>
					<view class="intro">1234分钟</view>
				</uni-col>
				<uni-col :span="12">
					<view>共消耗</view>
					<view class="intro">1234千卡</view>
				</uni-col>
			</uni-row>
		</uni-card>
		<uni-card :is-shadow="false">
			<view class="intro">瑜伽</view>
			<uni-row class="demo-uni-row" :width="nvueWidth">
				<uni-col :span="12">
					<view>总时长</view>
					<view class="intro">1234分钟</view>
				</uni-col>
				<uni-col :span="12">
					<view>共消耗</view>
					<view class="intro">1234千卡</view>
				</uni-col>
			</uni-row>
		</uni-card>-->
	</view>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import sportAPI from '@/api/sport';
const sport_list = ref([]);
const total_sport = ref([]);
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
</style>