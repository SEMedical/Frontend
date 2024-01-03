// 管理用户数据

import { defineStore } from "pinia"
import { ref } from "vue"
import { loginAPI } from "@/api/login"


export const useUserStore = defineStore('user',() => {
    const userInfo = ref({})
    // 获取用户信息并存储
    const getUserInfo = async({id,password}) => {
        const res = await loginAPI({id,password})
		const token = res.response.token;
		uni.setStorageSync('jwt_token', token);
		console.log("222222",res);
        userInfo.value = res
		console.log(userInfo.value);
    }

    // 退出时清除用户信息
    const clearUserInfo = ()=> {
        userInfo.value={}
    }

    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},{
    persist:true,
})