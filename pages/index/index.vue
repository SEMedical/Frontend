<template>
	<view class="container">
		
		<uni-title type="h1" title="2023年11月28日"></uni-title>
		<image src="../../static/home1.png"  class="homeimage"></image>
		<uni-card :is-shadow="false">
			<uni-row class="demo-uni-row" :width="nvueWidth">
				<uni-col :span="8">
					<navigator url="/pages/index/sportHistory" hover-class="navigator-hover">
						<button class="flex-item round-button blue-button">
							<image src="../../static/icon/history.png" style="width:50px; height: 50px;"></image>
						</button>
						<view>运动历史</view>
					</navigator>
				</uni-col>
				<uni-col :span="8">
					<navigator url="/pages/index/doSport" hover-class="navigator-hover">
						<button class="flex-item round-button green-button">
							<image src="../../static/icon/sport.png" style="width: 50px; height: 50px;"></image>
						</button>
						<view>我要运动</view>
					</navigator>
				</uni-col>
				<uni-col :span="8">
					<navigator url="/pages/index/bloodSugarCalendarGraphic" hover-class="navigator-hover">
						<button class="flex-item round-button yellow-button">
							<image src="../../static/icon/calendar.png" style="width: 50px; height: 50px;"></image>
						</button>
						<view>血糖日历</view>
					</navigator>
				</uni-col>
			</uni-row>
		</uni-card>
		<uni-card :is-shadow="false">
			当前血糖{{ bloodsugar }}mol/L，当前血糖处于正常水平，真是令人高兴呐！
		</uni-card>
		<!--<uni-link :href="href" :text="href"></uni-link>-->
	</view>
</template>

<script setup>
import { ref, onMounted} from 'vue';
import bloodSugar from '@/api/bloodSugar';

const bloodsugar = ref([])

const getRealTimeBloodSugar = async () => {
  try {
    const response = await bloodSugar.realTimeBloodSugar();
	bloodsugar.value = response;
  } catch (error) {
    console.error('获取血糖数据时出错：', error);
  }
};

onMounted(() => {
  getRealTimeBloodSugar();
});
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
	.round-button {
	  /* 设置宽度和高度相等，使按钮变为圆形 */
	  width: 80px;
	  height: 80px;
	  border-radius: 50%; /* 将边框半径设置为50%，使其成为圆形 */
	
	  /* 设置按钮样式 */
	  color: #fff; /* 文字颜色为白色，以适应渐变背景 */
	  border: none; /* 去除按钮边框 */
	  cursor: pointer;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	.blue-button{
		/* 添加渐变颜色 */
		background: linear-gradient(to right, #79faeb, #4ac2be); /* 使用线性渐变，可以根据需要调整颜色值 */
	}
	.green-button{
		/* 添加渐变颜色 */
		background: linear-gradient(to right, #6afa80, #5bcb8e); /* 使用线性渐变，可以根据需要调整颜色值 */
	}
	.yellow-button{
		/* 添加渐变颜色 */
		background: linear-gradient(to right, #fae018, #d5d524); /* 使用线性渐变，可以根据需要调整颜色值 */
	}
		
	image {
		display: block;
		margin: 0 auto;
	}
	.homeimage{
		width: 330px;
		height:190px;
	}
	
</style>
