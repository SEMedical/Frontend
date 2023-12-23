<template>
	<view class="container">
		
		<view class="intro">我的运动数据</view>
		<view>近15天</view>
		<uni-row class="demo-uni-row" :width="nvueWidth">
			<uni-col :span="12">
				<view>运动</view>
				<view class="intro">1234分钟</view>
			</uni-col>
			<uni-col :span="12">
				<view>消耗</view>
				<view class="intro">1234千卡</view>
			</uni-col>
		</uni-row>
		<uni-card :is-shadow="false">
			<view class="intro">跑步</view>
			<uni-row class="demo-uni-row" :width="nvueWidth">
				<uni-col :span="12">
					<view>总时长</view>
					<view class="intro">1234分钟</view>
				</uni-col>
				<uni-col :span="12">
					<view>共消耗</view>
					<view class="intro">1234千卡</view>
				</uni-col>
			</uni-row>
		</uni-card>
		<uni-card :is-shadow="false">
			<view class="intro">骑行</view>
			<uni-row class="demo-uni-row" :width="nvueWidth">
				<uni-col :span="12">
					<view>总时长</view>
					<view class="intro">1234分钟</view>
				</uni-col>
				<uni-col :span="12">
					<view>共消耗</view>
					<view class="intro">1234千卡</view>
				</uni-col>
			</uni-row>
		</uni-card>
		<uni-card :is-shadow="false">
			<view class="intro">瑜伽</view>
			<uni-row class="demo-uni-row" :width="nvueWidth">
				<uni-col :span="12">
					<view>总时长</view>
					<view class="intro">1234分钟</view>
				</uni-col>
				<uni-col :span="12">
					<view>共消耗</view>
					<view class="intro">1234千卡</view>
				</uni-col>
			</uni-row>
		</uni-card>
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