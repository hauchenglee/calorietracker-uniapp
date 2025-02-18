<template>
    <view :style="{ paddingTop: statusBarHeight + 'px' }"></view>
    <view class="container">
        <!-- 顶部切换卡片 -->
        <view class="nutrition-summary">
            <button
                :class="{ active: activeTab === 0 }"
                class="tab-btn"
                @click="showTab(0)"
            >
                <view class="progress-icon calories">🥗</view>
                <text>全部食物</text>
            </button>
            <button
                :class="{ active: activeTab === 1 }"
                class="tab-btn"
                @click="showTab(1)"
            >
                <view class="progress-icon">⭐</view>
                <text>我的食物</text>
            </button>
        </view>

        <view class="search-box">
            <view class="search-input-wrapper">
                <input
                    v-model="searchText"
                    class="search-input"
                    type="text"
                    placeholder="搜索食物..."
                    @input="onSearch"
                    @confirm="onSearch"
                />
                <view v-if="searchText" class="clear-icon" @tap="clearSearch">✕</view>
                <view class="search-icon" @tap="onSearch">🔍</view>
            </view>
        </view>

        <!-- 食物列表 -->
        <view class="meal-list">
            <view class="food-row" v-for="food in foodList" :key="food.id">
                <view class="food-detail">
                    <view class="food-info">
                        <view class="food-header">
                            <text class="food-name">{{ food.name }}</text>
                            <text v-if="food.brand" class="food-brand">{{ food.brand }}</text>
                        </view>
                        <view class="food-quantity">
                            <text>每 {{ food.quantity }} {{ food.unit }}</text>
                        </view>
                        <view class="food-nutrients">
                            <text class="food-carbohydrate">碳水 {{ food.carbohydrate }}g</text>
                            <text class="food-protein">蛋白质 {{ food.protein }}g</text>
                            <text class="food-fat">脂肪 {{ food.fat }}g</text>
                        </view>
                    </view>
                </view>
                <view class="food-calories">
                    <text class="calories-value">{{ food.calorie }}</text>
                    <text class="calories-unit">kcal</text>
                </view>
            </view>
        </view>

        <!-- Loading遮罩 -->
        <loading-overlay :show="isLoading"/>
    </view>
</template>

<script>
import loadingOverlay from "@/components/loading-overlay.vue";

export default {
    components: {
        loadingOverlay
    },

    data() {
        return {
            statusBarHeight: 0,
            activeTab: 0,
            isLoading: false,
            searchText: '', // 搜索关键词
            foodList: []
        }
    },

    onLoad() {
        const systemInfo = uni.getSystemInfoSync()
        this.statusBarHeight = systemInfo.statusBarHeight
        this.loadFoodList()
    },

    methods: {
        showTab(index) {
            this.activeTab = index
            this.loadFoodList()
        },

        loadFoodList() {
            this.isLoading = true;

            const mockData = {
                "code": "0000",
                "message": "success",
                "data": {
                    "content": [
                        {
                            "id": "123e4567-e89b-12d3-a456-426614174000",
                            "name": "香蕉",
                            "brand": "都乐",
                            "quantity": 100.0,
                            "unit": "克",
                            "calorie": 89.0,
                            "carbohydrate": 22.8,
                            "protein": 1.1,
                            "fat": 0.3
                        },
                        {
                            "id": "123e4567-e89b-12d3-a456-426614174001",
                            "name": "全脂牛奶",
                            "brand": "蒙牛",
                            "quantity": 200.0,
                            "unit": "毫升",
                            "calorie": 126.0,
                            "carbohydrate": 9.6,
                            "protein": 6.6,
                            "fat": 7.0
                        }
                    ]
                }
            }

            setTimeout(() => {
                this.foodList = mockData.data.content.map(item => ({
                    ...item,
                    calorie: Number(item.calorie).toFixed(1),
                    carbohydrate: Number(item.carbohydrate).toFixed(1),
                    protein: Number(item.protein).toFixed(1),
                    fat: Number(item.fat).toFixed(1),
                    quantity: Number(item.quantity).toFixed(1)
                }))
                this.isLoading = false
            }, 500)
        },

        onSearch() {

        },

        clearSearch() {
            this.searchText = '';
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

.nutrition-summary {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 40rpx;
    margin-bottom: 40rpx;
    display: flex;
    gap: 20rpx;
    /* #ifdef APP-PLUS */
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    /* #endif */
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

.progress-icon {
    width: 48rpx;
    height: 48rpx;
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.search-box {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 30rpx 40rpx;
    margin-bottom: 40rpx;
    /* #ifdef APP-PLUS */
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    /* #endif */
}

.search-input-wrapper {
    display: flex;
    align-items: center;
    background: #f7fafc;
    border-radius: 16rpx;
    padding: 20rpx 24rpx;
    gap: 16rpx;
}

.search-input {
    flex: 1;
    font-size: 28rpx;
    color: #1a1a1a;
    padding: 0 12rpx;
}

.search-icon {
    width: 64rpx;
    height: 64rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
    background: #718096;
    border-radius: 12rpx;
    transition: all 0.2s ease;
}

.search-icon:active {
    opacity: 0.9;
    transform: scale(0.95);
}

.clear-icon {
    width: 48rpx;
    height: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #718096;
    font-size: 24rpx;
    border-radius: 24rpx;
    background: #edf2f7;
    transition: all 0.2s ease;
}

.clear-icon:active {
    opacity: 0.9;
    transform: scale(0.95);
}

.meal-list {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 40rpx;
    /* #ifdef APP-PLUS */
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    /* #endif */
}

.food-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 24rpx;
    border-radius: 24rpx;
    background: #f7fafc;
    margin-bottom: 20rpx;
}

.food-row:last-child {
    margin-bottom: 0;
}

.food-detail {
    flex: 1;
}

.food-info {
    display: flex;
    flex-direction: column;
    gap: 8rpx;
}

.food-header {
    display: flex;
    align-items: center;
    gap: 12rpx;
}

.food-name {
    font-weight: 500;
    font-size: 28rpx;
}

.food-brand {
    font-size: 24rpx;
    color: #718096;
    padding: 4rpx 12rpx;
    background: #f1f5f9;
    border-radius: 6rpx;
}

.food-quantity {
    font-size: 24rpx;
    color: #718096;
}

.food-nutrients {
    display: flex;
    gap: 12rpx;
    flex-wrap: wrap;
    margin-top: 4rpx;
}

.food-carbohydrate,
.food-protein,
.food-fat {
    font-size: 24rpx;
    padding: 4rpx 12rpx;
    border-radius: 8rpx;
}

.food-carbohydrate {
    color: #10b981;
    background: rgba(16, 185, 129, 0.1);
}

.food-protein {
    color: #8b5cf6;
    background: rgba(139, 92, 246, 0.1);
}

.food-fat {
    color: #f59e0b;
    background: rgba(245, 158, 11, 0.1);
}

.food-calories {
    text-align: right;
    min-width: 100rpx;
    padding-left: 16rpx;
}

.calories-value {
    font-weight: 600;
    font-size: 28rpx;
    display: block;
}

.calories-unit {
    font-size: 24rpx;
    color: #718096;
}

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