<template>
  <uni-card v-for="(question, index) in question_list" :key="index" :body-style="{ padding: '0px' }" style="width: 300px">
    <p>{{ index + 1 }}. {{ question}}</p>
    <uni-section title="选项" type="line">
        <view class="uni-px-5 uni-pb-5">
	      <uni-data-checkbox v-model="userResponses[index]" :localdata="Options"></uni-data-checkbox>
        </view>
      </uni-section>
  </uni-card>
  <button class="flex-item" type="primary" @click="submit">提交</button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import sportAPI from '@/api/sport';

const question_list = ref([]);
const userResponses = ref([]);
const Options = [{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }];

const getQuestionnaire1 = async () => {
  try {
    console.log('发送获取问卷调查问题的请求');
    const response = await sportAPI.questionnaire1();
    console.log('后端响应:', response);
    question_list.value = response.response;

    // 初始化 userResponses 数组
    userResponses.value = question_list.value.map(() => null);
  } catch (error) {
    console.error('获取问卷调查问题时出错：', error);
  }
};

const submit = async () => {
  try {
    // 调用 questionnaire2 函数提交用户的答案
    console.log(userResponses.value);
    const response = await sportAPI.questionnaire2(userResponses.value);
    console.log('问卷2提交后端响应:', response);
	// 将响应数据存储在本地
	uni.setStorageSync('questionnaire1Response', JSON.stringify(response));
    uni.navigateTo({
      url: '/pages/index/questionnaire2'
    });
  } catch (error) {
    console.error('提交问卷2时出错：', error);
  }
};

onMounted(() => {
  getQuestionnaire1();
});
</script>


<style>
</style>
