<template>
    <view :style="{ paddingTop: statusBarHeight + 'px' }"></view>
    <view class="container">
        <view class="search-box">
            <view class="search-input-wrapper">
                <input
                    v-model="searchVo.text"
                    class="search-input"
                    type="text"
                    placeholder="搜索食物..."
                    @input="onSearch"
                    @confirm="onSearch"
                />
                <view v-if="searchVo.text" class="clear-icon" @tap="clearSearch">✕</view>
                <view class="search-icon" @tap="onSearch">🔍</view>
            </view>
        </view>

        <!-- 食物列表 -->
        <view class="meal-list">
            <view class="food-row" v-for="userFood in userFoodList" :key="userFood.id">
                <view class="food-detail">
                    <view class="food-info">
                        <view class="food-header">
                            <text class="food-name">{{ userFood.food.name }}</text>
                            <text v-if="userFood.food.brand" class="food-brand">{{ userFood.food.brand }}</text>
                            <text v-if="userFood.isFavorite === 'Y'" class="favorite-icon">⭐</text>
                        </view>
                        <view class="food-quantity">
                            <text>每 {{ userFood.food.quantity }} {{ userFood.food.unit }}</text>
                            <text v-if="userFood.frequency > 0" class="frequency">
                                使用次数: {{ userFood.frequency }}
                            </text>
                        </view>
                        <view class="food-nutrients">
                            <text class="food-carbohydrate">碳水 {{ userFood.food.carbohydrate }}g</text>
                            <text class="food-protein">蛋白质 {{ userFood.food.protein }}g</text>
                            <text class="food-fat">脂肪 {{ userFood.food.fat }}g</text>
                        </view>
                    </view>
                </view>
                <view class="food-calories">
                    <text class="calories-value">{{ userFood.food.calorie }}</text>
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
import userFoodApi from "@/api/user-food-api";
import SearchVo from "@/models/vo/search";
import UserFood from "@/models/user-food";

export default {
    components: {
        loadingOverlay
    },

    data() {
        return {
            statusBarHeight: 0,
            isLoading: false,
            userFoodList: [], // 改為 userFoodList
            searchVo: new SearchVo({
                text: '',
                page: 0,
                size: 20
            }),
        }
    },

    onLoad() {
        const systemInfo = uni.getSystemInfoSync()
        this.statusBarHeight = systemInfo.statusBarHeight
        this.loadUserFoodList()
    },

    methods: {
        async loadUserFoodList() {
            try {
                this.isLoading = true;
                const response = await userFoodApi.search(this.searchVo);
                if (response.code === 'A0001') {
                    this.userFoodList = response.data.map(item => UserFood.fromJson(item));
                } else {
                    uni.showToast({
                        title: response.message,
                        icon: 'error'
                    });
                }
            } catch (error) {
                uni.showToast({
                    title: error.message,
                    icon: 'error'
                });
            } finally {
                this.isLoading = false;
            }
        },

        async onSearch() {
            this.searchVo.page = 0;
            await this.loadUserFoodList();
        },

        clearSearch() {
            this.searchVo.text = '';
            this.searchVo.page = 0;
            this.loadUserFoodList();
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

.favorite-icon {
    font-size: 24rpx;
    margin-left: 8rpx;
    color: #fbbf24;
}

.frequency {
    margin-left: 12rpx;
    font-size: 24rpx;
    color: #64748b;
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