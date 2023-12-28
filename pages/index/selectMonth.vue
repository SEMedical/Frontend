<template>
	<view class="container">
		<view class="warp">
		    <br>
		    <text class="text">请选择您要查看的月</text>
		    <br><br>
		    <!--日历-->
			<view class="uni-padding-wrap">
				<view class="uni-title">请注意：您仅可查看一年之内的血糖数据</view>
			</view>
			<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
				<picker-view-column>
				    <view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
				</picker-view-column>
				<picker-view-column>
				    <view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
				</picker-view-column>
			</picker-view>
		</view>
		
		<button class="confirmButton" @tap="leadToRecords()">确认</button>
	</view>
</template>

<script>
export default {
	data: function () {
	            const date = new Date()
	            const years = []
	            const year = date.getFullYear()
	            const months = []
	            const month = date.getMonth() + 1
	            for (let i = 1990; i <= date.getFullYear(); i++) {
	                years.push(i)
	            }
	            for (let i = 1; i <= 12; i++) {
	                months.push(i)
	            }
	            return {
	                title: 'picker-view',
	                years,
	                year,
	                months,
	                month,
	                value: [9999, month - 1],
	                visible: true,
	                indicatorStyle: `height: 50px;`,
					selectedDate: {
						year: this.year,
						month: this.month,
				    },
	            }
	        },
	
	methods: {
	    bindChange: function (e) {
	        const val = e.detail.value
	        this.year = this.years[val[0]]
	        this.month = this.months[val[1]]
			
			this.selectedDate = {
			    year: this.year,
			    month: this.month,
			};
	    },
		leadToRecords(){
			const currentDate = new Date(); // 当前日期
			const selectedDate = new Date(this.year, this.month - 1); // 选择的日期
			
			// 检查选择的日期是否在当前日期或之前
			if (selectedDate <= currentDate) {
			    // 计算日期差异，以月为单位
			    const monthDiff = (currentDate.getFullYear() - selectedDate.getFullYear()) * 12 +
			        (currentDate.getMonth() - selectedDate.getMonth());
			    
			    if (monthDiff >= 0 && monthDiff <= 12) {
			        // 用户选择的月份在当前日期的一年内或之后（考虑到跨年的情况）
			        const url = '/pages/index/monthlyHistoryGraphic?selectedDate=' + JSON.stringify(this.selectedDate);
			        uni.navigateTo({
			            url: url,
			        });
			    } else {
			        // 显示提示，选择的日期不在一年内
			        uni.showToast({
			        title: '请选择一年内的月份',
			        icon: 'none',
			        });
			    }
			} else {
			    // 显示提示，选择的日期在当前日期之后
			    uni.showToast({
			        title: '当月无可查看的血糖数据！',
			        icon: 'none',
			    });
			}
		},
	},
}
</script>

<style>
.container {
	padding: 20px;
	font-size: 14px;
	line-height: 24px;
}
.text{
	font-size:25px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom:10px;
	margin-top:10px;
	font-weight: bold;
	
}
.confirmButton{
	background-color:green;
	color:white;
	font-weight:bold;
	font-size:20px;
	width:200px;
	height:50px;
	border-radius:999px;
	margin-top:100px;
}
.picker-view {
	width: 750rpx;
	height: 600rpx;
	margin-top: 20rpx;
}
.item {
	line-height: 100rpx;
	text-align: center;
}	
</style>