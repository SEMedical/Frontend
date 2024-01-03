<template>
  <view class="container">
    <view class="form-item">
      <text class="label">性别：</text>
      <radio-group @change="handleGenderChange">
        <radio value="男">男</radio>
        <radio value="女">女</radio>
      </radio-group>
    </view>

    <view class="form-item">
      <text class="label">年龄：</text>
      <input class="input" type="number" v-model="age" placeholder="请输入年龄" />
    </view>
    <button class="submit-btn" @tap="checkInput">提交</button>
    <text class="error-message">{{ errorMessage }}</text>
  </view>
</template>

<script>
export default {
  data() {
    return {
      gender: '', // 存储性别
      age: '',    // 存储年龄
      errorMessage: '' // 存储错误信息
    };
  },
  methods: {
    handleGenderChange(event) {
      // 处理性别选择改变事件
      this.gender = event.detail.value;
    },
    checkInput() {
      // 检查是否为男性且年龄为12
      if (this.gender === '男' && parseInt(this.age) === 12) {
        uni.navigateTo({
          url: '/pages/mine/getmes'
        });
      } else {
        // 显示错误信息
        this.errorMessage = '输入错误，请确保性别为男且年龄为12岁。';
      }
    }
  }
};
</script>
<style>
.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-item {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
}
.label {
  font-size: 20px;
  margin-right: 10px;
}
.input {
  width: 160px;
  height: 40px;
  border: 2px solid #3498db;
  border-radius: 8px;
  padding: 10px;
  font-size: 18px;
  color: #333;
  background-color: #f2f2f2; /* 背景颜色更柔和 */
}
.submit-btn {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
}
.error-message {
  color: red;
  margin-top: 20px;
  font-size: 16px;
}
</style>