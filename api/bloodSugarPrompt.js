import request from '@/utils/request'

//获取实时血糖提示
export default{
  getBloodSugarPrompt() {
		return request(`/api/glycemia/realTimePrompt`, 'GET')
			.then(response => {
			console.log('后端响应:', response);
			return response.data.prompt;
		})
		.catch(error => {
			throw error;
		});
	}
}
