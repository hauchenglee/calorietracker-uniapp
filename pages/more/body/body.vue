<template>
    <view :style="{ paddingTop: statusBarHeight + 'px' }"></view>
    <view class="container">
        <!-- 顶部提示卡片 -->
        <view class="setup-reminder">
            <view class="reminder-card">
                <view class="reminder-icon">📝</view>
                <view class="reminder-title">基础数据设置</view>
                <view class="reminder-desc">请填写您的基本信息，我们将为您计算个性化的营养建议</view>
            </view>
        </view>

        <!-- 表单内容 -->
        <view class="form-list">
            <view class="form-category">
                <view class="category-header">
                    <view class="category-title">
                        <view class="category-icon">📅</view>
                        <text>出生日期</text>
                    </view>
                </view>

                <!-- 修复点击无反应问题 -->
                <picker
                    mode="date"
                    :value="formData.birthday"
                    @change="onBirthDayChange"
                    :start="startDate"
                    :end="endDate"
                >
                    <view class="input-row">
                        <view class="picker-content">
                            <text :class="['picker-text', !formData.birthday && 'empty']">
                                {{ formData.birthday || '请选择出生日期' }}
                            </text>
                        </view>
                    </view>
                </picker>
            </view>

            <view class="form-category">
                <view class="category-header">
                    <view class="category-title">
                        <view class="category-icon">👤</view>
                        <text>性别</text>
                    </view>
                </view>

                <view class="gender-row">
                    <view
                        class="gender-option"
                        :class="{ active: formData.gender === 'male' }"
                        @tap="selectGender('male')"
                    >
                        <text class="gender-emoji">👨</text>
                        <text class="gender-label">男</text>
                    </view>
                    <view
                        class="gender-option"
                        :class="{ active: formData.gender === 'female' }"
                        @tap="selectGender('female')"
                    >
                        <text class="gender-emoji">👩</text>
                        <text class="gender-label">女</text>
                    </view>
                </view>
            </view>

            <view class="form-category">
                <view class="category-header">
                    <view class="category-title">
                        <view class="category-icon">📏</view>
                        <text>身高</text>
                    </view>
                </view>

                <view class="input-row">
                    <input
                        type="number"
                        class="form-input"
                        placeholder="请输入身高"
                        v-model="formData.height"
                    />
                    <text class="input-unit">cm</text>
                </view>
            </view>

            <view class="form-category">
                <view class="category-header">
                    <view class="category-title">
                        <view class="category-icon">⚖️</view>
                        <text>体重</text>
                    </view>
                </view>

                <view class="input-row">
                    <input
                        type="number"
                        class="form-input"
                        placeholder="请输入体重"
                        v-model="formData.weight"
                    />
                    <text class="input-unit">kg</text>
                </view>
            </view>
        </view>

        <button class="setup-btn" @tap="onSubmit">储存</button>

        <!-- 添加遮罩层和 loading -->
        <loading-overlay :show="isLoading"/>
    </view>
</template>

<script>
import loadingOverlay from "@/components/loading-overlay.vue";
import bodyApi from "@/api/body-api";
import Body from "@/models/body";

