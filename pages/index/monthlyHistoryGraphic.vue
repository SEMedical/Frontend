<template>
	
</template>

<script>
import { ref, onMounted} from 'vue';
import monthlyBloodSugarData from '@/api/monthlyOrWeeklyHistory.js';

export default{
	data(){
		return{
			highStatistic: ref([]),    //存储高血糖概率值
			normalStatistic: ref([]),   //存储正常血糖概率值
			lowStatistic: ref([]),    //存储低血糖概率值
			//存储当天的血糖数据
			dayBloodSugar:[],
			loadedDate : {
				year : 2023,
				month : 12,
				day : 1,
			},  //要加载的日期数据
		}
	},
	
	//获取从selectMonth页面传递过来的参数
	onLoad: function (option) {
		this.loadedDate = JSON.parse(option.selectedDate);
		console.log(this.loadedDate);
	},
}
</script>

<style>
	
</style>