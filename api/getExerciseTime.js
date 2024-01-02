import request from '@/utils/request';

// 获取运动时段，辅助绘制曲线图
export default{
	getExerciseTime(type, date) {
	    const params = {
	        type,
	        date,
	    };
	
	    return request('/api/glycemia/isExercise', 'GET', params)
	        .then(response => {
	        console.log('后端响应:', response);
	        return response.response.intervals; // 返回血糖数据的entry数组
	    })
	    .catch(error => {
	      throw error;
	    });
	}
} 