export default {
    components: {loadingOverlay},
    data() {
        return {
            statusBarHeight: 0,// 适配屏幕高度

            // 其他
            isLoading: false, // 添加 loading 状态变量
            isBodyExist: false, // 如果已设置body数据

            formData: {
                id: '',
                birthday: '',
                gender: 'male',
                height: '',
                weight: ''
            },

            // 添加日期范围
            startDate: '1940-01-01', // 能手动选择的最早日期
            endDate: new Date().toISOString().split('T')[0], // 今天
            
            // entity
            body: new Body()
        }
    },

    async onLoad() {
        // 获取状态栏高度
        const systemInfo = uni.getSystemInfoSync()
        this.statusBarHeight = systemInfo.statusBarHeight

        // 初始化加载数据
        try {
            this.isLoading = true;
            await this.checkBody();
            
            if (this.isBodyExist) {
                await this.initData();
            }
        } catch (error) {
            uni.showToast({
                title: 'onLoad error',
                icon: 'none'
            });
        } finally {
            this.isLoading = false;
        }
    },

    methods: {
        onBirthDayChange(e) {
            this.formData.birthday = e.detail.value;
        },

        selectGender(gender) {
            this.formData.gender = gender
        },

        // 页面初始化，调用api
        async checkBody() {
            try {
                const response = await bodyApi.checkExist({});
                if (response.code === 'A0001') {
                    this.isBodyExist = response.data;
                } else {
                    uni.showToast({
                        title: response.message,
                        icon: 'none'
                    });
                }
            } catch (error) {
                uni.showToast({
                    title: error.message,
                    icon: 'none'
                });
            }
        },

        // 页面初始化，调用api
        async initData() {
            try {
                const response = await bodyApi.getBody({});
                if (response.code === 'A0001') {
                    this.body = new Body(response.data);

                    // 映射API返回数据到表单
                    this.formData = {
                        id: this.body.id, 
                        birthday: this.body.birthday,
                        gender: this.body.gender,
                        height: this.body.height,
                        weight: this.body.weight,
                    };
                } else {
                    uni.showToast({
                        title: response.message,
                        icon: 'none'
                    });
                }
            } catch (error) {
                uni.showToast({
                    title: error.message,
                    icon: 'none'
                });
            }
        },

        async onSubmit() {
            try {
                this.isLoading = true

                // 调用API
                console.log(this.formData)
                const response = await bodyApi.save(this.formData);

                // 2. 处理响应结果
                if (response.code === 'A0001' && response.data) {
                    const {data} = response;

                    // 3. 映射API返回数据到表单
                    this.formData = {
                        id: data.id,
                        birthday: data.birthday,
                        gender: data.gender,
                        height: data.height,
                        weight: data.weight,
                    };

                    // 4. 显示成功提示
                    uni.showToast({
                        title: '分析成功',
                        icon: 'success'
                    });

                    // 刷新页面
                    setTimeout(() => {
                        uni.reLaunch({ url: '/pages/current-page/current-page' });
                    }, 1000); // 延迟 1000ms，等待提示消息显示
                } else {
                    uni.showToast({
                        title: response.message,
                        icon: 'none'
                    });
                }
            } catch (error) {
                uni.showToast({
                    title: error.message,
                    icon: 'none'
                });

                // 失败时重置状态
                this.isLoading = false;
            } finally {
                this.isLoading = false;
                uni.hideLoading();
            }
        }
    }
}
</script>

<style>
/* 复用已有的全局样式 */
page {
    background: #f5f7fa;
    color: #1a1a1a;
}

.container {
    padding: 30rpx;
}

/* 复用提示卡片样式 */
.setup-reminder {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 50rpx;
    /* #ifdef APP-PLUS */
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    /* #endif */
    margin-bottom: 40rpx;
}

.reminder-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 40rpx 0;
}

.reminder-icon {
    font-size: 80rpx;
    margin-bottom: 30rpx;
}

.reminder-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 16rpx;
}

.reminder-desc {
    font-size: 28rpx;
    color: #718096;
    margin-bottom: 40rpx;
    padding: 0 40rpx;
}

/* 表单列表样式 */
.form-list {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 40rpx;
    /* #ifdef APP-PLUS */
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    /* #endif */
    margin-bottom: 40rpx;
}

.form-category {
    margin-bottom: 40rpx;
}

.form-category:last-child {
    margin-bottom: 0;
}

.category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
}

.category-title {
    display: flex;
    align-items: center;
    gap: 16rpx;
    font-weight: 600;
}

.category-icon {
    width: 64rpx;
    height: 64rpx;
    background: #f7fafc;
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.input-row {
    display: flex;
    align-items: center;
    padding: 24rpx;
    border-radius: 24rpx;
    background: #f7fafc;
}

.form-input {
    flex: 1;
    font-size: 28rpx;
    height: 48rpx;
    line-height: 48rpx;
}

.input-unit {
    font-size: 28rpx;
    color: #718096;
    margin-left: 16rpx;
}

.picker-content {
    padding: 8rpx 0;
}

.picker-text {
    font-size: 28rpx;
}

.picker-text.empty {
    color: #94a3b8;
}

.gender-row {
    display: flex;
    gap: 20rpx;
}

.gender-option {
    flex: 1;
    padding: 24rpx;
    background: #f7fafc;
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16rpx;
}

.gender-option.active {
    background: rgba(76, 81, 191, 0.1);
}

.gender-option.active .gender-label {
    color: #4c51bf;
}

.gender-emoji {
    font-size: 32rpx;
}

.gender-label {
    font-size: 28rpx;
    color: #1a1a1a;
}

/* 按钮样式 */
.setup-btn {
    width: 100%;
    height: 96rpx;
    background: #4c51bf;
    color: #ffffff;
    border-radius: 16rpx;
    font-size: 32rpx;
    font-weight: 500;
    border: none;
    /* #ifdef APP-PLUS */
    box-shadow: 0 4rpx 12rpx rgba(76, 81, 191, 0.2);
    /* #endif */
    display: flex;
    align-items: center;
    justify-content: center;
}

.setup-btn:active {
    opacity: 0.9;
}
</style>