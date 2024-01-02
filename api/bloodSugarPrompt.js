import request from '@/utils/request'

//获取实时血糖提示
export default{
  getBloodSugarPrompt() {
		return request(`/api/glycemia/realTimePrompt`, 'GET')
			.then(response => {
			console.log('后端响应:', response);
			return response.response;     //包含一个string类型的color和一个string类型的tip
		})
		.catch(error => {
			throw error;
		});
	}
}
