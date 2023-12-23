<!--选择记录类型页面 completed，完成，耶！-->
<template>
	<view class="container"> 
	    <view class="warp">
	        <br>
	        <text class="text">请选择您要查看的记录类型</text>
	        <br><br>
	        <button class="selectButton"  @click="leadToDayRecords()" :class="{'clicked' : this.isDaily}">血糖日记录</button>
	        <button class="selectButton" @click="leadToWeekRecords()" :class="{'clicked' : this.isWeekly}">血糖周记录</button>
	        <button class="selectButton" @click="leadToMonthRecords()" :class="{'clicked' : this.isMonthly}">血糖月记录</button>
	    </view>
		<button class="confirmButton" @click="leadToRecords()">确认</button>
	</view>
</template>


<script>
	export default{
		data(){
			return{
				isDaily: false,  //存储用户选择的是否是血糖日记录
				isWeekly:false,   //存储用户选择的是否是血糖周记录
				isMonthly:false,   //存储用户选择的是否是血糖月记录
			}
		},
	    methods:{
		    leadToDayRecords(){    //如果用户点击“血糖日记录”按钮，则将日记录置为true，其他置为false
				this.isDaily = true;
				this.isWeekly = false;
				this.isMonthly = false;
				console.log("Clicked  " + this.isDaily + " " + this.isWeekly + "  " + this.isMonthly);
		    },
		    leadToWeekRecords(){   //如果用户点击“血糖周记录”按钮，则将周记录置为true，其他置为false
			    this.isDaily = false;
				this.isWeekly = true;
				this.isMonthly = false;
				console.log("Clicked  " + this.isDaily + " " + this.isWeekly + "  " + this.isMonthly);
		    },
		    leadToMonthRecords(){    //如果用户点击“血糖月记录”按钮，则将月记录置为true，其他置为false
			    this.isDaily = false;
				this.isWeekly = false;
				this.isMonthly = true;
				console.log("Clicked  " + this.isDaily + " " + this.isWeekly + "  " + this.isMonthly);
		    },
			leadToRecords(){        //根据用户的选择，进行页面的跳转
			    console.log("Clicked  " + this.isDaily + " " + this.isWeekly + "  " + this.isMonthly);
				if(this.isDaily === true && this.isWeekly === false && this.isMonthly === false){
					//如果用户选择的是“查看血糖日记录”，则跳转到/pages/index/selectDay页面
					uni.navigateTo({
						url:'/pages/index/selectDay',
					});
				}
				else if(this.isDaily === false && this.isWeekly === true && this.isMonthly === false){
					//如果用户选择的是“查看血糖周记录”，则跳转到/pages/index/selectWeek页面
					uni.navigateTo({
						url:'/pages/index/selectWeek',
					});
				}
				else if(this.isDaily === false && this.isWeekly === false && this.isMonthly === true){
					//如果用户选择的是“查看血糖月记录”，则跳转到/pages/index/selectMonth页面
					uni.navigateTo({
						url:'/pages/index/selectMonth',
					});
				}
				else{
					//若以上三者都不是，则说明用户未选择或选择出错，则提示用户继续选择
					
				}
			}
	    }
	}
	
</script>

<style>
.selectButton{
	background-color: lightgray;
	color:black;
	margin-bottom:50px;
	margin-top:30px;
	font-size:25px;
	font-weight: bold;  /*加粗*/
	width:250px;
	height:70px;
	border-radius:999px;
}
.selectButton.clicked{
	border-style: solid;
	border-color: midnightblue;
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
}
</style>