const url_all = {
  'DEV': 'http://192.168.216.145:82', // 开发
  'PRO': 'http://111.111.111.111:8080', // 生产
};

let BASEURL = url_all['DEV']; // 调整当前环境

export default (path, method, data = {}, loading = true) => {
  const token = uni.getStorageSync("jwt_token"); // 获取存储的 token

  if (loading) {
    uni.showLoading({
      title: "加载中",
      mask: true
    });
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url: BASEURL + path,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/json', // 设置 Content-Type 头部
        ...token ? { 'Authorization': `Bearer ${token}` } : {} // 如果存在 token，则添加 Authorization 头部
      },
      success: (response) => {
        console.log(response.role);
        resolve(response.data);
      },
      fail: (err) => {
        uni.showToast({
          icon: "none",
          title: '服务响应失败'
        });
        console.error(err);
        reject(err);
      },
      complete: () => {
        if (loading) {
          uni.hideLoading();
        }
      }
    });
  });
};

// const url_all = {
// 	'DEV': 'https://mock.apifox.com/m1/3732944-0-default', // 开发
// 	'PRO': 'http://111.111.111.111:8080', // 生产
// }

// let BASEURL = url_all['DEV'] // 调整当前环境

// /*
// * 全局请求封装
// * @param path 请求路径
// * @param method 请求类型(GET/POST/DELETE等)
// * @oaram data 请求体数据
// * @param loading 请求未完成是是否显示加载中，默认为true
// */
// export default (path, method, data = {}, loading = true) => {
// 	// 获取存储token
// 	const token = uni.getStorageSync("token");

// 	if (loading) {
// 		uni.showLoading({
// 			title: "加载中",
// 			mask: true
// 		});
// 	};
// 	//根据token进行调用函数
// 	if (token != '') {
// 		return tokenRequest(path, method, data, loading, token)
// 	} else {
// 		return noTokenRequest(path, method, data, loading)
// 	}
// };

// // 无token时发送请求函数
// function noTokenRequest(path, method, data, loading) {
// 	return new Promise((resolve, reject) => {
// 		uni.request({
// 			url: BASEURL + path,
// 			method: method,
// 			data,
// 			success(response) {
// 				// console.log('%c响应拦截：', ' background:green', response);
// 				/* if (response.data.code === 3001) {
// 					// logout()
// 				} */
// 				/* if (response.data.code !== 20) {
// 					uni.showToast({
// 						icon: "none",
// 						duration: 4000,
// 						title: response.data.msg
// 					});
// 				} */
// 				console.log(response.data)
// 				resolve(response.data);
// 			},
// 			fail(err) {
// 				uni.showToast({
// 					icon: "none",
// 					title: '服务响应失败'
// 				});
// 				console.error(err);
// 				reject(err);
// 			},
// 			complete() {
// 				uni.hideLoading();
// 			}
// 		});
// 	});
// }


// // 有token时发送请求函数
// function tokenRequest(path, method, data, loading, token) {
// 	return new Promise((resolve, reject) => {
// 		uni.request({
// 			url: BASEURL + path,
// 			method: method,
// 			data,
// 			header: {
// 				"token":  token
// 			},
// 			success(response) {
// 				console.log('%c响应拦截：', ' background:green', response);
// 				if (response.data.code === 40101) {
// 					// logout()
// 				}
// 				console.log(response.data)
// 				resolve(response.data);
// 			},
// 			fail(err) {
// 				uni.showToast({
// 					icon: "none",
// 					title: '服务响应失败'
// 				});
// 				console.error(err);
// 				reject(err);
// 			},
// 			complete() {
// 				uni.hideLoading();
// 			}
// 		});
// 	});
// }