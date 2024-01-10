import request from '@/utils/request'

//获取实时血糖数据
export default{
  realTimeBloodSugar() {
		return request(`/api/glycemia/realTime`, 'GET')
			.then(response => {
			console.log('后端响应:', response);
			console.log(response.data);
			return response.response;
		})
		.catch(error => {
			throw error;
		});
	}
}
