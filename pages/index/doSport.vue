<template>
	<view class="container">
		<view class="intro">运动方案</view>
		<uni-card :is-shadow="false"  style="border-radius: 20px;">
			<navigator url="/pages/index/realTimeSport" hover-class="navigator-hover">
				<button type="primary" class="common-button">
					开始运动
				</button>
			</navigator>
			<view class="text">推荐每日运动消耗热量</view>
			<view class="intro">{{recommend_calorie}}千卡</view>
			<view class="text">您今天已消耗热量</view>
			<view class="intro">{{total_calorie}}千卡</view>
			<view class="text">今日目标达成，再接再厉！</view>
			<uni-row class="demo-uni-row" :width="nvueWidth">
			</uni-row>
		</uni-card>
		<uni-card :is-shadow="false"  style="border-radius: 20px;">
			<uni-row class="demo-uni-row" :width="nvueWidth">
				<uni-col :span="12">
					<view class="text">当前运动方案</view>
				</uni-col>
				<uni-col :span="12">
					<navigator url="/pages/index/questionnaire0" hover-class="navigator-hover">
						
						<button type="primary" class="common-button">重新选择</button>
					</navigator>
				</uni-col>
			</uni-row>
			<uni-card>
			<view v-if='showWalking' class="sportSchemeText">快走</view>
			<view v-if='showJogging' class="sportSchemeText">慢跑</view>
			<view v-if='showYoga' class="sportSchemeText">瑜伽</view>
			<view v-if='showRopeSkipping' class="sportSchemeText">跳绳</view>
			
			<view class="sportSchemeText">{{recommend_calorie }}千卡</view>
			<view class="sportSchemeText">{{recommend_time }}分钟</view>
			</uni-card>
		</uni-card>
		<!--<uni-link :href="href" :text="href"></uni-link>-->
	</view>
</template>

<script setup>
	import { ref, computed, onMounted } from 'vue';
	import sportAPI from '@/api/sport';
	const total_time = ref([]);
	const total_calorie = ref([]);
	const sport_type = ref([]);
	const showJogging = computed(() => {
	  return sport_type.value=="jogging";
	});
	const showWalking = computed(() => {
	  return sport_type.value=="walking";
	});
	const showYoga = computed(() => {
	  return sport_type.value=="yoga";
	});
	const showRopeSkipping = computed(() => {
	  return sport_type.value=="ropeSkipping";
	});
	const recommend_time = ref([]);
	const recommend_calorie = ref([]);
	const is_finished = ref([]);
	const getSportPlan = async () => {
	  try {
	    const res = await sportAPI.sportPlan();
		const response=res.response;
		total_time.value = response.total_time;
		total_calorie.value = response.total_calorie;
		sport_type.value = response.sport_type;
		recommend_time.value = response.recommend_time;
		recommend_calorie.value = response.recommend_calorie;
		is_finished.value = response.is_finished;
		console.log("总运动时间",total_time.value);
	  } catch (error) {
	    console.error('获取运动数据时出错：', error);
	  }
	}
	onMounted(() => {
		console.log("xxxxxxxxxxx");
		getSportPlan();
	});
</script>


<style scoped>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
	.intro {
	    font-size: 30px; /* 替换 18px 为你想要的字体大小 */
		font-weight: bold; /* 使用 bold 来将字体加粗 */
		margin-bottom: 20px;
		color: black;
		margin-left: 10px;
	}
	.common-button{
		background: linear-gradient(to right, #79faeb, #4ac2be); /* 使用线性渐变，可以根据需要调整颜色值 */
	}

	.text{
		font-size:15px;
		color:black;
		margin-bottom: 15px;
	}

	.sportSchemeText{
		font-size: 25px; /* 替换 18px 为你想要的字体大小 */
		margin-bottom: 10px;
		color: black;
		margin-left: 10px;
	}
</style>