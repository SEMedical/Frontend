import request from '@/utils/request'

export default{
  realTimeBloodSugar() {
		return request(`/api/glycemia/realTime`, 'GET')
			.then(response => {
			console.log('后端响应:', response);
			return response.data.bloodSugar;
		})
		.catch(error => {
			throw error;
		});
	}
}
