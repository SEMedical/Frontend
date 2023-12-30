import request from '@/utils/request';

// 获取日血糖数据（实时）
export default{
	getGlycemiaData(type, user_id, date = '') {
	    const params = {
	        type,
	        user_id,
	        date,
	    };
	
	    return request('/api/glycemia/chart', 'GET', params)
	        .then(response => {
	        console.log('后端响应:', response);
	        return response.data.entry; // 返回血糖数据的entry数组
	    })
	    .catch(error => {
	      throw error;
	    });
	}
} 

