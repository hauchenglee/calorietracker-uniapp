<template>
    <view :style="{ paddingTop: statusBarHeight + 'px' }"></view>
    <view class="container">
        <view class="date-picker">
            <view class="date-display">{{ currentDate }}</view>
            <view class="date-nav">
                <button class="date-btn" @click="changeDate(-1)">←</button>
                <button class="date-btn" @click="onShowDatePicker('date')">📅</button>
                <button class="date-btn" @click="changeDate(1)">→</button>
            </view>
        </view>

        <mx-date-picker
            :show="showPicker"
            :type="type"
            :value="currentDate"
            @confirm="onDatePickerConfirm"
            @cancel="onDatePickerCancel"
        />

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
            <!-- 早餐 -->
            <view class="meal-category">
                <view class="category-header">
                    <view class="category-title">
                        <view class="category-icon">🌅</view>
                        <text>早餐</text>
                    </view>
                    <text>{{ calculateMealCalories(dietData.breakfast) }} kcal</text>
                </view>

                <view v-if="dietData.breakfast && dietData.breakfast.length > 0">
                    <view class="food-row" v-for="food in dietData.breakfast" :key="food.id">
                        <view class="food-detail">
                            <view class="food-info">
                                <text class="food-name">{{ food.name }}</text>
                                <view>
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
                <view v-else class="empty-state">
                    <text>暂无记录</text>
                </view>
            </view>

            <!-- 午餐 -->
            <view class="meal-category">
                <view class="category-header">
                    <view class="category-title">
                        <view class="category-icon">☀️</view>
                        <text>午餐</text>
                    </view>
                    <text>{{ calculateMealCalories(dietData.lunch) }} kcal</text>
                </view>

                <view v-if="dietData.lunch && dietData.lunch.length > 0">
                    <view class="food-row" v-for="food in dietData.lunch" :key="food.id">
                        <view class="food-detail">
                            <view class="food-info">
                                <text class="food-name">{{ food.name }}</text>
                                <view>
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
                <view v-else class="empty-state">
                    <text>暂无记录</text>
                </view>
            </view>

            <!-- 晚餐 -->
            <view class="meal-category">
                <view class="category-header">
                    <view class="category-title">
                        <view class="category-icon">🌙</view>
                        <text>晚餐</text>
                    </view>
                    <text>{{ calculateMealCalories(dietData.dinner) }} kcal</text>
                </view>

                <view v-if="dietData.dinner && dietData.dinner.length > 0">
                    <view class="food-row" v-for="food in dietData.dinner" :key="food.id">
                        <view class="food-detail">
                            <view class="food-info">
                                <text class="food-name">{{ food.name }}</text>
                                <view>
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
                <view v-else class="empty-state">
                    <text>暂无记录</text>
                </view>
            </view>
        </view>

        <view class="floating-btn">+</view>

        <!-- 添加遮罩层和 loading -->
        <view class="loading-overlay" v-if="isLoading">
            <view class="loading-spinner">
                <view class="spinner-item" v-for="i in 3" :key="i"></view>
            </view>
        </view>
    </view>
</template>

<script>
import {dateFormatter} from '@/utils/dateFormatter.js'
import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue"
import dietApi from "@/api/diary-api";
import {Diet} from '@/models/Diet'
import {DietSummary} from '@/models/DietSummary'

