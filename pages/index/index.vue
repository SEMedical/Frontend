<template>
	<view class="container">
		
		<view class="intro">2023年11月28日</view>
		<image src="../../static/home1.png" mode="aspectFill" style="width: 100%; height: 200px;"></image>
		<uni-card :is-shadow="false">
			<uni-row class="demo-uni-row" :width="nvueWidth">
				<uni-col :span="8">
					<button class="flex-item" type="primary" :disabled="!canAdd" @click="add">运动历史</button>
				</uni-col>
				<uni-col :span="8">
					<button class="flex-item" type="warn" :disabled="!canRemove" @click="remove">我要运动</button>
				</uni-col>
				<uni-col :span="8">
					<button class="flex-item" type="primary" :disabled="!canAdd" @click="add">血糖日历</button>
				</uni-col>
			</uni-row>
		</uni-card>
		<uni-card :is-shadow="false">
			当前血糖5.6mol/L，当前血糖处于正常水平，真是令人高兴呐！
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
