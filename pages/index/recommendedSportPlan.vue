<template>
  <div class="full-container">
    <div class="decorative-bg"></div>
    <div class="center-container">
      <div class="content-box">
        <h2 class="title">推荐运动方案</h2>
        <div class="card-container" v-for="item in scenario">
          <uni-card  :key="index" :body-style="{ padding: '20px' }" style="width: 300px">
            <p class="category">类别：{{ item.category }}</p>
            <p class="duration">时长：{{ item.duration }}分钟</p>
          </uni-card>
        </div>
		<button @click="Save">确认</button>
		<button @click="Back">返回主页</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const scenario = ref([]);
const Save=()=>{
	uni.showToast({ title: '保存方案成功' });
	setTimeout(() => { uni.navigateBack({ delta: 5 }); }, 1000);
}
const Back=()=>{
	setTimeout(() => { uni.navigateBack({ delta: 5 }); }, 10);
}
const getRecommendedSportPlan = async () => {
  try {
    const parsedResponse = uni.getStorageSync('questionnaire2Response');
    const response = JSON.parse(parsedResponse);
    console.log('后端响应:', response);
    scenario.value = response.response.scenario;
  } catch (error) {
    console.error('获取推荐散步方案时出错：', error);
  }
};

onMounted(() => {
  // 在组件挂载时调用获取推荐散步方案的函数
  getRecommendedSportPlan();
});
</script>

<style scoped>
.full-container {
  position: relative;
}

.decorative-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #3498db; /* Adjust the background color */
  opacity: 0.2; /* Adjust the opacity as needed */
}

.center-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Adjust the height as needed */
}

.content-box {
  background-color: #fff; /* White box background color */
  padding: 20px;
  border-radius: 10px; /* Optional: Add border-radius for rounded corners */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Optional: Add box-shadow for a subtle lift */
}

.title {
  font-size: 30px;
  margin-bottom: 30px;
  color: #333; /* Adjust the text color */
}

.card-container {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.category, .duration {
  margin: 0;
  font-size: 16px;
  color: #333; /* Adjust the text color */
}

</style>
