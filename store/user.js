import Vue from 'vue';
import Vuex from 'vuex';
import { loginAPI } from "@/api/user";

Vue.use(Vuex);
export const useUserStore= new Vuex.Store({
  state: {
    userInfo: {}
  },
  getters: {
    userInfo: state => state.userInfo
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    clearUserInfo(state) {
      state.userInfo = {};
    }
  },
  actions: {
    async getUserInfo({ commit }, { username, password }) {
      const token = '';
      try {
        const res = await loginAPI({ token, username, password });
        commit('setUserInfo', res.data);
        uni.setStorageSync('jwt_token', token);
        //localStorage.setItem('jwt_token', token); // 假设这里应该存储从后端返回的 token
      } catch (error) {
        console.error('登录失败:', error);
      }
    },
    clearUserInfo({ commit }) {
      commit('clearUserInfo');
    }
  }
});