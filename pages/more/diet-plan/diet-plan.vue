<template>
    <view :style="{ paddingTop: statusBarHeight + 'px' }"></view>
    <view class="container">
        <!-- 顶部提示卡片 -->
        <view class="setup-reminder">
            <view class="reminder-card">
                <view class="reminder-icon">📊</view>
                <view class="reminder-title">营养建议设置</view>
                <view class="reminder-desc">根据您的身体数据，我们为您计算了以下营养建议值</view>
            </view>
        </view>

        <!-- 营养建议列表 -->
        <view class="nutrition-list">
            <view class="category-header">
                <view class="category-title">
                    <view class="category-icon">⚡️</view>
                    <text>每日推荐摄入</text>
                </view>
            </view>

            <!-- 基础代谢 -->
            <view class="nutrient-row">
                <view class="food-detail">
                    <view class="progress-icon calories">🔥</view>
                    <view class="food-info">
                        <text class="food-name">基础代谢</text>
                        <view>
                            <text class="value-tag calories">建议值</text>
                        </view>
                    </view>
                </view>
                <view class="food-calories">
                    <text class="calories-value">2000</text>
                    <text class="calories-unit">kcal</text>
                </view>
                <button class="edit-btn">✏️</button>
            </view>

            <!-- 碳水化合物 -->
            <view class="nutrient-row">
                <view class="food-detail">
                    <view class="progress-icon carbs">🌾</view>
                    <view class="food-info">
                        <text class="food-name">碳水化合物</text>
                        <view>
                            <text class="value-tag carbs">50%</text>
                        </view>
                    </view>
                </view>
                <view class="food-calories">
                    <text class="calories-value">250</text>
                    <text class="calories-unit">g</text>
                </view>
                <button class="edit-btn">✏️</button>
            </view>

            <!-- 蛋白质 -->
            <view class="nutrient-row">
                <view class="food-detail">
                    <view class="progress-icon protein">🥩</view>
                    <view class="food-info">
                        <text class="food-name">蛋白质</text>
                        <view>
                            <text class="value-tag protein">15%</text>
                        </view>
                    </view>
                </view>
                <view class="food-calories">
                    <text class="calories-value">75</text>
                    <text class="calories-unit">g</text>
                </view>
                <button class="edit-btn">✏️</button>
            </view>

            <!-- 脂肪 -->
            <view class="nutrient-row">
                <view class="food-detail">
                    <view class="progress-icon fat">🥑</view>
                    <view class="food-info">
                        <text class="food-name">脂肪</text>
                        <view>
                            <text class="value-tag fat">35%</text>
                        </view>
                    </view>
                </view>
                <view class="food-calories">
                    <text class="calories-value">67</text>
                    <text class="calories-unit">g</text>
                </view>
                <button class="edit-btn">✏️</button>
            </view>

            <!-- 底部按钮 -->
            <view class="button-group">
                <button class="reset-btn" @tap="resetToDefault">恢复默认值</button>
                <button class="setup-btn" @tap="saveSettings">保存设置</button>
            </view>
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
        }
    },

    onLoad() {
        // 获取状态栏高度
        const systemInfo = uni.getSystemInfoSync()
        this.statusBarHeight = systemInfo.statusBarHeight
    },

    methods: {}
}
</script>

<style>
/* 复用全局样式 */
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

/* 营养列表样式 */
.nutrition-list {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 40rpx;
    /* #ifdef APP-PLUS */
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    /* #endif */
}

.category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20rpx;
    border-bottom: 4rpx solid #edf2f7;
    margin-bottom: 30rpx;
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

.nutrient-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx;
    border-radius: 24rpx;
    background: #f7fafc;
    margin-bottom: 20rpx;
}

.food-detail {
    display: flex;
    align-items: center;
    gap: 24rpx;
    flex: 1;
}

.progress-icon {
    width: 48rpx;
    height: 48rpx;
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 28rpx;
}

.food-info {
    flex: 1;
}

.food-name {
    font-weight: 500;
    margin-bottom: 4rpx;
    font-size: 28rpx;
}

.value-tag {
    font-size: 24rpx;
    padding: 4rpx 12rpx;
    border-radius: 8rpx;
}

/* 复用颜色样式 */
.calories {
    background: #3b82f6;
}

.carbs {
    background: #10b981;
}

.protein {
    background: #8b5cf6;
}

.fat {
    background: #f59e0b;
}

.food-calories {
    text-align: right;
    margin-right: 16rpx;
}

.calories-value {
    font-weight: 600;
    font-size: 28rpx;
}

.calories-unit {
    font-size: 24rpx;
    color: #718096;
    margin-left: 4rpx;
}

.edit-btn {
    background: none;
    border: none;
    padding: 16rpx;
    line-height: 1;
    font-size: 28rpx;
}

/* 按钮组样式 */
.button-group {
    display: flex;
    gap: 20rpx;
    margin-top: 40rpx;
}

.reset-btn {
    flex: 1;
    height: 88rpx;
    background: #f7fafc;
    color: #4a5568;
    border-radius: 16rpx;
    font-size: 28rpx;
    font-weight: 500;
    border: none;
}

.setup-btn {
    flex: 1;
    height: 88rpx;
    background: #4c51bf;
    color: #ffffff;
    border-radius: 16rpx;
    font-size: 28rpx;
    font-weight: 500;
    border: none;
    /* #ifdef APP-PLUS */
    box-shadow: 0 4rpx 12rpx rgba(76, 81, 191, 0.2);
    /* #endif */
}

.setup-btn:active {
    opacity: 0.9;
}
</style>