import request from '@/utils/request'

// export default{
//   loginAPI() {
// 		return request(`/api/login/login`, 'POST')
// 			.then(response => {
// 			console.log('后端响应:', response);
// 			return response.data.bloodSugar;
// 		})
// 		.catch(error => {
// 			throw error;
// 		});
// 	}
// }
export const loginAPI = ({id,password}) => {
    return request(
        '/login',
        'POST',
        {
            id,
            password
        },
		
		).then(response => {
      // 如果请求成功，返回响应数据
      console.log('验证成功x:', response,'id',id,'密码',password);
	  return response;
    })
    .catch(error => {
      // 如果请求失败，抛出错误
      console.error('验证失败x:', error);
      throw error;
    });
    
}
export default loginAPI;
export const registerAPI = ({id,password}) => {

    return request({
        url:'/register',
        method:'POST',
        data:{
			id,
            password,
        }
    }).then(response => {
      // 如果请求成功，返回响应数据
      console.log('验证成功:', response);
      return response;
    })
    .catch(error => {
      // 如果请求失败，抛出错误
      console.error('验证失败:', error);
      throw error;
    });
}