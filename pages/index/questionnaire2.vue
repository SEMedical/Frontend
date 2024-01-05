<template>
  <uni-card v-for="(question, index) in question_list" :key="index" :body-style="{ padding: '0px' }" style="width: 300px">
    <p>{{ index + 1 }}. {{ question.question }}</p>
    <uni-section title="选项" type="line">
        <view class="uni-px-5 uni-pb-5">
          <uni-data-checkbox v-model="userResponses[index].question_ans" :localdata="Options"></uni-data-checkbox>
        </view>
      </uni-section>
  </uni-card>
  <button class="flex-item" type="primary" @click="submit">提交</button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import sportAPI from '@/api/sport';

const question_list = ref([]);
const userResponses = ref([{
	"question_no": 0,
	"question_ans": null
}]);
const Options = ref([{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }]);

const generateInitialAnswers = (questions) => {
  return questions.map(question => ({ question_no: question.question_no, question_ans: null }));
};

const getQuestionnaire2 = async () => {
  try {
    console.log('发送获取问卷调查问题的请求');
	const questionnaire1Response = uni.getStorageSync('questionnaire1Response');
	console.log(questionnaire1Response)
	if (questionnaire1Response) {
	    const parsedResponse = JSON.parse(questionnaire1Response);
	    console.log('第一个问卷的响应数据:', parsedResponse.response);
		question_list.value = parsedResponse.response;
		userResponses.value = generateInitialAnswers(parsedResponse.response);
		console.log('answer:', userResponses.value)
	}
    // 初始化 userResponses 数组
    // userResponses.value = question_list.value.map(() => null);
  } catch (error) {
    console.error('获取问卷调查问题时出错：', error);
  }
};

const submit = async () => {
  try {
    // 调用 questionnaire2 函数提交用户的答案
    console.log(userResponses.value);
    const response = await sportAPI.recommendedSportPlan(userResponses.value);
    console.log('问卷2提交后端响应:', response);
    // 在这里处理提交逻辑，例如向下一个页面跳转
	uni.setStorageSync('questionnaire2Response', JSON.stringify(response));
	uni.navigateTo({url: '/pages/index/recommendedSportPlan'});
  } catch (error) {
    console.error('提交问卷2时出错：', error);
  }
};

onMounted(() => {
  // 获取第一次问卷的数据
  getQuestionnaire2();
});
</script>
