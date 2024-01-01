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
					<navigator url="/pages/index/questionnaire0" hover-class="navigator-hover">
						<button class="flex-item" type="primary">重新选择</button>
					</navigator>
				</uni-col>
			</uni-row>
			<view class="intro">快走</view>
			<view class="intro">1234千卡</view>
			<view class="intro">/40分钟</view>
		</uni-card>
		<!--<uni-link :href="href" :text="href"></uni-link>-->
		<navigator url="/pages/index/realTimeSport" hover-class="navigator-hover">
			<button class="flex-item round-button green-button floating-button">
				开始运动
			</button>
		</navigator>
	</view>
</template>

<script>
</script>

<style scoped>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
	.intro {
	    font-size: 30px; /* 替换 18px 为你想要的字体大小 */
		font-weight: bold; /* 使用 bold 来将字体加粗 */
	}
	.green-button{
		/* 添加渐变颜色 */
		background: linear-gradient(to right, #6afa80, #5bcb8e); /* 使用线性渐变，可以根据需要调整颜色值 */
	}
	.floating-button {
	    position: fixed;
	    bottom: 500px;
	    right: 60px;
	    width: 60px;
	    height: 60px;
	    border-radius: 25px;
	    background-color: #007BFF; /* 按钮的背景颜色 */
	    color: #fff; /* 按钮文字颜色 */
	    font-size: 16px;
	    border: none;
	    cursor: pointer;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	}
</style>