<template>
    <view class="loading">
        <text>{{ loadingText }}</text>
    </view>
</template>

<script setup>
    import {
        onMounted,
        ref
    } from 'vue'

    const loadingText = ref('正在验证登录状态...')

    // 模拟验证token
    const validateToken = (token) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(token && token.includes('valid'))
            }, 1000)
        })
    }

    // 检查登录状态
    const checkLogin = async () => {
        uni.showLoading({
            title: '加载中',
            mask: true
        })

        try {
            const token = uni.getStorageSync('token')
            const isValid = await validateToken(token)

            if (token && isValid) {
                // 使用 switchTab 跳转到 tabBar 页面
                uni.switchTab({
                    url: '/pages/diary/diary',
                    success: () => {
                        console.log('跳转到日记页面成功')
                    },
                    fail: (err) => {
                        console.error('跳转失败:', err)
                        loadingText.value = '页面跳转失败，请重试'
                    }
                })
            } else {
                uni.reLaunch({
                    url: '/pages/login/login',
                    success: () => {
                        console.log('跳转到登录页面成功')
                    },
                    fail: (err) => {
                        console.error('跳转失败:', err)
                        loadingText.value = '页面跳转失败，请重试'
                    }
                })
            }
        } catch (error) {
            console.error('验证过程出错:', error)
            loadingText.value = '验证过程出错，请重试'
        } finally {
            uni.hideLoading()
        }
    }

    onMounted(() => {
        checkLogin()
    })
</script>

<style>
    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        color: #666;
    }
</style>