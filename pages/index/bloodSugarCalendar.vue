<template>
	<view class="container">
		<navigator url="/pages/index/selectRecordType" hover-class="navigator-hover">
		    <button type="default">选择</button>
		</navigator>
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