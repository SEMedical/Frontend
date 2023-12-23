<!--选择要查看的日期的界面-->
<!--completed-->
<template>
	<view class="container">
		<view class="warp">
		    <br>
		    <text class="text">请选择您要查看的日期</text>
		    <br><br>
		    <!--日历-->
			<view class="uni-padding-wrap">
				<view class="uni-title">请注意：您仅可查看15天之内的血糖数据</view>
			</view>
			<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
				<picker-view-column>
				    <view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
				</picker-view-column>
				<picker-view-column>
				    <view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
				</picker-view-column>
				<picker-view-column>
				    <view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
				</picker-view-column>
			</picker-view>
		</view>
		
		<button class="confirmButton" @click="leadToRecords()">确认</button>
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
	            const days = []
	            const day = date.getDate()
	            for (let i = 1990; i <= date.getFullYear(); i++) {
	                years.push(i)
	            }
	            for (let i = 1; i <= 12; i++) {
	                months.push(i)
	            }
	            for (let i = 1; i <= 31; i++) {
	                days.push(i)
	            }
	            return {
	                title: 'picker-view',
	                years,
	                year,
	                months,
	                month,
	                days,
	                day,
	                value: [9999, month - 1, day - 1],
	                visible: true,
	                indicatorStyle: `height: 50px;`,
					selectedDate: {
						year: this.year,
						month: this.month,
						day: this.day,
				    },
	            }
	        },
	
	methods: {
	    bindChange: function (e) {
	        const val = e.detail.value
	        this.year = this.years[val[0]]
	        this.month = this.months[val[1]]
	        this.day = this.days[val[2]]
			
			this.selectedDate = {
			    year: this.year,
			    month: this.month,
			    day: this.day,
			};
	    },
		leadToRecords(){
			const currentDate = new Date(); // 当前日期
			const selectedDate = new Date(this.year, this.month - 1, this.day); // 选择的日期
			
			// 检查选择的日期是否在当前日期或之前
			if (selectedDate <= currentDate) {
			    // 计算日期差异，以天为单位
			    const timeDiff = currentDate.getTime() - selectedDate.getTime();
			    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)); // 注意修改为 Math.floor
			
			    if (daysDiff >= 0 && daysDiff <= 15) {
			        const url = '/pages/index/dailyHistoryGraphic?selectedDate=' + JSON.stringify(this.selectedDate);
			        uni.navigateTo({
			            url: url,
			        });
			    } else {
			        // 显示提示，选择的日期不在过去15天内
			        uni.showToast({
			        title: '请选择15天内的日期',
			        icon: 'none',
			        });
			    }
			} else {
			    // 显示提示，选择的日期在当前日期之后
			    uni.showToast({
			        title: '当天没有可查看的血糖数据！',
			        icon: 'none',
			    });
			}
		}
	}
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