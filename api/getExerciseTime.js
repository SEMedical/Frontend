import request from '@/utils/request';

// 获取运动时段，辅助绘制曲线图
export default{
	getExerciseTime(type, user_id) {
	    const params = {
	        type,
	        user_id,
	    };
	
	    return request('/api/glycemia/isExercise', 'GET', params)
	        .then(response => {
	        console.log('后端响应:', response);
	        return response.data.intervals; // 返回血糖数据的entry数组
	    })
	    .catch(error => {
	      throw error;
	    });
	}
} 
