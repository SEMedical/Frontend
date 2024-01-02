import request from '@/utils/request';

// 获取日血糖数据（实时）
export default{
	getGlycemiaData(type, date = '') {
	    const params = {
	        type,
			date,
	    };
	
	    return request('/api/glycemia/chart', 'GET', params)
	        .then(response => {
	        console.log('后端响应:', response.response.data);
	        return response.response.data; // 返回血糖数据的entry数组
	    })
	    .catch(error => {
	      throw error;
	    });
	}
} 

