<template>
	<view class="container">
		<uni-row class="demo-uni-row" :width="nvueWidth">
			<uni-col :span="12">
				<image src="../../static/ex_avatar.png" mode="aspectFill" style="width: 100%; height: 200px;"></image>
			</uni-col>
			<uni-col :span="12">
				<view class="intro">张大强</view>
				<button class="flex-item" type="primary" @click="exit">退出</button>
			</uni-col>
		</uni-row>
		<uni-card :is-shadow="false">
			<uni-row class="demo-uni-row" :width="nvueWidth">
				<uni-col :span="12">
					<navigator url="/pages/mine/health" hover-class="navigator-hover">
						<image src="../../static/icon/health.png" mode="aspectFill" style="width: 100%; height: 200px;"></image>
						<view class="intro">健康档案</view>
					</navigator>
				</uni-col>
			</uni-row>
		</uni-card>
		<!--<uni-link :href="href" :text="href"></uni-link>-->
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/store/user';

// 获取 Pinia 用户 store
const userStore = useUserStore();

// 退出登录函数
function exit() {
  // 清除本地存储的 token
  console.log("exit前");
  console.log(userStore.userInfo);
  uni.removeStorageSync('jwt_token');

  // 调用 userStore 中的方法来清除用户信息
  userStore.clearUserInfo();
  console.log("exit后");
  console.log(userStore.userInfo);

  // 可选：重定向到登录页面或其他操作
}
// 定义响应式数据
const href = ref('https://uniapp.dcloud.io/component/README?id=uniui');

// 方法可以直接定义在 <script setup> 作用域中

</script>


<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
    .intro {
        font-size: 30px; /* 替换 18px 为你想要的字体大小 */
		font-weight: bold; /* 使用 bold 来将字体加粗 */
    }
</style>
