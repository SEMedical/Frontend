<template>
  <view class="container">
    <uni-row class="demo-uni-row" :width="nvueWidth">
      <uni-col :span="10">
        <image src="../../static/ex_avatar.png" mode="aspectFill" style="width: 180px; height: 180px;"></image>
      </uni-col>
      <uni-col :span="14">
        <view class="intro2">张大强</view>
      </uni-col>
    </uni-row>
    <uni-card :is-shadow="false">
      <uni-row class="demo-uni-row" :width="nvueWidth">
        <uni-col :span="18">
          <view class="intro">性别：{{ gender }}</view>
          <view class="intro">年龄：{{ age }}</view>
          <view class="intro">身高：{{ height }}</view>
          <view class="intro">体重：{{ weight }}</view>
          <view class="intro">糖尿病类型：{{ diabetesType }}</view>
          <view class="intro">并发症：{{ complications }}</view>
          <view class="intro">确诊年份：{{ diagnosisYear }}</view>
          <view class="intro">家族病史：{{ familyHistory }}</view>
        </uni-col>
      </uni-row>
    </uni-card>
	<navigator url='/pages/mine/getmes' hover-class="navigator-hover">
	  <view class="intro">修改</view>
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
  padding: 20px;
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
</style>
