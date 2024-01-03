import request from '@/utils/request'

export default{
	startDoingSport() {
		// 获取存储在本地的 token
		const token = uni.getStorageSync('jwt_token');
		// 如果 token 存在，将其添加到请求头中
		const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
		return request(`/api/sports/startDoingSport`, 'GET',  {}, headers)
			.then(response => {
			console.log('后端响应:', response);
			return response;
		})
		.catch(error => {
			throw error;
		});
	},
	stopDoingSport() {
		// 获取存储在本地的 token
		const token = uni.getStorageSync('jwt_token');
		// 如果 token 存在，将其添加到请求头中
		const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
		return request(`/api/sports/stopDoingSport`, 'GET',  {}, headers)
			.then(response => {
			console.log('后端响应:', response);
			return response;
		})
		.catch(error => {
			throw error;
		});
	},
	sportPlan() {
		// 获取存储在本地的 token
		const token = uni.getStorageSync('jwt_token');
		// 如果 token 存在，将其添加到请求头中
		const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
		return request(`/api/sports/sportPlan`, 'GET',  {}, headers)
			.then(response => {
			console.log('后端响应:', response);
			return response;
		})
		.catch(error => {
			throw error;
		});
	},
	questionnaire1() {
		// 获取存储在本地的 token
		const token = uni.getStorageSync('jwt_token');
		// 如果 token 存在，将其添加到请求头中
		const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
		return request(`/api/sports/questionnaire1`, 'GET',  {}, headers)
			.then(response => {
			console.log('后端响应:', response);
			return response;
		})
		.catch(error => {
			throw error;
		});
	},
	questionnaire2() {
		// 获取存储在本地的 token
		const token = uni.getStorageSync('jwt_token');
		// 如果 token 存在，将其添加到请求头中
		const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
		return request(`/api/sports/questionnaire2`, 'POST',  {}, headers)
			.then(response => {
			console.log('后端响应:', response);
			return response;
		})
		.catch(error => {
			throw error;
		});
	},
	recommendedSportPlan() {
		// 获取存储在本地的 token
		const token = uni.getStorageSync('jwt_token');
		// 如果 token 存在，将其添加到请求头中
		const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
		return request(`/api/sports/recommendedSportPlan`, 'POST',  {}, headers)
			.then(response => {
			console.log('后端响应:', response);
			return response;
		})
		.catch(error => {
			throw error;
		});
	},
	chooseSportPlan() {
		// 获取存储在本地的 token
		const token = uni.getStorageSync('jwt_token');
		// 如果 token 存在，将其添加到请求头中
		const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
		return request(`/api/sports/chooseSportPlan`, 'POST',  {}, headers)
			.then(response => {
			console.log('后端响应:', response);
			return response;
		})
		.catch(error => {
			throw error;
		});
	},
	realTimeSportData() {
		// 获取存储在本地的 token
		const token = uni.getStorageSync('jwt_token');
		// 如果 token 存在，将其添加到请求头中
		const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
		return request(`/api/sports/realTimeSportData`, 'GET',  {}, headers)
			.then(response => {
			console.log('后端响应:', response);
			return response.response;
		})
		.catch(error => {
			throw error;
		});
	},	
	realTimeHeartRate() {
	   // 获取存储在本地的 token
		const token = uni.getStorageSync('jwt_token');
		// 如果 token 存在，将其添加到请求头中
		const headers = token ? { 'Authorization': `${token}` } : {};
		return request(`/api/sports/realTimeHeartRate`, 'GET', {}, headers)
			.then(response => {
			console.log('后端响应:', response);
			return response.heart_rate;
		})
		.catch(error => {
			throw error;
		});
	},
	getSportRecord() {
		// 获取存储在本地的 token
		//const token = uni.getStorageSync('jwt_token');
		// 如果 token 存在，将其添加到请求头中
		//const headers = token ? { 'Authorization': `Bearer ${token}` } : {};  
		// {}, headers
		return request(`/api/sports/sportRecord`, 'GET')
			.then(response => {
			console.log('后端响应:', response);
			return response;
		})
		.catch(error => {
			throw error;
		});
	},
	detailedSportRecord() {
		// 获取存储在本地的 token
		const token = uni.getStorageSync('jwt_token');
		// 如果 token 存在，将其添加到请求头中
		const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
		return request(`/api/sports/detailedSportRecord`, 'POST',  {}, headers)
			.then(response => {
			console.log('后端响应:', response);
			return response;
		})
		.catch(error => {
			throw error;
		});
	}
}