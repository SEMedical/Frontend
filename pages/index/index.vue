<template>
	<view class="container">
		<br>
		<view style="font-size: 20px;">&nbsp;&nbsp;&nbsp;{{ formattedDate }}&nbsp;&nbsp;&nbsp;Hello&nbsp;{{user_name}}</view>
		<uni-card :is-shadow="true" style="border-radius: 20px;">
		<image src="../../static/home1.png" class="homeimage"></image>	
		</uni-card>
		<uni-card :is-shadow="true" style="border-radius: 20px;">
			<uni-row class="demo-uni-row" :width="nvueWidth">
				<uni-col :span="8" style="text-align: center;">
					<navigator url="/pages/index/sportHistory" hover-class="navigator-hover">
						<button class="flex-item round-button blue-button">
							<image src="../../static/icon/history.png" class="image-in-button" mode="aspectFill" style="width:50px; height: 50px;"></image>
						</button>
						<view>运动历史</view>
					</navigator>
				</uni-col>
				<uni-col :span="8" style="text-align: center;">
					<navigator url="/pages/index/doSport" hover-class="navigator-hover">
						<button class="flex-item round-button green-button">
							<image src="../../static/icon/sport.png" class="image-in-button" mode="aspectFill" style="width:50px; height: 50px;"></image>
						</button>
						<view>我要运动</view>
					</navigator>
				</uni-col>
				<uni-col :span="8" style="text-align: center;">
					<navigator url="/pages/index/bloodSugarCalendarGraphic" hover-class="navigator-hover">
						<button class="flex-item round-button yellow-button">
							<image src="../../static/icon/calendar.png" class="image-in-button" mode="aspectFill" style="width:50px; height: 50px;"></image>
						</button>
						<view>血糖日历</view>
					</navigator>
				</uni-col>
			</uni-row>
		</uni-card>
<!-- <<<<<<< Updated upstream -->
		<uni-card :is-shadow="true" :style="{ borderRadius: '20px', backgroundColor: cardColor }">
			<view>当前血糖<span style="font-size: 40px">{{ blood_sugar }}</span>mol/L,心率<span style="font-size: 40px">{{heart_rate}}</span>次/分钟
			<br>{{textContent}}</view>
<!-- =======
		<uni-card :is-shadow="false" style="border-radius: 20px;">
			<view :style="{ color: textColor}" class = "advice">&nbsp;&nbsp;当前血糖{{ blood_sugar }}mmol/L,心率{{heart_rate}}次/分钟<br>&nbsp;&nbsp;{{textContent}}！</view>
>>>>>>> Stashed changes -->
		</uni-card>
		<!--<uni-link :href="href" :text="href"></uni-link>-->
	</view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
//import { useUserStore } from '@/store/user';
import bloodSugarAPI from '@/api/bloodSugar';
import sportAPI from '@/api/sport';
import { useUserStore } from '@/store/user';
import userName from "@/api/userName"
const userStore = useUserStore();
console.log('当前 userInfo 值:', userStore);
const isUserLoggedIn = computed(() => {
  // 检查 userInfo 对象是否有键，即是否不为空
  return Object.keys(userStore.userInfo).length > 0;
});

const userInfo = computed(() => userStore.userInfo);
const blood_sugar = ref([])
const heart_rate = ref([])
const user_name=ref([]);

const getRealTimeBloodSugar = async () => {
  try {
    const response = await bloodSugarAPI.realTimeBloodSugar();
	blood_sugar.value = response;
	if (response > 13.3){
		uni.showToast({
			title: '您当前血糖过高，请立即休息！',
			icon:'none',
		});
	}
		
	else if(response < 2.8){
		uni.showToast({ 
			title: '您当前血糖过低，请立即休息！' ,
			icon:'none',
		});
	}
  } catch (error) {
    console.error('获取血糖数据时出错：', error);
  }
};

const getRealTimeHeartRate = async () => {
  try {
    const response = await sportAPI.realTimeHeartRate();
	heart_rate.value = response;
	if (response > 180){
		uni.showToast({ 
			title: '您当前心率过高，请立即休息！',
			icon:'none',
		});
	}
  } catch (error) {
    console.error('获取心率数据时出错：', error);
  }
};

//获取用户名
const getUserName = async () => {
	console.log(2);
  try {
	  console.log(1);
    const response = await userName.getUserName();
	console.log(response.response);
	user_name.value=response.response;
  } catch (error) {
    console.error('获取用户名数据时出错：', error);
  }
};
// 每5秒请求一次血糖数据
const bloodSugarIntervalId = setInterval(getRealTimeBloodSugar, 5000);

// 每5秒请求一次心率数据
const heartRateIntervalId = setInterval(getRealTimeHeartRate, 5000);

// 使用 ref 创建响应式变量
const currentDate = ref(new Date());
const formattedDate = ref("");

// 定义格式化日期的函数
const formatCurrentDate = () => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth() + 1;
  const day = currentDate.value.getDate();

  formattedDate.value = `${year}年${month}月${day}日`;
};

onMounted(() => {
  getRealTimeBloodSugar();
  getRealTimeHeartRate();
  formatCurrentDate();
  getUserName();
});

const textContent = computed(() => {
	if (blood_sugar.value < 3.9){
		return "血糖偏低，请注意！";
	}
	else if (blood_sugar.value > 10){
		return "血糖偏高，请注意！";
	}
	else{
		return "当前血糖处于正常水平，真是令人高兴啊！";
	}
});

const cardColor = computed(() => {
  if (blood_sugar.value < 3.9 || blood_sugar.value > 10) {
    return "#fed7c9";
  } else {
    return "#ffffff";
  }
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

	.blue-button {
	  background: #82eefa; /* 使用单一颜色，去掉渐变 */
	  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 添加阴影，可以根据需要调整阴影参数 */
	}

	.green-button {
	  background: #21e3a9; /* 使用单一颜色，去掉渐变 */
	  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 添加阴影，可以根据需要调整阴影参数 */
	}

	.yellow-button {
	  background: #e3e316; /* 使用单一颜色，去掉渐变 */
	  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 添加阴影，可以根据需要调整阴影参数 */
	}
	/* 图片样式 */
	.image-in-button {
		/* 直接设置图片大小，适应按钮大小 */
		width: 60px; /* 或者根据需要设置具体的宽度 */
		height: 60px; /* 或者根据需要设置具体的高度 */
	}
		
	image {
		display: block;
		margin: 0 auto;
	}
	
	.homeimage{
		width: 330px;
		height:190px;
	}
	.square-button {
		width: 70px;
		height: 50px;
		border-radius: 15px;
		margin-top: 10px; /* 调整上方空白的大小 */
	}

</style>
