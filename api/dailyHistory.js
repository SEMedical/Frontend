import request from '@/utils/request';

// 获取日血糖数据（历史）
export default{
	getdailyGlycemia(date) {
	    const params = {
	        date,
	    };
	
	    return request('/api/glycemia/dailyHistory', 'GET', params)
	        .then(response => {
	        console.log('后端响应:', response);
	        return response; // 返回血糖数据的response部分，共包括一个entry，一个highSta，一个normalSta，一个lowSta
	    })
	    .catch(error => {
	      throw error;
	    });
	}
} 