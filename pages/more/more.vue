<template>
    <view class="container">
        <!-- 个人信息卡片 -->
        <view class="profile-card">
            <view class="avatar">👤</view>
            <view class="user-info">
                <text class="username">张三</text>
                <text class="user-level">普通会员</text>
            </view>
        </view>

        <!-- 常用功能 -->
        <view class="menu-section">
            <text class="section-title">常用功能</text>
            <view class="menu-grid">
                <view class="menu-item" v-for="(item, index) in menuItems" :key="index">
                    <view class="menu-icon">{{ item.icon }}</view>
                    <text class="menu-label">{{ item.label }}</text>
                </view>
            </view>
        </view>

        <!-- 设置列表 -->
        <view class="menu-section">
            <text class="section-title">系统设置</text>
            <view class="list-menu">
                <view class="list-item" v-for="(item, index) in settingItems" :key="index">
                    <view class="list-left">
                        <view class="list-icon">{{ item.icon }}</view>
                        <text>{{ item.label }}</text>
                    </view>
                    <text v-if="item.badge" class="badge">{{ item.badge }}</text>
                    <text v-else class="arrow">></text>
                </view>
            </view>
        </view>

        <view class="version">
            <text>Version 1.0.0</text>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            menuItems: [
                {icon: '📊', label: '数据统计'},
                {icon: '⭐️', label: '我的收藏'},
                {icon: '📝', label: '饮食记录'},
                {icon: '🎯', label: '目标设定'},
                {icon: '📱', label: '设备管理'},
                {icon: '🔔', label: '提醒设置'}
            ],
            settingItems: [
                {icon: '⚙️', label: '账号设置', badge: '新'},
                {icon: '🔒', label: '隐私设置'},
                {icon: '🌙', label: '深色模式'},
                {icon: '❓', label: '帮助中心'}
            ]
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

.section-title {
    font-size: 32rpx;
    font-weight: 600;
    margin-bottom: 20rpx;
    color: #4a5568;
}

.menu-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20rpx;
    margin-bottom: 30rpx;
}

.menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12rpx;
    padding: 20rpx;
    background: #f7fafc;
    border-radius: 20rpx;
}

.menu-icon {
    width: 96rpx;
    height: 96rpx;
    background: #ffffff;
    border-radius: 32rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.menu-label {
    font-size: 28rpx;
    color: #4a5568;
    text-align: center;
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

.version {
    text-align: center;
    color: #a0aec0;
    font-size: 28rpx;
    margin-top: 80rpx;
}
</style>