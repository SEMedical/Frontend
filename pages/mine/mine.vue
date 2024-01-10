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
	<!-- 当用户登录后显示用户 ID -->
	<navigator v-if="!isUserLoggedIn" url="/pages/login/login" hover-class="navigator-hover">
		<button type="primary" class="common-button">
		登录
		</button>
	</navigator>
		<!-- 当用户登录后显示用户 ID -->
	<navigator v-else url="/pages/login/login" hover-class="navigator-hover">
		<button click = "logout" type="primary" class="common-button">
		退出
		</button>
	</navigator>
    <uni-card :is-shadow="true" style="border-radius: 20px;">
      <uni-row class="demo-uni-row" :width="nvueWidth">
        <uni-col :span="12" style="text-align: center;">
          <navigator url="/pages/mine/health" hover-class="navigator-hover">
            <image src="../../static/icon/health.png" mode="aspectFill" style="width: 80px; height: 80px;margin-left: 20px;margin-top: 10px;"></image>
            <view class="healthFile">健康档案</view>
          </navigator>
        </uni-col>
      </uni-row>
    </uni-card>
  </view>
</template>

<script setup>
	import { ref, computed, onMounted } from 'vue';
	import { useUserStore } from '@/store/user';
	const userStore = useUserStore();
	console.log('当前 userInfo 值:', userStore);
	const isUserLoggedIn = computed(() => {
	  // 检查 userInfo 对象是否有键，即是否不为空
	  return Object.keys(userStore.userInfo).length > 0;
	});
</script>
<style>
.container {
  padding: 0px;
  font-size: 14px;
  line-height: 24px;
}

.intro {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px; 
  margin-left: 60px;
}
.healthFile{
	font-size: 20px;
	font-weight: bold;
	margin-top: 10px; 
	color: black;
	margin-left: 20px;
}
.common-button{
	border-radius: 20px; /* 调整圆角半径的值以达到你想要的效果 */
	background: linear-gradient(to right, #79faeb, #4ac2be); /* 使用线性渐变，可以根据需要调整颜色值 */
}
</style>
