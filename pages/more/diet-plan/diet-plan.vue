<template>
    <view :style="{ paddingTop: statusBarHeight + 'px' }"></view>
    <view class="container">
        <!-- 顶部提示卡片 -->
        <view class="setup-reminder">
            <view class="reminder-card">
                <view class="reminder-icon">📊</view>
                <view class="reminder-title">营养建议设置</view>
                <view class="reminder-desc">根据您的身体数据，我们为您计算了以下营养建议值</view>
            </view>
        </view>

        <!-- 营养素来源建议 -->
        <view class="nutrition-list">
            <view class="category-header">
                <view class="category-title">
                    <view class="category-icon">🥗</view>
                    <text>营养素来源建议</text>
                </view>
            </view>

            <!-- 碳水化合物来源 -->
            <view class="nutrient-row">
                <view class="food-detail">
                    <view class="progress-icon carbs">🌾</view>
                    <view class="food-info">
                        <text class="food-name">碳水化合物</text>
                        <view class="food-sources">
                            <text class="source-tag">全谷物</text>
                            <text class="source-tag">水果</text>
                            <text class="source-tag">蔬菜</text>
                            <text class="source-tag">燕麦</text>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 蛋白质来源 -->
            <view class="nutrient-row">
                <view class="food-detail">
                    <view class="progress-icon protein">🥩</view>
                    <view class="food-info">
                        <text class="food-name">蛋白质</text>
                        <view class="food-sources">
                            <text class="source-tag">瘦肉</text>
                            <text class="source-tag">鱼</text>
                            <text class="source-tag">蛋</text>
                            <text class="source-tag">豆制品</text>
                            <text class="source-tag">鸡胸肉</text>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 脂肪来源 -->
            <view class="nutrient-row">
                <view class="food-detail">
                    <view class="progress-icon fat">🥑</view>
                    <view class="food-info">
                        <text class="food-name">脂肪</text>
                        <view class="food-sources">
                            <text class="source-tag">坚果</text>
                            <text class="source-tag">橄榄油</text>
                            <text class="source-tag">牛油果</text>
                            <text class="source-tag">鱼油</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 具体实施建议 -->
        <view class="nutrition-list">
            <view class="category-header" @tap="toggleAdvice">
                <view class="category-title">
                    <view class="category-icon">📝</view>
                    <text>具体实施建议</text>
                </view>
                <view class="expand-icon" :class="{ 'is-expanded': isAdviceExpanded }">
                    <text>↓</text>
                </view>
            </view>

            <view class="advice-list" :class="{ 'is-expanded': isAdviceExpanded }">
                <view class="advice-item" v-for="(item, index) in implementationAdvice" :key="index">
                    <view class="advice-number">{{ index + 1 }}</view>
                    <text class="advice-text">{{ item }}</text>
                </view>
            </view>
        </view>

        <!-- 营养建议列表 -->
        <view class="nutrition-list">
            <view class="category-header">
                <view class="category-title">
                    <view class="category-icon">⚡️</view>
                    <text>每日推荐摄入</text>
                </view>
            </view>

            <!-- 卡路里 -->
            <view class="nutrient-row">
                <view class="food-detail">
                    <view class="progress-icon calories">🔥</view>
                    <view class="food-info">
                        <text class="food-name">卡路里</text>
                        <view>
                            <text class="value-tag calories">建议值</text>
                        </view>
                    </view>
                </view>
                <view class="food-calories">
                    <text class="calories-value">{{ dietPlan.calorie }}</text>
                    <text class="calories-unit">kcal</text>
                </view>
                <button class="edit-btn">✏️</button>
            </view>

            <!-- 碳水化合物 -->
            <view class="nutrient-row">
                <view class="food-detail">
                    <view class="progress-icon carbs">🌾</view>
                    <view class="food-info">
                        <text class="food-name">碳水化合物</text>
                        <view>
                            <text class="value-tag carbs">{{ nutritionPercentages.carbs }}%</text>
                        </view>
                    </view>
                </view>
                <view class="food-calories">
                    <text class="calories-value">{{ dietPlan.carbohydrate }}</text>
                    <text class="calories-unit">g</text>
                </view>
                <button class="edit-btn">✏️</button>
            </view>

            <!-- 蛋白质 -->
            <view class="nutrient-row">
                <view class="food-detail">
                    <view class="progress-icon protein">🥩</view>
                    <view class="food-info">
                        <text class="food-name">蛋白质</text>
                        <view>
                            <text class="value-tag protein">{{ nutritionPercentages.protein }}%</text>
                        </view>
                    </view>
                </view>
                <view class="food-calories">
                    <text class="calories-value">{{ dietPlan.protein }}</text>
                    <text class="calories-unit">g</text>
                </view>
                <button class="edit-btn">✏️</button>
            </view>

            <!-- 脂肪 -->
            <view class="nutrient-row">
                <view class="food-detail">
                    <view class="progress-icon fat">🥑</view>
                    <view class="food-info">
                        <text class="food-name">脂肪</text>
                        <view>
                            <text class="value-tag fat">{{ nutritionPercentages.fat }}%</text>
                        </view>
                    </view>
                </view>
                <view class="food-calories">
                    <text class="calories-value">{{ dietPlan.fat }}</text>
                    <text class="calories-unit">g</text>
                </view>
                <button class="edit-btn">✏️</button>
            </view>

            <!-- 底部按钮 -->
            <view class="button-group">
                <button class="reset-btn" @tap="renew">重新分析</button>
                <button class="setup-btn" @tap="save">保存设置</button>
            </view>
        </view>

        <!-- 添加遮罩层和 loading -->
        <loading-overlay :show="isLoading"/>
    </view>
