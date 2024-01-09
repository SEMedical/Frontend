<template>
	<view>	
		<uni-section title="" type="line" >
			<image src="../../static/sugarsmart.png" class="iconimage"></image>
					<view class="example">
						<uni-forms  ref="valiForm" :rules="rules" :modelValue="valiFormData">
							<uni-forms-item label="账号" required name="id">
								<uni-easyinput v-model="valiFormData.id" placeholder="请输入姓名" />
							</uni-forms-item>
							<uni-forms-item  label="密码" required name="password">
								<uni-easyinput  type="password" v-model="valiFormData.password" placeholder="请输入密码" />
							</uni-forms-item>
						</uni-forms>
						<div class="button-group">
						<button type="primary" @click="login">登录</button>
						    <navigator url="/pages/login/register" hover-class="navigator-hover">
							    <button type="primary">注册</button>
						    </navigator>
						</div>
					</view>
				</uni-section>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import loginAPI from  '@/api/login';
import { useUserStore } from '@/store/user';
	// 定义表单数据
	
const userStore = useUserStore();
	const valiFormData = ref({
	  id: '',       // 账号
	  password: ''  // 密码
	});
	
	// 定义表单验证规则
	const rules = {
	  id: {
	    rules:[{ required: true, errorMessage: '账号不能为空', trigger: 'blur' }]
	  },
	  password: {
	    rules:[{ required: true, errorMessage: '密码不能为空', trigger: 'blur' }]
	  },
	  
	};
	const valiForm = ref(null); // 直接创建一个ref来引用表单

	// 登录方法
	const login = async () => {
	  if (valiForm.value) {
	    try {
	      await valiForm.value.validate();
	      console.log('表单验证成功');
	      
	      // 调用验证 API
		  console.log("xx",valiFormData);
	      await userStore.getUserInfo({
	        id: valiFormData.value.id, // 使用id字段
	        password: valiFormData.value.password
	      });
	      // 处理响应
	      if (userStore.userInfo.success) { // success字段表示成功
	        uni.showToast({ title: '登录成功' });
			
			setTimeout(() => {
			  uni.switchTab({ url: '/pages/index/index' });
			}, 1000);
	        // 可以在这里进行页面跳转或其他逻辑
	      } else {
	        uni.showModal({ title: '账户不存在或密码错误',icon: 'error' });
	      }
	    } catch (err) {
	      console.error('表单验证失败:', err);
	    }
	  } else {
	    console.error('表单实例不存在');
	  }
	};
</script>

<style>
.button-group {
    margin-top: 15px;
    margin-left: 0px; /* 或者您需要的任何值 */
    justify-content: flex-start; /* 靠左对齐 */
}
.button-group button{

	background: linear-gradient(to right, #79faeb, #4ac2be); /* 使用线性渐变，可以根据需要调整颜色值 */
	
}
.iconimage{
	width: 263px;
	height:123px;
}

</style>
