<template>
  <view class="login-container">
    <view class="input-group">
      <input 
        class="input-item" 
        type="text" 
        v-model="userEmail" 
        placeholder="请输入邮箱账号" 
      />
      <input 
        class="input-item" 
        type="password" 
        v-model="password" 
        placeholder="请输入密码" 
      />
    </view>

    <!-- 测试账号信息 -->
    <view class="test-account">
      <text>测试账号：test@example.com</text>
      <text>测试密码：123456</text>
    </view>

    <button class="login-btn" @click="handleLogin">登录</button>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import loginApi from '@/api/login-api'

const userEmail = ref('')  // 改为 userEmail
const password = ref('')

const handleLogin = async () => {
    console.log("aaa");
  // 设置测试账号
  userEmail.value = 'test@example.com'
  password.value = '123456'
  
  // 表单验证
  if (!userEmail.value || !password.value) {
    uni.showToast({
      title: '请填写完整信息',
      icon: 'none'
    })
    return
  }

  // 邮箱格式验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(userEmail.value)) {
    uni.showToast({
      title: '请输入正确的邮箱格式',
      icon: 'none'
    })
    return
  }

  // 密码长度验证
  if (password.value.length < 6 || password.value.length > 20) {
    uni.showToast({
      title: '密码长度应为6-20位',
      icon: 'none'
    })
    return
  }

  try {
      console.log("bbb");
    uni.showLoading({
      title: '登录中...'
    })
    
    console.log("ccc");

    const response = await loginApi.login({
      email: userEmail.value,    // 与后端字段对应
      password: password.value    // 与后端字段对应
    });

    // 处理返回数据
    if (response && response.data) {
      const { token, ...userInfo } = response.data

      // 存储 token 和登录状态
      uni.setStorageSync('token', token)
      uni.setStorageSync('userInfo', userInfo)
      uni.setStorageSync('isLoggedIn', 'true')

      uni.showToast({
        title: '登录成功',
        icon: 'success'
      })

      // 登录成功后跳转
      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/diary/diary'
        })
      }, 1500)
    }

  } catch (error) {
      log
    // 处理错误
    uni.showToast({
      title: error.message || '登录失败',
      icon: 'none'
    })
  } finally {
    uni.hideLoading()
  }
}
</script>

<style>
	.login-container {
		padding: 40rpx;
	}

	.input-group {
		margin-top: 100rpx;
	}

	.input-item {
		height: 90rpx;
		background: #F8F8F8;
		border-radius: 45rpx;
		padding: 0 40rpx;
		margin-bottom: 35rpx;
		font-size: 32rpx;
	}

	.login-btn {
		margin-top: 60rpx;
		height: 90rpx;
		line-height: 90rpx;
		background: #007AFF;
		color: #FFFFFF;
		border-radius: 45rpx;
		font-size: 32rpx;
	}

	.login-btn::after {
		border: none;
	}
</style>