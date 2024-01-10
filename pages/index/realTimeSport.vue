<template>
  <view class="page-container">
    <!-- 上半部分 - 蓝色 -->
    <view class="upper-half blue-background">
		<br>
      <view class="intro advice">&nbsp;&nbsp;&nbsp;&nbsp;快走时要保持直立的姿势，双臂自然摆动，注意膝盖弯曲的角度，避免膝关节受伤。</view>
    </view>

    <!-- 下半部分 - 白色 -->
    <view class="lower-half white-background">
      	<view style="font-size: 25px; font-weight: bold;">您已快走{{ distance }}公里，<br>
		用时{{time}},<br>当前心率{{heart_rate}}次/分钟,<br>
		当前配速{{speed}},<br>已消耗{{calorie}}kcal</view>
    </view>
	<navigator url="/pages/index/doSport" hover-class="navigator-hover">
		<button class="flex-item green-button floating-button" @click="stopDoingSport">
			<view class="intro center-text">停止</view>
		</button>
	</navigator>
  </view>
</template>

<script setup>
	import { ref, computed, onMounted } from 'vue';
	import sportAPI from '@/api/sport';
	
	const heart_rate = ref([]);
	
	const distance = ref([]);
	const time = ref([]);
	const speed = ref([]);
	const calorie = ref([]);

	const getRealTimeSportData = async () => {
	  try {
	    const response = await sportAPI.realTimeSportData();
		distance.value = response.distance.toFixed(2);
		time.value = response.time;
		speed.value = response.speed;
		console.log(speed.value);
		calorie.value = response.calorie;
	  } catch (error) {
	    console.error('获取实时运动数据时出错：', error);
	  }
	};
	
	/* const intervalId = setInterval(getRealTimeSportData, 5000); */
	let intervalId;
	const stopDoingSport = async () => {
	  try {
	    const response = await sportAPI.stopDoingSport();
		console.log(response.success);
		 clearInterval(intervalId); // 清除定时器
	  } catch (error) {
	    console.error('停止运动出错：', error);
	  }
	};
	
	const startDoingSport = async () => {
	  try {
		intervalId = setInterval(getRealTimeSportData, 5000);
	    const response = await sportAPI.startDoingSport();
		console.log(response.success);
	  } catch (error) {
	    console.error('停止运动出错：', error);
	  }
	};
	
	const getRealTimeHeartRate = async () => {
	  try {
	    const response = await sportAPI.realTimeHeartRate();
		heart_rate.value = response;
		console.log(heart_rate.value);
	  } catch (error) {
	    console.error('获取心率数据时出错：', error);
	  }
	};
	onMounted(() => {
		/* getRealTimeSportData(); */
		getRealTimeHeartRate(); 
		startDoingSport();
	});
	
</script>

<style scoped>
	.intro {
	    font-size: 30px; /* 替换 18px 为你想要的字体大小
		font-weight: bold; /* 使用 bold 来将字体加粗 */
		color: white;
	}
	.green-button{
		/* 添加渐变颜色 */
		background: linear-gradient(to right, #6afa80, #5bcb8e); /* 使用线性渐变，可以根据需要调整颜色值 */
	}
	.floating-button {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	    width: 100px;
	    height: 100px;
		border-radius: 50%;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 阴影效果，可以根据需要调整参数 */
		}

		.page-container {
		  display: flex;
		  flex-direction: column;
		  height: 100vh; /* 100%视窗高度，使得页面占满整个屏幕 */
		}
		
		.upper-half {
		  flex: 1;
		}
		
		.lower-half {
		  flex: 1;
		  display: flex;
		  align-items: center;
		  justify-content: center;
		  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		}
		
		.blue-background {
		  background-color: #aaffff;
		}
		
		.white-background {
		  background-color: white;
		}
		
		.center-text {
		    display: flex;
		    align-items: center;
		    justify-content: center;
		    height: 100%;
		}
		.advice {
		    font-size: 25px;
		    font-weight: bold;
		    color: #606060;
		    /* 添加左右边缘 */
		    padding-left: 30px;
		    padding-right: 30px;
		    /* 居中文本 */
		    display: flex;
		    align-items: center;
		    justify-content: center;
		    height: 100%;
		}
</style>