<template>
  <uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
    <uni-forms-item label="姓名" required name="name">
      <uni-easyinput v-model="valiFormData.name" placeholder="请输入姓名" />
    </uni-forms-item>
    <uni-forms-item label="账号" required name="contact">
      <uni-easyinput v-model="valiFormData.contact" placeholder="请输入手机号" />
    </uni-forms-item>
    <uni-forms-item label="密码" required name="password">
      <uni-easyinput v-model="valiFormData.password" placeholder="请输入密码" />
    </uni-forms-item>
    <uni-forms-item label="年龄" required name="age">
      <uni-easyinput v-model="valiFormData.age" placeholder="请输入年龄" />
    </uni-forms-item>
  </uni-forms>
  <uni-section title="身份" type="line">
    <view class="uni-px-5 uni-pb-5">
      <uni-data-checkbox v-model="identity" :localdata="identityOptions"></uni-data-checkbox>
    </view>
  </uni-section>
  <uni-section title="性别" type="line">
    <view class="uni-px-5 uni-pb-5">
      <uni-data-checkbox v-model="gender" :localdata="genderOptions"></uni-data-checkbox>
    </view>
  </uni-section>
  <button type="primary" @click="enroll">完成</button>
</template>

<script setup>
  import { ref } from 'vue';
  import { registerPatientAPI, registerDoctorAPI } from '@/api/register';

  const valiFormData = ref({
    contact: '', // 手机号
    password: '', // 密码
    name: '', // 姓名
    age: '', // 年龄
  });

  const identityOptions = [{ value: 'doctor', text: '医生' }, { value: 'patient', text: '普通用户' }];
  const genderOptions = [{ value: 'Male', text: '男' }, { value: 'Female', text: '女' }];
  const identity = ref('');
  const gender = ref('');

  const rules = {
    contact: { rules: [{ required: true, errorMessage: '手机号不能为空', trigger: 'blur' }] },
    password: { rules: [{ required: true, errorMessage: '密码不能为空', trigger: 'blur' }] },
    name: { rules: [{ required: true, errorMessage: '姓名不能为空', trigger: 'blur' }] },
    age: { rules: [{ required: true, errorMessage: '年龄不能为空', trigger: 'blur' }] },
  };

  const valiForm = ref(null);

  const enroll = async () => {
    if (valiForm.value) {
      try {
        await valiForm.value.validate();

        let response;
        if (identity.value === 'doctor') {
          response = await registerDoctorAPI({
            id: valiFormData.value.contact,
            password: valiFormData.value.password,
            name: valiFormData.value.name,
          });
        } else if (identity.value === 'patient') {
          response = await registerPatientAPI({
            contact: valiFormData.value.contact,
            password: valiFormData.value.password,
            name: valiFormData.value.name,
            age: valiFormData.value.age,
            gender: gender.value,
          });
        }

        if (response && response.success) {
          uni.showToast({ title: '注册成功' });
          setTimeout(() => { uni.navigateBack({ delta: 1 }); }, 1000);
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
