<template>
    <view :style="{ paddingTop: statusBarHeight + 'px' }"></view>
    <view class="container">

        <!-- 手动记录标签页 -->
        <view v-show="activeTab === 1" class="meal-list">
            <view class="category-header">
                <view class="category-title">
                    <view class="category-icon">📝</view>
                    <text>{{ $t('page.add.manual.title') }}</text>
                </view>
            </view>

            <view class="nutrition-form">
                <!-- 餐食 -->
                <view class="optional-row">
                    <view
                        :class="{ active: formData2.meal === 'breakfast' }"
                        class="meal-option"
                        @tap="selectMeal2('breakfast')"
                    >
                        <text class="meal-emoji">🌅</text>
                        <text class="meal-label">{{ $t('meal.breakfast') }}</text>
                    </view>
                    <view
                        :class="{ active: formData2.meal === 'lunch' }"
                        class="meal-option"
                        @tap="selectMeal2('lunch')"
                    >
                        <text class="meal-emoji">☀️</text>
                        <text class="meal-label">{{ $t('meal.lunch') }}</text>
                    </view>
                    <view
                        :class="{ active: formData2.meal === 'dinner' }"
                        class="meal-option"
                        @tap="selectMeal2('dinner')"
                    >
                        <text class="meal-emoji">🌙</text>
                        <text class="meal-label">{{ $t('meal.dinner') }}</text>
                    </view>
                </view>

                <!-- 日期 -->
                <view class="row-title">
                    <view class="row-detail">
                        <view class="row-icon">📅</view>
                        <text class="food-name">{{ $t('page.add.form.date') }}</text>
                    </view>
                </view>
                <view class="food-row">
                    <picker
                        :end="endDate"
                        :start="startDate"
                        :value="formData2.date"
                        class="picker-full"
                        mode="date"
                        @change="onDateChange2"
                    >
                        <text :class="['picker-text', !formData2.date && 'empty']">
                            {{ formData2.date || $t('page.add.form.date-placeholder') }}
                        </text>
                    </picker>
                </view>

                <!-- 食物名称 -->
                <view class="row-title">
                    <view class="row-detail">
                        <view class="row-icon">🍽️</view>
                        <text class="food-name">{{ $t('page.add.form.food-name') }}</text>
                    </view>
                </view>
                <view class="food-row">
                    <input
                        v-model="formData2.name"
                        class="form-input"
                        type="text"
                    />
                </view>

                <!-- 数量和单位 -->
                <view class="row-title">
                    <view class="row-detail">
                        <view class="row-icon">🔢</view>
                        <view class="food-header">
                            <text class="food-name">{{ $t('page.add.form.quantity') }}</text>
                            <text class="food-unit">{{ $t('page.add.form.quantity-range') }}</text>
                        </view>
                    </view>
                </view>
                <view class="food-row">
                    <view class="quantity-unit-group">
                        <input
                            v-model="formData2.quantity"
                            :max="99"
                            :min="1"
                            class="form-input quantity-input"
                            maxlength="2"
                            type="number"
                            @input="limitQuantityInput($event, 'formData2')"
                        />
                        <view class="unit-selector" @tap="showUnitSelector2">
                            <text>{{ formData2.unit || $t('page.add.form.unit.placeholder') }}</text>
                            <text class="unit-arrow">▼</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <view v-show="activeTab === 1" class="meal-list-progress-group">
            <!-- 营养素进度条组 -->
            <view class="progress-group">
                <!-- 热量 -->
                <view class="progress-item">
                    <view class="progress-header">
                        <view class="progress-label">
                            <view class="progress-icon calories">🔥</view>
                            <view class="label-group">
                                <text>{{ $t('nutrition.calorie.name') }}</text>
                                <text class="form-sublabel">{{ $t('page.add.form.daily-recommended') }} {{ dietPlan.calorie }} {{ $t('nutrition.calorie.unit') }}</text>
                            </view>
                        </view>
                        <input
                            v-model="formData2.calorie"
                            class="progress-input"
                            maxlength="4"
                            type="number"
                            @input="updateProgress('calorie', $event)"
                        />
                    </view>
                    <view class="progress-bar">
                        <view
                            :style="{ width: progressPercentages.calorie + '%' }"
                            class="progress-fill calories"
                        ></view>
                    </view>
                </view>

                <!-- 碳水化合物 -->
                <view class="progress-item">
                    <view class="progress-header">
                        <view class="progress-label">
                            <view class="progress-icon carbs">🌾</view>
                            <view class="label-group">
                                <text>{{ $t('nutrition.carbohydrate.name') }}</text>
                                <text class="form-sublabel">{{ $t('page.add.form.daily-recommended') }} {{ dietPlan.carbohydrate }} {{ $t('nutrition.carbohydrate.unit') }}</text>
                            </view>
                        </view>
                        <input
                            v-model="formData2.carbohydrate"
                            class="progress-input"
                            maxlength="4"
                            type="number"
                            @input="updateProgress('carbohydrate', $event)"
                        />
                    </view>
                    <view class="progress-bar">
                        <view
                            :style="{ width: progressPercentages.carbohydrate + '%' }"
                            class="progress-fill carbs"
                        ></view>
                    </view>
                </view>

                <!-- 蛋白质 -->
                <view class="progress-item">
                    <view class="progress-header">
                        <view class="progress-label">
                            <view class="progress-icon protein">🥩</view>
                            <view class="label-group">
                                <text>{{ $t('nutrition.protein.name') }}</text>
                                <text class="form-sublabel">{{ $t('page.add.form.daily-recommended') }} {{ dietPlan.protein }} {{ $t('nutrition.protein.unit') }}</text>
                            </view>
                        </view>
                        <input
                            v-model="formData2.protein"
                            class="progress-input"
                            maxlength="4"
                            type="number"
                            @input="updateProgress('protein', $event)"
                        />
                    </view>
                    <view class="progress-bar">
                        <view
                            :style="{ width: progressPercentages.protein + '%' }"
                            class="progress-fill protein"
                        ></view>
                    </view>
                </view>

                <!-- 脂肪 -->
                <view class="progress-item">
                    <view class="progress-header">
                        <view class="progress-label">
                            <view class="progress-icon fat">🥑</view>
                            <view class="label-group">
                                <text>{{ $t('nutrition.fat.name') }}</text>
                                <text class="form-sublabel">{{ $t('page.add.form.daily-recommended') }} {{ dietPlan.fat }} {{ $t('nutrition.fat.unit') }}</text>
                            </view>
                        </view>
                        <input
                            v-model="formData2.fat"
                            class="progress-input"
                            maxlength="4"
                            type="number"
                            @input="updateProgress('fat', $event)"
                        />
                    </view>
                    <view class="progress-bar">
                        <view
                            :style="{ width: progressPercentages.fat + '%' }"
                            class="progress-fill fat"
                        ></view>
                    </view>
                </view>
            </view>

            <button class="setup-btn submit-btn" @click="saveData2">{{ $t('common.save') }}</button>
        </view>

        <!-- 单位选择弹窗2 -->
        <view v-if="showUnitPopup2" class="unit-popup" @tap="closeUnitSelector2">
            <view class="unit-popup-content" @tap.stop>
                <view class="unit-popup-header">
                    <text class="unit-popup-title">{{ $t('page.add.form.unit.title') }}</text>
                    <text class="unit-popup-close" @tap="closeUnitSelector2">✕</text>
                </view>
                <!-- 常用单位快速选择 -->
                <view class="quick-units">
                    <view
                        v-for="unit in quickUnits2"
                        :key="unit"
                        :class="{ active: formData2.unit === unit }"
                        class="quick-unit-item"
                        @tap="selectUnit2(unit)"
                    >
                        {{ unit }}
                    </view>
                </view>
                <!-- 自定义单位输入 -->
                <view class="custom-unit">
                    <input
                        v-model="customUnit2"
                        :placeholder="$t('page.add.form.unit.custom-placeholder')"
                        class="custom-unit-input"
                        maxlength="10"
                        type="text"
                        @confirm="addCustomUnit2"
                    />
                    <button class="custom-unit-btn" @tap="addCustomUnit2">{{ $t('common.confirm') }}</button>
                </view>
            </view>
        </view>

        <!-- Loading遮罩 -->
        <loading-overlay :show="isLoading"/>
    </view>
