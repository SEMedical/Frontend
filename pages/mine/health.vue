<template>
  <view class="container">
    <uni-row class="demo-uni-row" :width="nvueWidth">
      <uni-col :span="8" style="margin-bottom: 10px; padding-left: 8px;">
        <image src="../../static/ex_avatar.png" mode="aspectFill" style="width: 120px; height: 120px; border-radius: 50%;"></image>
      </uni-col>
      <uni-col :span="16" style="margin-top: 10px; padding-left: 6px;">
        <view class="intro">用户名</view>
		<view style="height: 6px;"></view> <!-- 添加的空行 -->
      </uni-col>
    </uni-row>
    <uni-card :is-shadow="true" style="border-radius: 20px;">
      <uni-row class="demo-uni-row" :width="nvueWidth">
        <uni-col :span="18">
          <view>性别：{{ gender }}</view>
          <view>年龄：{{ age }}</view>
          <view>身高：{{ height }}</view>
          <view>体重：{{ weight }}</view>
          <view>糖尿病类型：{{ diabetesType }}</view>
          <view>并发症：{{ complications }}</view>
          <view>确诊年份：{{ diagnosisYear }}</view>
          <view>家族病史：{{ familyHistory }}</view>
        </uni-col>
      </uni-row>
    </uni-card>
	<navigator url='/pages/mine/getmes' hover-class="navigator-hover">
	  <button type="primary" class="common-button">
	  修改
	  </button>
	</navigator>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// 导入接口请求函数，这里假设你已经有了相应的接口请求函数
import messrequest from '@/api/messrequest';

// 定义变量
const gender = ref('');
const age = ref('');
const height = ref('');
const weight = ref('');
const diabetesType = ref('');
const complications = ref('');
const diagnosisYear = ref('');
const familyHistory = ref('');

// 获取接口数据
onMounted(async () => {
  try {
    // 假设 fetchData 是你的接口请求函数
    const response = await messrequest.getUserInfo(); // 调用接口请求函数
    // 将接口返回的数据赋值给相应的变量
    gender.value = response.gender;
    age.value = response.age;
    height.value = response.height;
    weight.value = response.weight;
    diabetesType.value = response.diabetesType;
    complications.value = response.complications;
    diagnosisYear.value = response.diagnosisYear;
    familyHistory.value = response.familyHistory;
  } catch (error) {
    console.error('获取数据时出错：', error);
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
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

.intro2 {
  font-size: 40px;
  font-weight: bold;
  margin-top: 50px;
}

.common-button{
	border-radius: 20px; /* 调整圆角半径的值以达到你想要的效果 */
	background: linear-gradient(to right, #79faeb, #4ac2be); /* 使用线性渐变，可以根据需要调整颜色值 */
}
</style>
