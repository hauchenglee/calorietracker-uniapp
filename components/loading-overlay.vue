<template>
    <view v-if="show" class="loading-overlay">
        <view class="loading-spinner">
            <view class="spinner-ring"></view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'loading-overlay',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style>
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.loading-spinner {
    width: 80rpx;
    height: 80rpx;
    position: relative;
}

.spinner-ring {
    width: 100%;
    height: 100%;
    border: 6rpx solid #f3f3f3;
    border-top: 6rpx solid #4c51bf;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>