import request from '@/utils/request';
import {useUserStore} from '@/store/user.js'
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
export const loginAPI = async ({ id, password }) => {
  try {
    const response = await request('/login', 'POST', { contact: id, password:password });

    console.log('验证成功:', response, 'id', id, '密码', password);

    // 假设 token 存在于响应数据中
    const token = response.response.token;
	console.log(token);
    return response;
  } catch (error) {
    console.error('验证失败:', error);
    throw error;
  }
};

export default loginAPI;
