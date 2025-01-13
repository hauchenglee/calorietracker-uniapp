<template>
    <view :style="{ paddingTop: statusBarHeight + 'px' }"></view>
    <view class="container">
        <view class="header">
            <view class="header-icon">📊</view>
            <text class="header-title">营养建议设置</text>
            <text class="header-desc">根据您的身体数据，我们为您计算了以下营养建议值</text>
        </view>

        <view class="recommendations-card">
            <view class="card-title">
                <text>⚡️</text>
                <text>每日推荐摄入</text>
            </view>

            <view class="nutrient-row" v-for="(item, index) in nutrients" :key="index">
                <view class="nutrient-icon">{{ item.icon }}</view>
                <view class="nutrient-info">
                    <view class="nutrient-name">{{ item.name }}</view>
                    <view class="nutrient-value">
                        <text>{{ item.value }}</text>
                        <text class="value-tag">{{ item.tag }}</text>
                    </view>
                </view>
                <button class="edit-btn" @tap="editNutrient(index)">✏️</button>
            </view>

            <view class="bottom-buttons">
                <button class="secondary-btn" @tap="resetToDefault">恢复默认值</button>
                <button class="primary-btn" @tap="saveSettings">保存设置</button>
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
            nutrients: [
                {
                    icon: '🔥',
                    name: '基础代谢',
                    value: '2000 kcal',
                    tag: '建议值'
                },
                {
                    icon: '🌾',
                    name: '碳水化合物',
                    value: '250g',
                    tag: '50%'
                },
                {
                    icon: '🥩',
                    name: '蛋白质',
                    value: '75g',
                    tag: '15%'
                },
                {
                    icon: '🥑',
                    name: '脂肪',
                    value: '67g',
                    tag: '35%'
                }
            ]
        }
    },

    onLoad() {
        // 获取状态栏高度
        const systemInfo = uni.getSystemInfoSync()
        this.statusBarHeight = systemInfo.statusBarHeight
    },

    methods: {
        editNutrient(index) {
            // 编辑营养素的逻辑
            console.log('编辑营养素:', this.nutrients[index])
        },

        async resetToDefault() {
            this.isLoading = true
            try {
                // 重置为默认值的逻辑
                await new Promise(resolve => setTimeout(resolve, 1000))
                uni.showToast({
                    title: '已重置为默认值',
                    icon: 'success'
                })
            } catch (error) {
                uni.showToast({
                    title: '重置失败',
                    icon: 'none'
                })
            } finally {
                this.isLoading = false
            }
        },

        async saveSettings() {
            this.isLoading = true
            try {
                // 保存设置的逻辑
                await new Promise(resolve => setTimeout(resolve, 1000))
                uni.showToast({
                    title: '保存成功',
                    icon: 'success'
                })
            } catch (error) {
                uni.showToast({
                    title: '保存失败',
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
    display: block;
}

.recommendations-card {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 40rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    margin-bottom: 30rpx;
}

.card-title {
    font-size: 40rpx;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 48rpx;
    display: flex;
    align-items: center;
    gap: 16rpx;
}

.nutrient-row {
    display: flex;
    align-items: center;
    padding: 40rpx;
    background: #f7fafc;
    border-radius: 32rpx;
    margin-bottom: 32rpx;
}

.nutrient-icon {
    width: 96rpx;
    height: 96rpx;
    background: #ffffff;
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48rpx;
    margin-right: 32rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.nutrient-info {
    flex: 1;
}

.nutrient-name {
    font-weight: 500;
    color: #1a1a1a;
    margin-bottom: 8rpx;
    font-size: 32rpx;
}

.nutrient-value {
    color: #718096;
    font-size: 28rpx;
    display: flex;
    align-items: center;
    gap: 16rpx;
}

.value-tag {
    padding: 4rpx 16rpx;
    background: rgba(76, 81, 191, 0.1);
    color: #4c51bf;
    border-radius: 12rpx;
    font-size: 24rpx;
}

.edit-btn {
    padding: 16rpx;
    background: none;
    border: none;
    color: #4c51bf;
    font-size: 32rpx;
}

.bottom-buttons {
    display: flex;
    gap: 32rpx;
    margin-top: 80rpx;
}

.secondary-btn {
    flex: 1;
    height: 96rpx;
    background: #edf2f7;
    color: #4a5568;
    border: none;
    border-radius: 24rpx;
    font-size: 32rpx;
    font-weight: 500;
}

.primary-btn {
    flex: 1;
    height: 96rpx;
    background: #4c51bf;
    color: #ffffff;
    border: none;
    border-radius: 24rpx;
    font-size: 32rpx;
    font-weight: 500;
}

@keyframes bounce {
    to {
        transform: translateY(-20rpx);
    }
}
</style>