export default {
    components: {
        MxDatePicker
    },

    data() {
        return {
            statusBarHeight: 0,// 适配屏幕高度

            // 其他
            isLoading: false, // 添加 loading 状态变量

            // 日期
            currentDate: '', // 添加当前日期字段
            showPicker: false, // mx-datepicker
            type: 'date', // mx-datepicker
            value: '', // mx-datepicker

            // 饮食数据
            dietData: {
                breakfast: [],
                lunch: [],
                dinner: []
            },
            // 营养摄入汇总
            summary: new DietSummary()
        }
    },

    onLoad() {
        // 获取状态栏高度
        const systemInfo = uni.getSystemInfoSync()
        this.statusBarHeight = systemInfo.statusBarHeight

        // 设置初始日期
        this.currentDate = this.getCurrentDate();
    },

    methods: {

        // 添加日期变更方法
        async changeDate(days) {
            this.isLoading = true;
            console.log("change data: " + this.isLoading)

            const date = new Date(dateFormatter.formatToSlash(this.currentDate)); // 转换为斜杠格式以确保兼容性
            date.setDate(date.getDate() + days);
            this.currentDate = dateFormatter.getCurrentDate(date);

            await new Promise(resolve => setTimeout(resolve, 800));
            await this.initData();

            this.isLoading = false;
        },

        // 获取当前日期，格式为 YYYY-MM-DD
        getCurrentDate(date = new Date()) {
            return dateFormatter.getCurrentDate(date);
        },

        onShowDatePicker(type) {
            this.type = type;
            this.showPicker = true;
        },

        async onDatePickerConfirm(e) {
            this.showPicker = false;
            if (e) {
                this.isLoading = true;
                // 将日期格式从 yyyy/mm/dd 转换为 yyyy-mm-dd
                this.currentDate = dateFormatter.formatToHyphen(e.value);

                // 等待800ms
                await new Promise(resolve => setTimeout(resolve, 800));

                // 重新获取数据
                await this.initData();

                this.isLoading = false;
            }
        },

        onDatePickerCancel() {
            this.showPicker = false;
        },
        // 日期 end

        // 页面初始化，调用api
        async initData() {
            try {
                // 如果 currentDate 为空，才设置为当前日期
                if (!this.currentDate) {
                    this.currentDate = this.getCurrentDate();
                }

                const response = await dietApi.getByDate({date: this.currentDate});
                console.log('API Response:', response);
                if (response.code === 'A0001') {
                    // 处理摘要数据
                    this.summary = new DietSummary(response.data.summary);

                    // 处理饮食数据
                    this.dietData = {
                        breakfast: (response.data.breakfast || []).map(item => new Diet(item)),
                        lunch: (response.data.lunch || []).map(item => new Diet(item)),
                        dinner: (response.data.dinner || []).map(item => new Diet(item))
                    };
                } else {
                    uni.showToast({
                        title: '获取数据失败',
                        icon: 'none'
                    });
                }
            } catch (error) {
                console.error('API Error:', error);
                uni.showToast({
                    title: '获取数据失败',
                    icon: 'none'
                });
            }
        },

        // 计算每餐的总卡路里
        calculateMealCalories(foods) {
            return foods.reduce((sum, food) => sum + parseFloat(food.calorie || 0), 0).toFixed(1);
        },

    } // method end
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
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
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
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
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

.meal-list {
    background: #ffffff;
    border-radius: 40rpx;
    padding: 40rpx;
    /* #ifdef APP-PLUS */
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
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

.food-info {
    flex: 1;
}

.food-name {
    font-weight: 500;
    margin-bottom: 4rpx;
    font-size: 28rpx;
}

.food-carbohydrate, .food-protein, .food-fat {
    font-size: 24rpx;
    margin-right: 16rpx;
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
}

.calories-value {
    font-weight: 600;
    font-size: 28rpx;
}

.calories-unit {
    font-size: 24rpx;
    color: #718096;
}

.empty-state {
    padding: 40rpx 0;
    text-align: center;
    color: #94a3b8;
    font-size: 28rpx;
    background: #f7fafc;
    border-radius: 24rpx;
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

/* loading start */
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
    display: flex;
    gap: 12rpx;
}

.spinner-item {
    width: 20rpx;
    height: 20rpx;
    border-radius: 50%;
    background-color: #4c51bf; /* 使用与浮动按钮相同的颜色 */
    animation: bounce 0.8s infinite ease-in-out;
}

.spinner-item:nth-child(1) {
    animation-delay: -0.32s;
}

.spinner-item:nth-child(2) {
    animation-delay: -0.16s;
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

/* loading end */
</style>