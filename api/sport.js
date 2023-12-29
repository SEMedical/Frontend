
import request from '@/utils/request'

export default{
	realTimeHeartRate() {
		return request(`/api/sports/realTimeHeartRate`, 'GET')
			.then(response => {
			console.log('后端响应:', response);
			return response.result.heart_rate;
		})
		.catch(error => {
			throw error;
		});
	},
	getSportRecord() {
		return request(`/api/sports/getSportRecord`, 'GET')
			.then(response => {
			console.log('后端响应:', response);
			return response.result.array;
		})
		.catch(error => {
			throw error;
		});
	}
}