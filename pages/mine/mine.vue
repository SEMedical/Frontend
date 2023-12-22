<template>
	<view class="container">
		<uni-row class="demo-uni-row" :width="nvueWidth">
			<uni-col :span="12">
				<image src="../../static/ex_avatar.png" mode="aspectFill" style="width: 100%; height: 200px;"></image>
			</uni-col>
			<uni-col :span="12">
				<view class="intro">张大强</view>
				<button class="flex-item" type="primary">退出登录</button>
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

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {

		}
	}
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
