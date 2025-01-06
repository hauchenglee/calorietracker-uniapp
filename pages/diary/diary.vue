<template>
    <view class="layout-banner">
        <view class="banner__content">
            <view class="pagination">
                <view class="pagination-btn prev gradient" @click="changeDate(-1)">
                    <fui-icon name="arrowleft" color="#465CFF" :size="40"></fui-icon>
                </view>
                <fui-button
                    class="date-button"
                    background="#fff"
                    color="#465CFF"
                    btn-size="medium"
                    radius="96rpx"
                    :margin="['24rpx']"
                    @click="onShowDatePicker('date')"
                >{{ currentDate }}
                </fui-button>
                <view class="pagination-btn next gradient" @click="changeDate(1)">
                    <fui-icon name="arrowright" color="#465CFF" :size="40"></fui-icon>
                </view>
            </view>
        </view>
        <mx-date-picker
            :show="showPicker"
            :type="type"
            :value="currentDate"
            @confirm="onDatePickerConfirm"
            @cancel="onDatePickerCancel"
        />
    </view>
    <view class="layout-card">
        <view class="card-content"></view>
    </view>
    <view class="layout-list">
        <fui-list>
            <template v-for="(mealGroup, mealIndex) in responseBody.data" :key="mealIndex">
                <view class="list__section-title">{{ mealGroup.meal_cn }}</view>
                <fui-list-cell
                    v-for="(food, foodIndex) in mealGroup.food"
                    :key="foodIndex"
                    arrow
                    :padding="[0,'32rpx']"
                    :bottomBorder="true"
                    @click="href(mealGroup.meal, food.id)">
                    <view class="list__item">
                        <text>{{ `${food.name} ${food.quantity}${food.unit} ${food.calorie}卡路里` }}</text>
                    </view>
                </fui-list-cell>
            </template>
        </fui-list>
        <fui-loadmore :isFixed="true" v-if="isLoading"></fui-loadmore>
        <fui-divider dividerColor="#3A5160" color="#3A5160" text="没有更多了"></fui-divider>
    </view>

    <floating-button :bottom="floatButtonHeight" :right="floatButtonRight" @click="handleFloatingButtonClick"/>
</template>

<script>
import {mapActions} from 'vuex'
import dietApi from '@/api/diet-api'
import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue"
import {dateFormatter} from '@/utils/dateFormatter.js'

export default {
    components: {
        MxDatePicker
    },

    data() {
        return {
            isLoading: false, // 添加 loading 状态变量
            responseBody: {}, // 初始化为空数组
            height: 0,
            floatButtonHeight: 120,
            floatButtonRight: 40,
            currentDate: '', // 添加当前日期字段
            showPicker: false, // mx-datepicker
            type: 'date', // mx-datepicker
            value: '', // mx-datepicker
        }
    },

    onLoad() {
        this.isLoading = false;
        this.currentDate = this.getCurrentDate(); // 设置初始日期
        this.initData();

        setTimeout(() => {
            const systemInfo = uni.getSystemInfoSync();
            this.height = systemInfo.windowHeight - uni.upx2px(300);
            this.floatButtonHeight = uni.upx2px(120);
            this.floatButtonRight = uni.upx2px(120);

            // #ifdef MP
            this.getStatus().then((res) => {
            })
            // #endif
        }, 50)
    },

    methods: {
        ...mapActions(['getStatus']),

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

        async initData() {
            try {
                // 如果 currentDate 为空，才设置为当前日期
                if (!this.currentDate) {
                    this.currentDate = this.getCurrentDate();
                }

                const response = await dietApi.getByDate({date: this.currentDate});
                console.log('API Response:', response);
                if (response.code === 'A0001') {
                    this.responseBody = this.transformApiData(response);
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

        transformApiData(apiData) {
            if (!apiData || !apiData.data) return [];

            const formatData = (item) => ({
                name: item.name,
                id: item.id,
                quantity: item.quantity,
                unit: item.unit,
                calorie: item.calorie,
                meal: item.meal
            });

            return {
                date: apiData.data.date,
                data: [
                    {
                        meal: 'breakfast',
                        meal_cn: '早餐',
                        food: apiData.data.breakfast.map(formatData)
                    },
                    {
                        meal: 'lunch',
                        meal_cn: '午餐',
                        food: apiData.data.lunch.map(formatData)
                    },
                    {
                        meal: 'dinner',
                        meal_cn: '晚餐',
                        food: apiData.data.dinner.map(formatData)
                    }
                ]
            }
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

        href(type, page) {
            if (page) {
                // this.fui.href(`/pages/component/${type}/${page}/${page}`)
            } else {
                // this.fui.href('/pages/common/coding/coding')
            }
        },

        handleFloatingButtonClick() {
            uni.navigateTo({
                url: '/pages/food/food'
            });
        }
    },
}
</script>

<style>
/* 内容容器 */
.layout-banner {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.banner__content {
    width: var(--width-full);
    height: var(--height-lg);
    padding: var(--spacing-header);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
}

.pagination {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20rpx;
}

.pagination-btn {
    width: 80rpx; /* 改这行: 从62rpx改为80rpx */
    height: 80rpx; /* 改这行: 从60rpx改为80rpx */
    border-radius: 50%; /* 改这行: 从12rpx改为50% */
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff; /* 改为白色背景 */
    border: 1px solid #465CFF; /* 添加边框 */
    transition: all 0.3s ease;
}

.date-button {
    margin: 0 20rpx;
    border: 1px solid #465CFF;
}

/* 交互状态 */
.pagination-btn:active {
    opacity: 0.8;
    transform: scale(0.95);
}

/* 渐变背景，从中间向外扩散 */
/*.gradient {
    background: radial-gradient(circle at center, var(--color-ice-blue-4), var(--color-ice-blue-4));
}*/
/*  分页器 end */

/* Card */
.layout-card {
    height: 200px;
    /* 为了让卡片垂直居中 */
    display: flex;
    align-items: center;
    /* 如果需要水平居中也可以加上 */
    justify-content: center;
}

.card-content {
    width: 90%;
    height: 160px;
    padding: var(--spacing-all-md);
    box-sizing: border-box;
    background-color: #fff;
    /* 深色阴影效果 */
    box-shadow: 
        0 4px 16px rgba(0, 0, 0, 0.15), 
        0 8px 24px rgba(0, 0, 0, 0.1);
    /* 可选：添加圆角 */
    border-radius: 8px;
}

/* List Component */
.layout-list {
    width: var(--width-full);
    height: var(--height-full);;
    /*margin-top: var(--space-24);*/ /* 可以根据需要调整与card的间距 */
}

.list__item {
    width: var(--width-full);
    height: 112rpx;
    display: flex;
    align-items: center;
}

.list__item text {
    padding-left: var(--size-24);
    padding-right: var(--size-12);
    flex-shrink: 0;
}

.list__section-title {
    font-size: var(--size-32);
    line-height: var(--size-32);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--size-32);
    padding-left: var(--size-20);
    position: relative;
    box-sizing: border-box;
    margin-left: var(--size-32);
}

.list__section-title {
    padding-top: var(--size-4);
}

.list__section-title:not(:first-child) {
    padding-top: var(--size-40);
}

.list__section-title::after {
    content: '';
    position: absolute;
    width: var(--size-8);
    height: var(--height-full);
    background: var(--color-primary);
    border-radius: var(--radius-sm);
    left: 0;
    top: var(--size-20);
}
</style>