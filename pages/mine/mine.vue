<template>
  <view class="container">
    <uni-row class="demo-uni-row" :width="nvueWidth">
      <uni-col :span="8" style="margin-bottom: 10px; padding-left: 8px;">
        <image src="../../static/ex_avatar.png" mode="aspectFill" style="width: 120px; height: 120px; border-radius: 50%;"></image>
      </uni-col>
      <uni-col :span="16" style="margin-top: 10px; padding-left: 6px;">
        <view class="intro">张大强</view>
		<view style="height: 6px;"></view> <!-- 添加的空行 -->
      </uni-col>
    </uni-row>
    <uni-card :is-shadow="false" style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden;border-radius: 20px;">
      <uni-row class="demo-uni-row" :width="nvueWidth">
        <uni-col :span="12" style="margin-bottom: 250px;">
          <navigator url="/pages/mine/health" hover-class="navigator-hover">
            <image src="../../static/icon/health.png" mode="aspectFill" style="width: 80px; height: 80px;margin-left: 20px;margin-top: 10px;"></image>
            <view class="healthFile">健康档案</view>
          </navigator>
        </uni-col>
      </uni-row>
    </uni-card>
  </view>
</template>

<script>
export default {
  data() {
    return {
      nvueWidth: 100 // You can adjust this width value as needed
    };
  },
  methods: {}
};
</script>
<style>
.container {
  padding: 20px;
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
</style>
