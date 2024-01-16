import request from '@/utils/request'

export const registerPatientAPI = async ({ name, password, contact, gender, age }) => {
        console.log('发送注册请求数据:');
        console.log('Name:', name);
        console.log('Password:', password);
        console.log('Contact:', contact);
        console.log('Gender:', gender);
        console.log('Age:', age);
	
	try {
        const response = await request(
            '/api/register/patient',
            'POST',
            {
                name,
                password,
                contact,
                gender,
                age
            });
        // 如果请求成功，返回响应数据
        console.log('病人注册成功:', response);
        return response;
    } catch (error) {
        // 如果请求失败，抛出错误
        console.error('病人注册失败:', error);
        throw error;
    }
}

export const registerDoctorAPI = async ({ name, password, contact }) => {
    try {
        const response = await request(
            '/api/register/doctor',
            'POST',
            {
                name,
                password,
                contact
            });
        // 如果请求成功，返回响应数据
        console.log('医生注册成功:', response);
        return response;
    } catch (error) {
        // 如果请求失败，抛出错误
        console.error('医生注册失败:', error);
        throw error;
    }
}
