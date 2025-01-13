<template>
    <view :style="{ paddingTop: statusBarHeight + 'px' }"></view>
    <view class="container">
        <!-- 个人信息卡片 -->
        <view class="profile-card">
            <view class="avatar">👤</view>
            <view class="user-info">
                <text class="username">张三</text>
                <text class="user-level">普通会员</text>
            </view>
            <text class="arrow">></text>
        </view>

        <!-- 设置列表 -->
        <view class="menu-section">
            <view class="list-menu">
                <view class="list-item" v-for="(item, index) in settingItems" :key="index" @tap="navigateTo(item.path)">
                    <view class="list-left">
                        <view class="list-icon">{{ item.icon }}</view>
                        <text>{{ item.label }}</text>
                    </view>
                    <text v-if="item.badge" class="badge">{{ item.badge }}</text>
                    <text v-else class="arrow">></text>
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
                {icon: '📊', label: '数据统计', path: '/pages/more/statistic/statistic'},
                {icon: '⚙️', label: '系统设置', path: '/pages/more/setting/setting'},
                {icon: '💡', label: '帮助中心', path: '/pages/more/support/support'}
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
    min-height: 100vh;
}

.container {
    padding: 30rpx 40rpx;
}

.profile-card {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 40rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    margin-bottom: 30rpx;
    display: flex;
    align-items: center;
    gap: 20rpx;
    position: relative;
}

.profile-card .arrow {
    position: absolute;
    right: 40rpx;
}

.avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 24rpx;
    background: #f7fafc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
}

.user-info {
    display: flex;
    flex-direction: column;
}

.username {
    font-size: 48rpx;
    font-weight: bold;
    margin-bottom: 4rpx;
}

.user-level {
    color: #718096;
    font-size: 28rpx;
}

.menu-section {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 30rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    margin-bottom: 30rpx;
}

.list-menu {
    background: #ffffff;
    border-radius: 24rpx;
    overflow: hidden;
}

.list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40rpx;
    border-bottom: 2rpx solid #edf2f7;
}

.list-item:last-child {
    border-bottom: none;
}

.list-left {
    display: flex;
    align-items: center;
    gap: 32rpx;
}

.list-icon {
    width: 80rpx;
    height: 80rpx;
    background: #f7fafc;
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40rpx;
}

.badge {
    padding: 8rpx 24rpx;
    background: rgba(76, 81, 191, 0.1);
    color: #4c51bf;
    border-radius: 40rpx;
    font-size: 24rpx;
}

.arrow {
    color: #a0aec0;
}
</style>