</template>

<script>
import loadingOverlay from "@/components/loading-overlay.vue";
import dietPlanApi from "@/api/diet-plan-api";
import DietPlan from '@/models/diet-plan'

export default {
    components: {loadingOverlay},
    data() {
        return {
            statusBarHeight: 0,// 适配屏幕高度

            isLoading: false,

            isAdviceExpanded: false, // 控制建议列表的展开状态

            dietPlan: new DietPlan(),

            implementationAdvice: [], // 初始化为空数组
        }
    },

    onLoad() {
        // 获取状态栏高度
        const systemInfo = uni.getSystemInfoSync()
        this.statusBarHeight = systemInfo.statusBarHeight
    },

    async onShow() {
        try {
            this.isLoading = true;
            await this.initData();
        } catch (error) {
            uni.showToast({
                title: 'onShow error',
                icon: 'error'
            });
        } finally {
            this.isLoading = false;
        }
    },

    computed: {
        // 计算各营养素的卡路里和百分比
        nutritionPercentages() {
            // 碳水化合物：1g = 4kcal
            const carbsCalories = this.dietPlan.carbohydrate * 4;
            const carbsPercentage = this.calculatePercentage(carbsCalories);

            // 蛋白质：1g = 4kcal
            const proteinCalories = this.dietPlan.protein * 4;
            const proteinPercentage = this.calculatePercentage(proteinCalories);

            // 脂肪：1g = 9kcal
            const fatCalories = this.dietPlan.fat * 9;
            const fatPercentage = this.calculatePercentage(fatCalories);

            return {
                carbs: Math.round(carbsPercentage),
                protein: Math.round(proteinPercentage),
                fat: Math.round(fatPercentage)
            };
        }
    },

    methods: {
        toggleAdvice() {
            this.isAdviceExpanded = !this.isAdviceExpanded;
        },

        // 添加一个处理detailedSuggestion的方法
        parseDetailedSuggestion(text) {
            if (!text) return [];
            // 分割文本并移除空行
            return text.split('\n')
                .map(line => line.trim()) // 移除前后空格
                .filter(line => line) // 移除空行
                .map(line => line.replace(/^\d+\.\s*/, '')); // 移除数字序号和点
        },

        // 计算百分比的辅助方法
        calculatePercentage(calories) {
            if (!this.dietPlan.calorie || this.dietPlan.calorie === 0) return 0;
            return (calories / this.dietPlan.calorie) * 100;
        },

        async initData() {
            try {
                const response = await dietPlanApi.getDietPlan({});
                if (response.code === 'A0001') {
                    console.log(response.data)
                    this.dietPlan = new DietPlan(response.data);
                    this.implementationAdvice = this.parseDetailedSuggestion(this.dietPlan.detailedSuggestion);
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
            }
        },

        async renew() {
            try {
                this.isLoading = true;
                await new Promise(resolve => setTimeout(resolve, 500));

                const response = await dietPlanApi.renew({});
                if (response.code === 'A0001') {
                    this.dietPlan = new DietPlan(response.data);
                    this.implementationAdvice = this.parseDetailedSuggestion(this.dietPlan.detailedSuggestion);
                } else {
                    uni.showToast({
                        title: response.message,
                        icon: 'error'
                    });
                }
            } catch (error) {
                this.isLoading = false;
                uni.showToast({
                    title: error.message,
                    icon: 'error'
                });
            } finally {
                this.isLoading = false;
                uni.hideLoading();
            }
        },

        async save() {
            try {
                this.isLoading = true;
                await new Promise(resolve => setTimeout(resolve, 500));

                const response = await dietPlanApi.save({});
                if (response.code === 'A0001') {
                    uni.showToast({
                        title: response.message,
                        icon: 'success'
                    })
                } else {
                    uni.showToast({
                        title: response.message,
                        icon: 'error'
                    });
                }
            } catch (error) {
                this.isLoading = false;
                uni.showToast({
                    title: error.message,
                    icon: 'error'
                });
            } finally {
                this.isLoading = false;
                uni.hideLoading();
            }
        }
    }
}
</script>

<style>
/* 复用全局样式 */
page {
    background: #f5f7fa;
    color: #1a1a1a;
}

.container {
    padding: 30rpx;
}

/* 复用提示卡片样式 */
.setup-reminder {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 50rpx;
    /* #ifdef APP-PLUS */
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    /* #endif */
    margin-bottom: 40rpx;
}

.reminder-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 40rpx 0;
}

