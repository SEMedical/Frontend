<template>
  <view class="container">
    <uni-card :is-shadow="true" style="border-radius: 20px;">
      <uni-row :width="nvueWidth">
       <uni-col :span="18">
         <!-- Input fields for modifying data -->
         <label for="gender">性别：</label>
         <input id="gender" v-model="gender" placeholder="请输入性别" class="input-field" />

         <label for="age">年龄：</label>
         <input id="age" v-model="age" placeholder="请输入年龄" class="input-field" />

         <label for="height">身高：</label>
         <input id="height" v-model="height" placeholder="请输入身高" class="input-field" />

         <label for="weight">体重：</label>
         <input id="weight" v-model="weight" placeholder="请输入体重" class="input-field" />

         <label for="diabetesType">糖尿病类型：</label>
         <input id="diabetesType" v-model="diabetesType" placeholder="请输入糖尿病类型" class="input-field" />

         <label for="complications">并发症：</label>
         <input id="complications" v-model="complications" placeholder="请输入并发症" class="input-field" />

         <label for="diagnosisYear">确诊年份：</label>
         <input id="diagnosisYear" v-model="diagnosisYear" placeholder="请输入确诊年份" class="input-field" />

         <label for="familyHistory">家族病史：</label>
         <input id="familyHistory" v-model="familyHistory" placeholder="请输入家族病史" class="input-field" />

         <!-- Save button -->
		 <button type="primary" class="common-button" @click="saveData">
		 保存
		 </button>
       </uni-col>

      </uni-row>
    </uni-card>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import messrequest from '@/api/messrequest';
const gender = ref('');
const age = ref('');
const height = ref('');
const weight = ref('');
const diabetesType = ref('');
const complications = ref('');
const diagnosisYear = ref('');
const familyHistory = ref('');
onMounted(async () => {
  try {
    const response = await messrequest.getUserInfo();
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
// Function to save modified data
const saveData = async () => {
  try {
    // Assuming saveData is your API request function
    await messrequest.saveUserData({
      gender: gender.value,
      age: age.value,
      height: height.value,
      weight: weight.value,
      diabetesType: diabetesType.value,
      complications: complications.value,
      diagnosisYear: diagnosisYear.value,
      familyHistory: familyHistory.value,
    });
    console.log('数据保存成功');
	uni.showToast({ title: '保存方案成功' });
	setTimeout(() => { uni.navigateBack({ delta: 5 }); }, 1000);
  } catch (error) {
    console.error('保存数据时出错：', error);
  }
};
</script>

<style>
.container {
  padding: 0px;
  font-size: 14px;
  line-height: 24px;
}
.avatar-row {
  margin-bottom: 20px;
}
.avatar {
  width: 180px;
  height: 180px;
  border-radius: 50%;
}
.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.intro2 {
  font-size: 40px;
  font-weight: bold;
  margin-top: 20px;
}

.common-button{
	border-radius: 20px; /* 调整圆角半径的值以达到你想要的效果 */
	background: linear-gradient(to right, #79faeb, #4ac2be); /* 使用线性渐变，可以根据需要调整颜色值 */
}
</style>
