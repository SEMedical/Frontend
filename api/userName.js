import request from '@/utils/request'

export default{
	//获取用户名
	getUserName() {
	/* 	console.log('usernname');
		resporequest(`/api/health/getUserName`, 'GET');
		console.log(response); */
		return request(`/api/health/getUserName`, 'GET')
			.then(response => {
			console.log('后端响应:', response);
			console.log(response);
			return response;
		})
		.catch(error => {
			throw error;
		});
	}
}