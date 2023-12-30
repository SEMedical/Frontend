import request from '@/utils/request';

// 获取周/月血糖数据（历史）
export default{
	getmonthlyOrWeeklyGlycemia(span,user_id,start_date) {
	    const params = {
			span,
			user_id,
			start_date,
	    };
	
	    return request('/api/glycemia/weeklyOrMonthlyRecord', 'GET', params)
	        .then(response => {
	        console.log('后端响应:', response);
	        return response.data; // 返回血糖数据的data部分，data共包括一个entry，一个hyper_percent，一个hypo_percent，一个eu_percent
	    })
	    .catch(error => {
	      throw error;
	    });
	}
} 