</template>

<script>
import loadingOverlay from "@/components/loading-overlay.vue";
import addApi from "@/api/add-api";
import dietPlanApi from "@/api/diet-plan-api";
import DietPlan from '@/models/diet-plan'

export default {
    components: {loadingOverlay},
    data() {
        return {
            statusBarHeight: 0,// 适配屏幕高度

            activeTab: 0,
            previewImage: '',
            userPrompt: '',

            isLoading: false,

            // 单位量词
            showUnitPopup2: false,
            quickUnits2: ['份', '公克', '毫升', '碗', '盤', '湯匙', '片'],
            customUnit2: '',

            formData2: {
                date: new Date().toISOString().split('T')[0],
                meal: '',
                name: '',
                quantity: 1,
                unit: '份',
                calorie: 0,
                carbohydrate: 0,
                protein: 0,
                fat: 0
            },

            dietPlan: new DietPlan(),

            // 图片分析参数
            analysisCompleted: false,
            isAnalyzing: false,

            // 添加日期范围
            startDate: '1940-01-01', // 能手动选择的最早日期
            endDate: '2099-12-31',

            // bar 进度条百分比
            progressPercentages: {
                calorie: 0,
                carbohydrate: 0,
                protein: 0,
                fat: 0
            }
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
            await this.renew();
        } catch (error) {
            uni.showToast({
                title: 'onShow error',
                icon: 'error'
            });
        } finally {
            this.isLoading = false;
        }
    },

    methods: {
        showTab(index) {
            this.activeTab = index
        },

        onDateChange1(e) {
            this.formData1.date = e.detail.value;
        },

        onDateChange2(e) {
            this.formData2.date = e.detail.value;
        },

        selectMeal1(meal) {
            this.formData1.meal = meal
        },

        selectMeal2(meal) {
            this.formData2.meal = meal
        },

        // 控制输入数量 start
        limitQuantityInput(event, formName) {
            // uniapp中event.detail.value获取输入值
            let value = event.detail.value;

            // 如果输入为空，设为1
            if (!value) {
                this[formName].quantity = 1;
                return;
            }

            // 移除前导零
            value = value.toString().replace(/^0+/, '');

            // 转换为数字并确保在1-99范围内
            let numValue = parseInt(value);
            if (isNaN(numValue) || numValue < 1) {
                numValue = 1;
            }

            this[formName].quantity = numValue;
        },
        // 控制输入数量 end

        // 单位量词2 start
        showUnitSelector2() {
            this.showUnitPopup2 = true;
        },

        closeUnitSelector2() {
            this.showUnitPopup2 = false;
            this.customUnit2 = '';
        },

        selectUnit2(unit) {
            this.formData2.unit = unit;
            this.closeUnitSelector2();
        },

        addCustomUnit2() {
            if (this.customUnit2.trim()) {
                this.formData2.unit = this.customUnit2.trim();
                this.closeUnitSelector2();
            }
        },
        // 单位量词2 end

        updateProgress(nutrientType, event) {
            const inputValue = Number(event.detail.value);
            const recommendedValue = this.dietPlan[nutrientType];

            // 计算百分比，不超过100%
            let percentage = Math.min((inputValue / recommendedValue) * 100, 100);

            // 确保百分比是有效数字
            percentage = isNaN(percentage) ? 0 : Math.round(percentage);

            // 更新对应的进度条
            this.progressPercentages[nutrientType] = percentage;
        },

        validateFormData2() {
            // 与 validateFormData1 相同的实现，只是使用 formData2
            const requiredFields = {
                date: this.$t('page.add.form.date'),
                meal: this.$t('meal.field-name'),
                name: this.$t('page.add.form.food-name'),
                quantity: this.$t('page.add.form.quantity'),
                unit: this.$t('page.add.form.unit.title'),
            };

            for (const [field, label] of Object.entries(requiredFields)) {
                if (!this.formData2[field]) {
                    uni.showToast({
                        title: this.$t('page.add.validation.required').replace('%s', label),
                        icon: 'error'
                    });
                    return false;
                }
            }

            const numericFields = ['quantity', 'calorie', 'carbohydrate', 'protein', 'fat'];
            for (const field of numericFields) {
                const value = Number(this.formData2[field]);
                if (isNaN(value) || value < 0) {
                    uni.showToast({
                        title: this.$t('page.add.validation.positive').replace('%s', requiredFields[field]),
                        icon: 'error'
                    });
                    return false;
                }
            }

            return true;
        },

        async saveData2() {
            // 实现与 saveData1 相同，只是使用 formData2
            if (this.isLoading) return;

            if (!this.validateFormData2()) {
                return;
            }

            try {
                this.isLoading = true;
                await new Promise(resolve => setTimeout(resolve, 500));
                const response = await addApi.addByManual(this.formData2);
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
                })
            } finally {
                this.isLoading = false;
                uni.hideLoading();
            }
        },

        async renew() {
            try {
                this.isLoading = true;
                await new Promise(resolve => setTimeout(resolve, 500));

                const response = await dietPlanApi.renew({});
                if (response.code === 'A0001') {
                    this.dietPlan = new DietPlan(response.data);
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

/* 列表样式 */
.meal-list {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 40rpx;
    margin-bottom: 30rpx; /* 针对第一个list设置bottom，对第二个list间隙 */
    /* #ifdef APP-PLUS */
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    /* #endif */
}

.meal-list-progress-group {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 40rpx;
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

/* 日期选择 */
.picker-full {
    width: 100%; /* 让picker占满整行 */
}

.picker-text {
    font-size: 28rpx;
}

.picker-text.empty {
    color: #94a3b8;
}

/* 表单样式 */
.row-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx 0 24rpx 0; /* 按顺序：上 右 下 左 */
    background: transparent;
}

.row-detail {
    display: flex;
    align-items: center;
    gap: 24rpx;
    flex: 1;
}

.row-icon {
    width: 64rpx;
    height: 64rpx;
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f7fafc;
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

.food-header {
    display: flex;
    align-items: center;
    gap: 12rpx;
    margin-bottom: 8rpx;
}

.food-name {
    font-weight: 500;
    font-size: 28rpx;
}

.food-unit {
    font-size: 24rpx;
    color: #718096;
}

.form-input {
    font-size: 28rpx;
    width: 100%;
}

/* meal 选单 */
.optional-row {
    display: flex;
    gap: 20rpx;
    margin-bottom: 20rpx;
}

.meal-option {
    flex: 1;
    padding: 24rpx;
    background: #f7fafc;
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16rpx;
}

.meal-option.active {
    background: rgba(76, 81, 191, 0.1);
}

.meal-option.active .meal-label {
    color: #4c51bf;
}

.meal-emoji {
    font-size: 32rpx;
}

.meal-label {
    font-size: 28rpx;
    color: #1a1a1a;
}

/* 进度条组样式 */
.progress-group {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
}

.progress-item {
    background: #f7fafc;
    border-radius: 24rpx;
    padding: 24rpx;
}

.progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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

.label-group {
    display: flex;
    flex-direction: column;
    gap: 4rpx;
}

.form-sublabel {
    font-size: 24rpx;
    color: #718096;
}

.progress-input {
    width: 200rpx;
    text-align: left;
    font-size: 28rpx;
    background: white;
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

/* 颜色样式 */
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

.setup-btn {
    display: flex; /* 将按钮设置为 Flex 容器 */
    justify-content: center; /* 水平方向居中 */
    align-items: center; /* 垂直方向居中 */
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

.submit-btn {
    width: 100%;
    margin-top: 40rpx;
}

.setup-btn:active {
    opacity: 0.9;
}

/* 数量和单位输入组样式 */
.quantity-unit-group {
    display: flex;
    gap: 12rpx;
    align-items: center;
}

.quantity-input {
    flex: 0 0 120rpx;
    text-align: center;
}

.unit-selector {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8rpx;
    padding: 12rpx 24rpx;
    background: #ffffff;
    border-radius: 12rpx;
    color: #4a5568;
    font-size: 28rpx;
}

.unit-arrow {
    font-size: 20rpx;
    color: #718096;
}

/* 单位选择弹窗样式 */
.unit-popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: flex-end;
    z-index: 999;
}

.unit-popup-content {
    width: 100%;
    background: #ffffff;
    border-radius: 32rpx 32rpx 0 0;
    padding: 40rpx;
}

.unit-popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;
}

.unit-popup-title {
    font-size: 32rpx;
    font-weight: 600;
}

.unit-popup-close {
    padding: 20rpx;
    font-size: 32rpx;
    color: #718096;
}

.quick-units {
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
    margin-bottom: 30rpx;
}

.quick-unit-item {
    padding: 16rpx 32rpx;
    background: #f7fafc;
    border-radius: 16rpx;
    font-size: 28rpx;
    color: #4a5568;
}

.quick-unit-item.active {
    background: #4c51bf;
    color: #ffffff;
}

.custom-unit {
    display: flex;
    gap: 20rpx;
}

.custom-unit-input {
    flex: 1;
    padding: 16rpx 24rpx;
    background: #f7fafc;
    border-radius: 16rpx;
    font-size: 28rpx;
}

.custom-unit-btn {
    width: 160rpx;
    background: #4c51bf;
    color: #ffffff;
    border: none;
    border-radius: 16rpx;
    font-size: 28rpx;
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