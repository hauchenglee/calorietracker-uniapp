<template>
    <view :style="{ paddingTop: statusBarHeight + 'px' }"></view>
    <view class="container">
        <!-- 顶部切换卡片 -->
        <view class="date-picker">
            <button
                :class="{ active: activeTab === 0 }"
                class="tab-btn"
                @click="showTab(0)"
            >
                <view class="category-icon">🥗</view>
                <text>全部食物</text>
            </button>
            <button
                :class="{ active: activeTab === 1 }"
                class="tab-btn"
                @click="showTab(1)"
            >
                <view class="category-icon">⭐</view>
                <text>我的食物</text>
            </button>
        </view>

        <!-- Loading遮罩 -->
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

            activeTab: 0,

            isLoading: false,
        }
    },

    onLoad() {
        // 获取状态栏高度
        const systemInfo = uni.getSystemInfoSync()
        this.statusBarHeight = systemInfo.statusBarHeight
    },

    methods: {
        showTab(index) {
            this.activeTab = index
        },
    }
}
</script>

<style>
/* 全局样式 */
page {
    background: #f5f7fa;
    color: #1a1a1a;
}

.container {
    padding: 30rpx;
}

/* 顶部切换卡片 */
.date-picker {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 40rpx;
    /* #ifdef APP-PLUS */
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    /* #endif */
    margin-bottom: 40rpx;
    display: flex;
    gap: 20rpx;
}

.tab-btn {
    flex: 1;
    height: 88rpx;
    border: none;
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    background: #f7fafc;
    color: #718096;
    font-size: 28rpx;
    padding: 0;
}

.tab-btn.active {
    background: #4c51bf;
    color: #ffffff;
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

/* Loading样式 */
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