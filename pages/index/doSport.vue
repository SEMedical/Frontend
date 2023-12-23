<template>
	<view class="container">
		<view class="intro">运动方案</view>
		<uni-card :is-shadow="false">
			<view>推荐每日运动消耗热量</view>
			<view class="intro">1234千卡</view>
			<view>您今天已消耗热量</view>
			<view class="intro">1234千卡</view>
			<view>今日目标达成，再接再厉！</view>
			<uni-row class="demo-uni-row" :width="nvueWidth">
			<view>您今天已消耗热量</view>
			<view class="intro">1234千卡</view>
			</uni-row>
		</uni-card>
		<uni-card :is-shadow="false">
			<uni-row class="demo-uni-row" :width="nvueWidth">
				<uni-col :span="12">
					<view>当前运动方案</view>
				</uni-col>
				<uni-col :span="12">
					<button class="flex-item" type="primary">重新选择</button>
				</uni-col>
			</uni-row>
			<view class="intro">快走</view>
			<view class="intro">1234千卡</view>
			<view class="intro">/40分钟</view>
		</uni-card>
		<!--<uni-link :href="href" :text="href"></uni-link>-->
	</view>
</template>

<script>
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