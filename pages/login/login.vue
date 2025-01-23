<template>
    <view :style="{ paddingTop: statusBarHeight + 'px' }"></view>
    <view class="container">
        <!-- Logo区域 -->
        <view class="logo-section">
            <view class="logo-icon">🥗</view>
            <text class="logo-text">飲食紀錄</text>
            <text class="logo-subtitle">紀錄美食，追蹤營養</text>
        </view>

        <!-- 登录表单 -->
        <view class="login-form">
            <!-- 账号输入 -->
            <view class="input-group">
                <view class="input-label">
                    <view class="input-icon">👤</view>
                    <text>Account</text>
                </view>
                <view class="input-row">
                    <input
                        type="text"
                        class="form-input"
                        v-model="formData.email"
                        placeholder="请输入账号"
                    />
                </view>
            </view>

            <!-- 密码输入 -->
            <view class="input-group">
                <view class="input-label">
                    <view class="input-icon">🔒</view>
                    <text>Password</text>
                </view>
                <view class="input-row">
                    <input
                        :type="showPassword ? 'text' : 'password'"
                        class="form-input"
                        v-model="formData.password"
                        placeholder="请输入密码"
                    />
                    <text
                        class="password-toggle"
                        @tap="togglePasswordVisibility"
                    >
                        {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                    </text>
                </view>
            </view>

            <!-- 登录按钮 -->
            <button
                class="login-btn"
                :disabled="isLoading"
                @tap="checkLoginRequest"
            >
                Login
            </button>

            <!-- 其他选项 -->
            <view class="other-options">
                <!--                <text class="option-text" @tap="navigateToRegister">注册账号</text>-->
                <!--                <text class="option-text" @tap="navigateToForgotPassword">忘记密码</text>-->
            </view>

            <!-- 第三方登录 -->
            <view class="third-party-login">
                <view class="divider">
                    <text class="divider-text">其他登录方式</text>
                </view>
                <view class="login-methods">
                    <view class="login-method-item" @tap="handleThirdPartyLogin('wechat')">
                        <view class="method-icon">💬</view>
                        <text class="method-name">微信</text>
                    </view>
                    <view class="login-method-item" @tap="handleThirdPartyLogin('apple')">
                        <view class="method-icon">🍎</view>
                        <text class="method-name">Apple</text>
                    </view>
                </view>
            </view>
        </view>

        <!-- Loading遮罩 -->
        <loading-overlay :show="isLoading"/>
    </view>
</template>

<script>
import loadingOverlay from "@/components/loading-overlay.vue"
import loginApi from "@/api/login-api";

export default {
    components: {
        loadingOverlay
    },

    data() {
        return {
            statusBarHeight: 0,

            isLoading: false,
            isAccountExist: false,
            isRegisterSuccess: false,

            showPassword: false,

            formData: {
                email: '',
                password: ''
            },
        }
    },

    onLoad() {
        const systemInfo = uni.getSystemInfoSync()
        this.statusBarHeight = systemInfo.statusBarHeight
    },

    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword
        },

        async checkLoginRequest() {
            if (!this.formData.email || !this.formData.password) {
                uni.showToast({
                    title: '请输入账号和密码',
                    icon: 'none'
                })
                return
            }

            try {
                await this.checkAccountExist();
                if (this.isAccountExist) {
                    await this.login();
                } else {
                    // 使用原生彈窗
                    uni.showModal({
                        title: '账号不存在',
                        content: '是否使用当前账号密码进行注册？',
                        success: async (res) => {
                            if (res.confirm) {
                                // 用戶點擊確定
                                try {
                                    uni.showLoading({
                                        title: '正在注册'
                                    });
                                    await this.register();
                                    await this.login();
                                    uni.hideLoading();
                                    uni.showToast({
                                        title: '注册并登录成功',
                                        icon: 'success'
                                    });
                                } catch (error) {
                                    uni.hideLoading();
                                    uni.showToast({
                                        title: error.message || '注册失败',
                                        icon: 'error'
                                    });
                                }
                            } else {

                                // 用戶點擊取消
                                uni.showToast({
                                    title: '您可以使用其他账号登录',
                                    icon: 'none'
                                });
                            }
                        }
                    });
                }
            } catch (error) {
                uni.showToast({
                    title: error.message || '操作失败',
                    icon: 'error'
                });
            }
        },

        async checkAccountExist() {
            try {
                this.isLoading = true
                const response = await loginApi.checkExist(this.formData);
                if (response.code === 'A0001') {
                    this.isAccountExist = response.data === 'true';
                } else {
                    uni.showToast({
                        title: response.message,
                        icon: 'error'
                    });
                }
            } catch (error) {
                this.isLoading = false
                uni.showToast({
                    title: error.message,
                    icon: 'error'
                })
            } finally {
                this.isLoading = false
                uni.hideLoading();
            }
        },

        async login() {
            try {
                this.isLoading = true
                const response = await loginApi.login(this.formData);

                if (response.code === 'A0001') {
                    // 存儲 token 和用戶信息
                    uni.setStorageSync('token', response.data.token);
                    uni.setStorageSync('userInfo', response.data);

                    uni.showToast({
                        title: '登入成功',
                        icon: 'success'
                    })

                    // 登录成功后跳转
                    setTimeout(() => {
                        uni.reLaunch({
                            url: '/pages/diary/diary'
                        })
                    }, 1500)
                } else {
                    uni.showToast({
                        title: response.message,
                        icon: 'error'
                    });
                }
            } catch (error) {
                uni.showToast({
                    title: error.message,
                    icon: 'error'
                })
            } finally {
                this.isLoading = false
            }
        },

        async register() {
            try {
                this.isLoading = true
                const response = await loginApi.register(this.formData);
                if (response.code === 'A0001') {
                    this.isRegisterSuccess = true;
                    uni.showToast({
                        title: '註冊成功',
                        icon: 'success'
                    })
                } else {
                    uni.showToast({
                        title: response.message,
                        icon: 'error'
                    });
                }
            } catch (error) {
                uni.showToast({
                    title: error.message,
                    icon: 'error'
                })
            } finally {
                this.isLoading = false
            }
        },

        navigateToRegister() {
            uni.navigateTo({
                url: '/pages/login/register'
            })
        },

        navigateToForgotPassword() {
            uni.navigateTo({
                url: '/pages/login/forgot-password'
            })
        },

        handleThirdPartyLogin(type) {
            uni.showToast({
                title: `${type}登录开发中`,
                icon: 'none'
            })
        }
    }
}
</script>

