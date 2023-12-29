import request from '@/utils/request'

export const registerAPI = async ({id,password}) => {

    try {
        const response = await request(
            '/register',
            'POST',
            {
                id,
                password,
            });
        // 如果请求成功，返回响应数据
        console.log('验证成功:', response);
        return response;
    } catch (error) {
        // 如果请求失败，抛出错误
        console.error('验证失败:', error);
        throw error;
    }
}
export default registerAPI;