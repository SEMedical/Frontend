<template>
	<view class="container">
		<view class="intro">运动方案</view>
		<uni-card :is-shadow="false"  style="border-radius: 20px;">
			<view class="text">推荐每日运动消耗热量</view>
			<view class="intro">1234千卡</view>
			<view class="text">您今天已消耗热量</view>
			<view class="intro">1234千卡</view>
			<view class="text">今日目标达成，再接再厉！</view>
			<uni-row class="demo-uni-row" :width="nvueWidth">
			</uni-row>
		</uni-card>
		<uni-card :is-shadow="false"  style="border-radius: 20px;">
			<uni-row class="demo-uni-row" :width="nvueWidth">
				<uni-col :span="12">
					<view class="text">当前运动方案</view>
				</uni-col>
				<uni-col :span="12">
					<navigator url="/pages/index/questionnaire0" hover-class="navigator-hover">
						<button class="reSelectButton">重新选择</button>
					</navigator>
				</uni-col>
			</uni-row>
			<view class="sportSchemeText">快走</view>
			<view class="sportSchemeText">1234千卡</view>
			<view class="sportSchemeText">/40分钟</view>
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
		margin-bottom: 20px;
		color: black;
		margin-left: 10px;
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
	    border-radius: 20px; /* 调整圆角半径的值以达到你想要的效果 */
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果，可根据需要调整参数 */
		transition: transform 0.3s ease-in-out; /* 添加过渡效果 */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		line-height: 1.2;
		}
	.text{
		font-size:15px;
		color:black;
		margin-bottom: 15px;
	}
	.reSelectButton{
		weight:60px;
		height:35px;
		font-size: 18px;
		background-color: aquamarine;
		border-style: solid;
		display: flex;
		justify-content: center;
		align-items: center;
		border-color: aqua;
	}
	.sportSchemeText{
		font-size: 25px; /* 替换 18px 为你想要的字体大小 */
		
		margin-bottom: 10px;
		color: black;
		margin-left: 10px;
	}
</style>