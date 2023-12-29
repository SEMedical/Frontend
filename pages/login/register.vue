<template>
	<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
		<uni-forms-item label="账号" required name="id">
			<uni-easyinput v-model="valiFormData.id" placeholder="请输入账号" />
		</uni-forms-item>
		<uni-forms-item label="密码" required name="password">
			<uni-easyinput v-model="valiFormData.password" placeholder="请输入密码" />
		</uni-forms-item>
	</uni-forms>
	<button type="primary" @click="enroll">完成</button>
</template>

<script setup>
	import { ref } from 'vue';

	import registerAPI from '@/api/register';
	// 定义表单数据
	const valiFormData = ref({
	  id: '',       // 账号
	  password: ''  // 密码
	});

	// 定义表单验证规则
	const rules = {
	  id: {
	    rules: [{ required: true, errorMessage: '账号不能为空', trigger: 'blur' }]
	  },
	  password: {
	    rules: [{ required: true, errorMessage: '密码不能为空', trigger: 'blur' }]
	  }
	};

	const valiForm = ref(null); // 直接创建一个ref来引用表单

	// 登录方法
	// 登录方法
	const enroll = async () => {
	  if (valiForm.value) {
	    try {
	      await valiForm.value.validate();
	      console.log('表单验证成功');
	
	      // 调用注册 API
	      const response = await registerAPI({
	        id: valiFormData.value.id,
	        password: valiFormData.value.password
	      });
	
	      // 处理注册响应
	      if (response.is_success===true) { // 假设响应中有个success字段表示成功
	        uni.showToast({ title: '注册成功' });
	        // 可以在这里进行页面跳转或其他逻辑
	        setTimeout(() => {
	          uni.navigateBack({ delta: 1 });
	        }, 1000);
	      } else {
	        uni.showToast({ title: '注册失败', icon: 'error' });
	      }
	    } catch (err) {
	      console.error('表单验证失败或注册请求错误:', err);
	      uni.showToast({ title: '注册失败', icon: 'none' });
	    }
	  } else {
	    console.error('表单实例不存在');
	  }
	};


</script>

<style>
</style>