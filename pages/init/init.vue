<template>
    <view class="loading">
        <text>{{ initText }}</text>
    </view>
</template>

<script>
import loginApi from "@/api/login-api";

export default {
    data() {
        return {
            initText: '...',

            token: '',
            isValid: false,
        }
    },

    methods: {
        async validateToken(token) {
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                console.log(token)
                const response = await loginApi.checkToken({"token": token});
                if (response.code === 'A0001') {
                    this.isValid = true;
                } else {
                    uni.showToast({
                        title: response.message,
                        icon: 'error'
                    });
                }
            } catch (error) {
                this.isLoading = false;
                uni.showToast({
                    title: error.message,
                    icon: 'error'
                })
            } finally {
                this.isLoading = false;
                uni.hideLoading();
            }
        },

        // 检查登录状态
        async checkLogin() {
            uni.showLoading({
                title: 'Loading',
                mask: true
            })

            try {
                this.token = uni.getStorageSync('token')
                await this.validateToken(this.token)

                if (this.token && this.isValid) {
                    // 使用 switchTab 跳转到 tabBar 页面
                    uni.switchTab({
                        url: '/pages/diary/diary',
                        success: () => {
                            console.log('跳转到日记页面成功')
                        },
                        fail: (err) => {
                            console.error('跳转失败:', err)
                            this.initText = '页面跳转失败，请重试'
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
                            this.initText = '页面跳转失败，请重试'
                        }
                    })
                }
            } catch (error) {
                console.error('验证过程出错:', error)
                this.initText = '验证过程出错，请重试'
            } finally {
                uni.hideLoading()
            }
        }
    },

    mounted() {
        this.checkLogin()
    }
}
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