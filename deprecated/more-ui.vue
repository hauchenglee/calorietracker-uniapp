<template>
    <view :style="{ paddingTop: statusBarHeight + 'px' }"></view>
    <view class="container">
        <!-- 个人信息卡片 -->
        <view class="setup-reminder">
            <view class="reminder-card profile">
                <view class="reminder-icon avatar">👤</view>
                <view class="profile-info">
                    <text class="reminder-title">张三</text>
                    <text class="reminder-desc">普通会员</text>
                </view>
            </view>
        </view>

        <!-- 设置菜单列表 -->
        <view class="meal-list">
            <!-- 身体基础数据 -->
            <view class="meal-category">
                <view class="food-row" @tap="navigateTo('/pages/more/body/body')">
                    <view class="food-detail">
                        <view class="category-icon">📝</view>
                        <view class="food-info">
                            <text class="food-name">身体基础数据</text>
                        </view>
                    </view>
                    <view class="arrow">></view>
                </view>
            </view>

            <!-- 每日营养建议 -->
            <view class="meal-category">
                <view class="food-row" @tap="navigateTo('/pages/more/diet-plan/diet-plan')">
                    <view class="food-detail">
                        <view class="category-icon">🎯</view>
                        <view class="food-info">
                            <text class="food-name">每日营养建议</text>
                        </view>
                    </view>
                    <view class="badge">新</view>
                </view>
            </view>

            <!-- 系统设置 -->
            <view class="meal-category">
                <view class="food-row" @tap="navigateTo('/pages/more/setting/setting')">
                    <view class="food-detail">
                        <view class="category-icon">⚙️</view>
                        <view class="food-info">
                            <text class="food-name">系统设置</text>
                        </view>
                    </view>
                    <view class="arrow">></view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            statusBarHeight: 0,// 适配屏幕高度

            settingItems: [
                {icon: '📝', label: '身体基础数据', path: '/pages/more/body/body'},
                {icon: '🎯', label: '每日营养建议', path: '/pages/more/recommend/recommend', badge: '新'},
                // {icon: '📊', label: '数据统计', path: '/pages/more/statistic/statistic'},
                {icon: '⚙️', label: '系统设置', path: '/pages/more/setting/setting'},
                // {icon: '💡', label: '帮助中心', path: '/pages/more/support/support'}
            ]
        }
    },

    onLoad() {
        // 获取状态栏高度
        const systemInfo = uni.getSystemInfoSync()
        this.statusBarHeight = systemInfo.statusBarHeight
    },

    methods: {
        // 添加导航方法
        navigateTo(path) {
            uni.navigateTo({
                url: path,
                fail(err) {
                    console.error('页面跳转失败：', err)
                    uni.showToast({
                        title: '页面跳转失败',
                        icon: 'none'
                    })
                }
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

/* 个人信息卡片 */
.setup-reminder {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 50rpx;
    /* #ifdef APP-PLUS */
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    /* #endif */
    margin-bottom: 40rpx;
}

.reminder-card.profile {
    display: flex;
    align-items: center;
    text-align: left;
    padding: 0;
}

.reminder-icon.avatar {
    width: 120rpx;
    height: 120rpx;
    font-size: 60rpx;
    margin: 0;
    background: #f7fafc;
    border-radius: 32rpx;
}

.profile-info {
    margin-left: 32rpx;
}

/* 设置菜单列表 */
.meal-list {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 40rpx;
    /* #ifdef APP-PLUS */
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    /* #endif */
}

.meal-category {
    margin-bottom: 20rpx;
}

.meal-category:last-child {
    margin-bottom: 0;
}

.food-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx;
    border-radius: 24rpx;
    background: #f7fafc;
}

.food-detail {
    display: flex;
    align-items: center;
    gap: 24rpx;
}

.category-icon {
    width: 64rpx;
    height: 64rpx;
    background: #ffffff;
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
}

.food-info {
    flex: 1;
}

.food-name {
    font-weight: 500;
    font-size: 28rpx;
    color: #1a1a1a;
}

.badge {
    padding: 4rpx 16rpx;
    background: rgba(76, 81, 191, 0.1);
    color: #4c51bf;
    border-radius: 12rpx;
    font-size: 24rpx;
}

.arrow {
    color: #a0aec0;
    font-size: 28rpx;
}

/* 复用原有样式 */
.reminder-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 8rpx;
    display: block;
}

.reminder-desc {
    font-size: 28rpx;
    color: #718096;
    display: block;
}
</style>