.reminder-icon {
    font-size: 80rpx;
    margin-bottom: 30rpx;
}

.reminder-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 16rpx;
}

.reminder-desc {
    font-size: 28rpx;
    color: #718096;
    margin-bottom: 40rpx;
    padding: 0 40rpx;
}

/* 建议 */
.food-sources {
    display: flex;
    flex-wrap: wrap;
    gap: 12rpx;
    margin-top: 8rpx;
}

.source-tag {
    font-size: 24rpx;
    padding: 4rpx 16rpx;
    border-radius: 8rpx;
    background: #ffffff;
    color: #718096;
}

/* 具体实施建议 */
/* 展开/收起图标样式 */
.expand-icon {
    width: 40rpx;
    height: 40rpx;
    background: #f7fafc;
    border-radius: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
}

.expand-icon.is-expanded {
    transform: rotate(180deg);
}

.expand-icon text {
    color: #718096;
    font-size: 24rpx;
}

/* 建议列表展开/收起动画 */
.advice-list {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
    opacity: 0;
}

.advice-list.is-expanded {
    max-height: 1000rpx; /* 设置一个足够大的高度 */
    opacity: 1;
}

.advice-item {
    display: flex;
    align-items: flex-start;
    gap: 16rpx;
    padding: 24rpx;
    border-radius: 24rpx;
    background: #f7fafc;
}

.advice-number {
    width: 40rpx;
    height: 40rpx;
    background: #4c51bf;
    color: #ffffff;
    border-radius: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    flex-shrink: 0;
}

.advice-text {
    font-size: 28rpx;
    color: #1a1a1a;
    line-height: 1.5;
}

/* 营养列表样式 */
.nutrition-list {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 40rpx;
    margin-bottom: 40rpx;
    /* #ifdef APP-PLUS */
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    /* #endif */
}

.category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20rpx;
    border-bottom: 4rpx solid #edf2f7;
    margin-bottom: 30rpx;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}

/* 添加悬停效果 */
.category-header:active {
    opacity: 0.8;
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

.nutrient-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx;
    border-radius: 24rpx;
    background: #f7fafc;
    margin-bottom: 20rpx;
}

.food-detail {
    display: flex;
    align-items: center;
    gap: 24rpx;
    flex: 1;
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

.food-info {
    flex: 1;
}

.food-name {
    font-weight: 500;
    margin-bottom: 4rpx;
    font-size: 28rpx;
}

.value-tag {
    font-size: 24rpx;
    padding: 4rpx 12rpx;
    border-radius: 8rpx;
}

/* 复用颜色样式 */
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

.food-calories {
    text-align: right;
    margin-right: 16rpx;
}

.calories-value {
    font-weight: 600;
    font-size: 28rpx;
}

.calories-unit {
    font-size: 24rpx;
    color: #718096;
    margin-left: 4rpx;
}

.edit-btn {
    background: none;
    border: none;
    padding: 16rpx;
    line-height: 1;
    font-size: 28rpx;
}

/* 按钮组样式 */
.button-group {
    display: flex;
    gap: 20rpx;
    margin-top: 40rpx;
}

.reset-btn {
    flex: 1;
    height: 88rpx;
    background: #f7fafc;
    color: #4a5568;
    border-radius: 16rpx;
    font-size: 28rpx;
    font-weight: 500;
    border: none;
}

.setup-btn {
    flex: 1;
    height: 88rpx;
    background: #4c51bf;
    color: #ffffff;
    border-radius: 16rpx;
    font-size: 28rpx;
    font-weight: 500;
    border: none;
    /* #ifdef APP-PLUS */
    box-shadow: 0 4rpx 12rpx rgba(76, 81, 191, 0.2);
    /* #endif */
}

.setup-btn:active {
    opacity: 0.9;
}
</style>