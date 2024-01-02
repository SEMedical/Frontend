import request from '@/utils/request';

// 获取周/月血糖数据（历史）
export default{
	getmonthlyOrWeeklyGlycemia(span,start_date) {
		const params = {
			span:span,
		 	startDate:start_date,
	     };
	
	    return request('/api/glycemia/weeklyOrMonthlyRecord', 'GET', params)
	        .then(response => {
	        console.log('后端响应:', response.response);
	        return response.response; // 返回血糖数据的response部分，response共包括一个entry，一个hyper_percent，一个hypo_percent，一个eu_percent
	    })
	    .catch(error => {
	      throw error;
	    });
	}
} 