<style>
page {
    background: #f5f7fa;
    color: #1a1a1a;
}

.container {
    padding: 30rpx;
}

/* Logo区域样式 */
.logo-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60rpx 0;
}

.logo-icon {
    font-size: 120rpx;
    margin-bottom: 30rpx;
}

.logo-text {
    font-size: 48rpx;
    font-weight: 600;
    margin-bottom: 16rpx;
}

.logo-subtitle {
    font-size: 28rpx;
    color: #718096;
}

/* 登录表单样式 */
.login-form {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 40rpx;
    /* #ifdef APP-PLUS */
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    /* #endif */
}

.input-group {
    margin-bottom: 30rpx;
}

.input-label {
    display: flex;
    align-items: center;
    gap: 16rpx;
    margin-bottom: 16rpx;
}

.input-icon {
    width: 48rpx;
    height: 48rpx;
    border-radius: 12rpx;
    background: #f7fafc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
}

.input-row {
    position: relative;
    background: #f7fafc;
    border-radius: 16rpx;
    padding: 24rpx;
}

.form-input {
    width: 100%;
    font-size: 28rpx;
}

.password-toggle {
    position: absolute;
    right: 24rpx;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24rpx;
}

/* 登录按钮样式 */
.login-btn {
    width: 100%;
    height: 88rpx;
    background: #4c51bf;
    color: #ffffff;
    border-radius: 16rpx;
    font-size: 28rpx;
    font-weight: 500;
    margin: 40rpx 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    /* #ifdef APP-PLUS */
    box-shadow: 0 4rpx 12rpx rgba(76, 81, 191, 0.2);
    /* #endif */
}

.login-btn:active {
    opacity: 0.9;
}

.login-btn[disabled] {
    opacity: 0.7;
    background: #a0aec0;
}

/* 其他选项样式 */
.other-options {
    display: flex;
    justify-content: space-between;
    padding: 0 20rpx;
    margin-bottom: 60rpx;
}

.option-text {
    color: #4c51bf;
    font-size: 26rpx;
}

/* 第三方登录样式 */
.third-party-login {
    margin-top: 60rpx;
}

.divider {
    position: relative;
    text-align: center;
    margin-bottom: 40rpx;
}

.divider::before,
.divider::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 30%;
    height: 2rpx;
    background: #e2e8f0;
}

.divider::before {
    left: 0;
}

.divider::after {
    right: 0;
}

.divider-text {
    background: #ffffff;
    padding: 0 30rpx;
    color: #718096;
    font-size: 26rpx;
}

.login-methods {
    display: flex;
    justify-content: center;
    gap: 60rpx;
}

.login-method-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12rpx;
}

.method-icon {
    width: 88rpx;
    height: 88rpx;
    background: #f7fafc;
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36rpx;
}

.method-name {
    font-size: 24rpx;
    color: #4a5568;
}

/* Loading动画 */
@keyframes bounce {
    0%, 80%, 100% {
        transform: scale(0);
        opacity: 0.3;
    }
    40% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>