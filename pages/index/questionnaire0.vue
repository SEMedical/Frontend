<template>
	<br>
	<br>
	<uni-card :is-shadow="false" style="border-radius: 20px;">
		<view class="smallTitle">请再三确认您近期没有如下症状：</view>
		<view class="text">1. 急性感染<br>
		2. 心功能不全<br>
		3. 心律失常<br>
		4. 严重糖尿病肾病<br>
		5. 糖尿病足<br>
		6. 严重的眼底病变<br>
		7. 血栓<br>
		8. 血糖未得到较好控制 (>16.8 mmol/L)<br>
		9. 明显酮血症或酮症酸中毒</view>
		<br>
			<navigator url="/pages/index/questionnaire1" hover-class="navigator-hover">

			<button class="flex-item" type="primary">我没有以上任何一种症状</button>
			</navigator>
	</uni-card>
	
</template>

<script>
</script>

<style>
.Title{
	margin-top: 10px;
	font-size:30px;
	font-weight: bold;
	color: black;
	margin-bottom: 15px;
}
.text{
	font-size:17px;
	color: black;
    margin-top: 5px;
	line-height: 1.5;
}
.smallTitle{
	font-size:20px;
	color:black;
	font-weight: bold;
	margin-top: 10px;
	line-height: 1.3;
}
</style>