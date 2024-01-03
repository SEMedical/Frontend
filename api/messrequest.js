// 假设你的接口请求工具是 '@/utils/request'
import request from '@/utils/request';

export default {
  getUserInfo() {
    return request('/api/health/health-record', 'GET')
      .then(response => {
        console.log('后端响应:', response);
        return response.response; // 假设数据直接在 response.data 中
      })
      .catch(error => {
        throw error;
      });
  },
  saveUserData(userData) {
      return request('/api/health/modifyHealthRecord', 'POST', userData)
        .then(response => response.data)
        .catch(error => {
          throw error;
        });
    },
};