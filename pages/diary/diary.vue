<template>
    <view :style="{ paddingTop: statusBarHeight + 'px' }"></view>
    <view class="container">
        <view class="date-picker">
            <view class="date-display">2025年1月8日</view>
            <view class="date-nav">
                <button class="date-btn">←</button>
                <button class="date-btn">📅</button>
                <button class="date-btn">→</button>
            </view>
        </view>

        <view class="nutrition-summary">
            <view class="progress-item">
                <view class="progress-header">
                    <view class="progress-label">
                        <view class="progress-icon calories">🔥</view>
                        <text>卡路里</text>
                    </view>
                    <text>1,422 / 2,000 kcal</text>
                </view>
                <view class="progress-bar">
                    <view class="progress-fill calories" style="width: 71%"></view>
                </view>
            </view>

            <view class="progress-item">
                <view class="progress-header">
                    <view class="progress-label">
                        <view class="progress-icon carbs">🌾</view>
                        <text>碳水化合物</text>
                    </view>
                    <text>175 / 250 g</text>
                </view>
                <view class="progress-bar">
                    <view class="progress-fill carbs" style="width: 70%"></view>
                </view>
            </view>

            <view class="progress-item">
                <view class="progress-header">
                    <view class="progress-label">
                        <view class="progress-icon protein">🥩</view>
                        <text>蛋白质</text>
                    </view>
                    <text>60 / 75 g</text>
                </view>
                <view class="progress-bar">
                    <view class="progress-fill protein" style="width: 80%"></view>
                </view>
            </view>

            <view class="progress-item">
                <view class="progress-header">
                    <view class="progress-label">
                        <view class="progress-icon fat">🥑</view>
                        <text>脂肪</text>
                    </view>
                    <text>30 / 65 g</text>
                </view>
                <view class="progress-bar">
                    <view class="progress-fill fat" style="width: 46%"></view>
                </view>
            </view>
        </view>

        <!-- 食物记录列表 -->
        <view class="meal-list">
            <view class="meal-category">
                <view class="category-header">
                    <view class="category-title">
                        <view class="category-icon">🌅</view>
                        <text>早餐</text>
                    </view>
                    <text>450 kcal</text>
                </view>

                <view class="food-row">
                    <view class="food-detail">
                        <view class="food-icon">🥛</view>
                        <view class="food-info">
                            <text class="food-name">全脂牛奶</text>
                            <text class="food-macro">蛋白质 8g · 碳水 12g · 脂肪 8g</text>
                        </view>
                    </view>
                    <view class="food-calories">
                        <text class="calories-value">150</text>
                        <text class="calories-unit">kcal</text>
                    </view>
                </view>

                <view class="food-row">
                    <view class="food-detail">
                        <view class="food-icon">🥖</view>
                        <view class="food-info">
                            <text class="food-name">全麦面包</text>
                            <text class="food-macro">蛋白质 6g · 碳水 28g · 脂肪 2g</text>
                        </view>
                    </view>
                    <view class="food-calories">
                        <text class="calories-value">180</text>
                        <text class="calories-unit">kcal</text>
                    </view>
                </view>
            </view>

            <view class="meal-category">
                <view class="category-header">
                    <view class="category-title">
                        <view class="category-icon">☀️</view>
                        <text>午餐</text>
                    </view>
                    <text>680 kcal</text>
                </view>

                <view class="food-row">
                    <view class="food-detail">
                        <view class="food-icon">🍚</view>
                        <view class="food-info">
                            <text class="food-name">糙米饭</text>
                            <text class="food-macro">碳水 44g · 蛋白质 4g</text>
                        </view>
                    </view>
                    <view class="food-calories">
                        <text class="calories-value">200</text>
                        <text class="calories-unit">kcal</text>
                    </view>
                </view>
            </view>

            <view class="meal-category">
                <view class="category-header">
                    <view class="category-title">
                        <view class="category-icon">🌙</view>
                        <text>晚餐</text>
                    </view>
                    <text>520 kcal</text>
                </view>

                <view class="food-row">
                    <view class="food-detail">
                        <view class="food-icon">🥘</view>
                        <view class="food-info">
                            <text class="food-name">清炒西兰花</text>
                            <text class="food-macro">蛋白质 5g · 碳水 8g · 脂肪 3g</text>
                        </view>
                    </view>
                    <view class="food-calories">
                        <text class="calories-value">120</text>
                        <text class="calories-unit">kcal</text>
                    </view>
                </view>

                <view class="food-row">
                    <view class="food-detail">
                        <view class="food-icon">🍗</view>
                        <view class="food-info">
                            <text class="food-name">鸡胸肉</text>
                            <text class="food-macro">蛋白质 25g · 碳水 0g · 脂肪 8g</text>
                        </view>
                    </view>
                    <view class="food-calories">
                        <text class="calories-value">250</text>
                        <text class="calories-unit">kcal</text>
                    </view>
                </view>

                <view class="food-row">
                    <view class="food-detail">
                        <view class="food-icon">🥗</view>
                        <view class="food-info">
                            <text class="food-name">蔬菜沙拉</text>
                            <text class="food-macro">蛋白质 3g · 碳水 15g · 脂肪 8g</text>
                        </view>
                    </view>
                    <view class="food-calories">
                        <text class="calories-value">150</text>
                        <text class="calories-unit">kcal</text>
                    </view>
                </view>
            </view>
        </view>

        <view class="floating-btn">+</view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            statusBarHeight: 0 // 适配屏幕高度
        }
    },
    onLoad() {
        // 获取状态栏高度
        const systemInfo = uni.getSystemInfoSync()
        this.statusBarHeight = systemInfo.statusBarHeight
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

.date-picker {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 40rpx;
    /* #ifdef APP-PLUS */
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.05);
    /* #endif */
    margin-bottom: 40rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.date-display {
    font-size: 32rpx;
    font-weight: 500;
}

.date-nav {
    display: flex;
    gap: 30rpx;
}

.date-btn {
    width: 72rpx;
    height: 72rpx;
    border-radius: 50%;
    border: none;
    background: #f5f7fa;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    line-height: 1;
}

.nutrition-summary {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 50rpx;
    /* #ifdef APP-PLUS */
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.05);
    /* #endif */
    margin-bottom: 40rpx;
}

