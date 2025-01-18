<template>
    <view :style="{ paddingTop: statusBarHeight + 'px' }"></view>
    <view class="container">
        <view class="header">
            <view class="header-icon">📝</view>
            <text class="header-title">基础数据设置</text>
            <text class="header-desc">请填写您的基本信息，我们将为您计算个性化的营养建议</text>
        </view>

        <view class="form-card">
            <view class="input-group">
                <text class="input-label">出生日期</text>
                <picker
                    mode="date"
                    :value="formData.birthDate"
                    @change="onBirthDateChange"
                    class="picker-wrapper"
                    :start="startDate"
                    :end="endDate"
                >
                    <view class="picker-field">
                        <text :class="['picker-text', !formData.birthDate && 'placeholder']">
                            {{ formData.birthDate || '请选择出生日期' }}
                        </text>
                    </view>
                </picker>
            </view>

            <view class="input-group">
                <text class="input-label">性别</text>
                <view class="gender-options">
                    <view
                        class="gender-option"
                        :class="{ selected: formData.gender === 'male' }"
                        @tap="selectGender('male')"
                    >
                        <text>👨</text>
                        <text>男</text>
                    </view>
                    <view
                        class="gender-option"
                        :class="{ selected: formData.gender === 'female' }"
                        @tap="selectGender('female')"
                    >
                        <text>👩</text>
                        <text>女</text>
                    </view>
                </view>
            </view>

            <view class="input-group">
                <text class="input-label">身高 (cm)</text>
                <input
                    type="number"
                    class="input-field"
                    placeholder="请输入身高"
                    v-model="formData.height"
                />
            </view>

            <view class="input-group">
                <text class="input-label">体重 (kg)</text>
                <input
                    type="number"
                    class="input-field"
                    placeholder="请输入体重"
                    v-model="formData.weight"
                />
            </view>

            <button class="submit-btn" @tap="onSubmit">储存</button>
        </view>

        <!-- 添加遮罩层和 loading -->
        <loading-overlay :show="isLoading"/>
    </view>
</template>

<script>
import loadingOverlay from "@/components/loading-overlay.vue";

export default {
    components: {loadingOverlay},
    data() {
        return {
            statusBarHeight: 0,// 适配屏幕高度

            isLoading: false,
            formData: {
                birthDate: '',
                gender: 'male',
                height: '',
                weight: ''
            },

            // 添加日期范围
            startDate: '1940-01-01', // 能手动选择的最早日期
            endDate: new Date().toISOString().split('T')[0] // 今天
        }
    },

    onLoad() {
        // 获取状态栏高度
        const systemInfo = uni.getSystemInfoSync()
        this.statusBarHeight = systemInfo.statusBarHeight
    },

    methods: {
        onBirthDateChange(e) {
            this.formData.birthDate = e.detail.value;
        },
        
        selectGender(gender) {
            this.formData.gender = gender
        },

        async onSubmit() {
            try {
                this.isLoading = true
                // 在这里添加表单验证和提交逻辑
                await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟API调用
                uni.navigateTo({
                    url: '/pages/nutrition-setup/nutrition-setup'
                })
            } catch (error) {
                uni.showToast({
                    title: '提交失败，请重试',
                    icon: 'none'
                })
            } finally {
                this.isLoading = false
            }
        }
    }
}
</script>

<style>
page {
    background: #f5f7fa;
    min-height: 100vh;
}

.container {
    padding: 30rpx 40rpx;
}

.header {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 40rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    margin-bottom: 30rpx;
    text-align: center;
}

.header-icon {
    font-size: 96rpx;
    margin-bottom: 32rpx;
}

.header-title {
    font-size: 48rpx;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 16rpx;
    display: block;
}

.header-desc {
    color: #718096;
    font-size: 32rpx;
    line-height: 1.5;
    display: block;
}

.form-card {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 40rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    margin-bottom: 30rpx;
}

.input-group {
    margin-bottom: 48rpx;
}

.input-group:last-child {
    margin-bottom: 0;
}

.input-label {
    display: block;
    margin-bottom: 16rpx;
    font-weight: 500;
    color: #4a5568;
}

/* 日期选择 start */
.picker-wrapper {
    width: 100%;
}

.picker-field {
    width: 100%;
    height: 96rpx;
    padding: 0 32rpx;
    border: 4rpx solid #e2e8f0;
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    box-sizing: border-box;
}

.picker-text {
    font-size: 32rpx;
    color: #1a1a1a;
}

.picker-text.placeholder {
    color: #a0aec0;
}

/* 日期选择 end */

.input-field {
    width: 100%;
    height: 96rpx;
    padding: 0 32rpx;
    border: 4rpx solid #e2e8f0;
    border-radius: 24rpx;
    font-size: 32rpx;
    box-sizing: border-box;
}

.gender-options {
    display: flex;
    gap: 32rpx;
}

.gender-option {
    flex: 1;
    height: 96rpx;
    border: 4rpx solid #e2e8f0;
    border-radius: 24rpx;
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    gap: 16rpx;
}

.gender-option.selected {
    border-color: #4c51bf;
    background: rgba(76, 81, 191, 0.1);
    color: #4c51bf;
}

.submit-btn {
    width: 100%;
    height: 96rpx;
    background: #4c51bf;
    color: #ffffff;
    border: none;
    border-radius: 24rpx;
    font-size: 32rpx;
    font-weight: 500;
    margin-top: 80rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.loading-spinner {
    display: flex;
    gap: 16rpx;
}

.spinner-dot {
    width: 24rpx;
    height: 24rpx;
    background: #4c51bf;
    border-radius: 50%;
    animation: bounce 0.5s infinite alternate;
}

@keyframes bounce {
    to {
        transform: translateY(-20rpx);
    }
}
</style>