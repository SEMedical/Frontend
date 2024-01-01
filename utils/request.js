const url_all = {
	'DEV': 'http://100.80.15.85:81', // 开发
	'PRO': 'http://111.111.111.111:8080', // 生产
}

let BASEURL = url_all['DEV'] // 调整当前环境

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