.progress-item {
    margin-bottom: 40rpx;
}

.progress-item:last-child {
    margin-bottom: 0;
}

.progress-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16rpx;
}

.progress-label {
    display: flex;
    align-items: center;
    gap: 16rpx;
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

.progress-bar {
    height: 20rpx;
    background: #edf2f7;
    border-radius: 10rpx;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    border-radius: 10rpx;
    transition: width 0.3s ease;
}

.calories { background: #3b82f6; }
.carbs { background: #10b981; }
.protein { background: #8b5cf6; }
.fat { background: #f59e0b; }

.meal-list {
    background: #ffffff;
    border-radius: 40rpx;
    padding: 40rpx;
    /* #ifdef APP-PLUS */
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.05);
    /* #endif */
}

.meal-category {
    margin-bottom: 50rpx;
}

.meal-category:last-child {
    margin-bottom: 0;
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

.food-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx;
    border-radius: 24rpx;
    background: #f7fafc;
    margin-bottom: 20rpx;
}

.food-row:last-child {
    margin-bottom: 0;
}

.food-detail {
    display: flex;
    align-items: center;
    gap: 24rpx;
}

.food-icon {
    width: 72rpx;
    height: 72rpx;
    background: #ffffff;
    border-radius: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.food-info {
    flex: 1;
}

.food-name {
    font-weight: 500;
    margin-bottom: 4rpx;
    font-size: 28rpx;
}

.food-macro {
    font-size: 24rpx;
    color: #718096;
}

.food-calories {
    text-align: right;
}

.calories-value {
    font-weight: 600;
    font-size: 28rpx;
}

.calories-unit {
    font-size: 24rpx;
    color: #718096;
}

.floating-btn {
    position: fixed;
    bottom: 60rpx;
    right: 60rpx;
    width: 120rpx;
    height: 120rpx;
    border-radius: 60rpx;
    background: #4c51bf;
    color: #ffffff;
    font-size: 48rpx;
    /* #ifdef APP-PLUS */
    box-shadow: 0 8rpx 30rpx rgba(76, 81, 191, 0.3);
    /* #endif */
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>