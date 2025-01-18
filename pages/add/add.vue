<template>
    <view :style="{ paddingTop: statusBarHeight + 'px' }"></view>
    <view class="container">
        <!-- 顶部切换卡片 -->
        <view class="date-picker">
            <button
                class="tab-btn"
                :class="{ active: activeTab === 0 }"
                @click="showTab(0)"
            >
                <view class="category-icon">📸</view>
                <text>拍照识别</text>
            </button>
            <button
                class="tab-btn"
                :class="{ active: activeTab === 1 }"
                @click="showTab(1)"
            >
                <view class="category-icon">📝</view>
                <text>手动记录</text>
            </button>
        </view>

        <!-- 拍照识别标签页 -->
        <view class="meal-list" v-show="activeTab === 0">
            <!-- 拍照选项卡片 -->
            <view class="meal-category" v-if="!previewImage">
                <view class="category-header">
                    <view class="category-title">
                        <view class="category-icon">📸</view>
                        <text>选择方式</text>
                    </view>
                </view>

                <view class="photo-options">
                    <view class="food-row" @click="takePicture">
                        <view class="food-detail">
                            <view class="progress-icon calories">📸</view>
                            <view class="food-info">
                                <text class="food-name">拍照</text>
                            </view>
                        </view>
                    </view>

                    <view class="food-row" @click="selectFromGallery">
                        <view class="food-detail">
                            <view class="progress-icon carbs">🖼️</view>
                            <view class="food-info">
                                <text class="food-name">从相册选择</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 预览卡片 -->
            <view class="meal-category" v-if="previewImage">
                <view class="category-header">
                    <view class="category-title">
                        <view class="category-icon">🖼️</view>
                        <text>图片预览</text>
                    </view>
                </view>

                <image :src="previewImage" class="preview-image" mode="aspectFit"/>

                <view class="button-group">
                    <button class="reset-btn" @click="retakePhoto">重新选择</button>
                    <button class="setup-btn" @click="analyzeImage">开始分析</button>
                    <button class="reset-btn" @click="cancelImage">取消选取</button>
                </view>
            </view>

            <!-- 分析结果表单 -->
            <view class="meal-category" v-if="analysisCompleted">
                <view class="category-header">
                    <view class="category-title">
                        <view class="category-icon">📊</view>
                        <text>营养成分分析</text>
                    </view>
                </view>

                <view class="nutrition-form">
                    <!-- 食物名称 -->
                    <view class="food-row">
                        <view class="food-detail">
                            <view class="progress-icon calories">🍽️</view>
                            <view class="food-info">
                                <text class="food-name">食物名称</text>
                                <input
                                    type="text"
                                    class="form-input"
                                    v-model="formData1.name"
                                    placeholder="请输入食物名称"
                                />
                            </view>
                        </view>
                    </view>

                    <!-- 数量 -->
                    <view class="food-row">
                        <view class="food-detail">
                            <view class="progress-icon carbs">🔢</view>
                            <view class="food-info">
                                <view class="food-header">
                                    <text class="food-name">数量</text>
                                    <text class="food-unit">1~99</text>
                                </view>
                                <input
                                    type="number"
                                    class="form-input"
                                    v-model="formData1.quantity"
                                    :min="1"
                                    :max="99"
                                    maxlength="2"
                                    placeholder="1"
                                    @input="limitQuantityInput($event, 'formData1')"
                                />
                            </view>
                        </view>
                    </view>

                    <!-- 营养素进度条组 -->
                    <view class="progress-group">
                        <!-- 热量 -->
                        <view class="progress-item">
                            <view class="progress-header">
                                <view class="progress-label">
                                    <view class="progress-icon calories">🔥</view>
                                    <view class="label-group">
                                        <text>热量</text>
                                        <text class="form-sublabel">每日推荐 2000kcal</text>
                                    </view>
                                </view>
                                <input
                                    type="number"
                                    class="progress-input"
                                    v-model="formData1.calorie"
                                    placeholder="0"
                                />
                            </view>
                            <view class="progress-bar">
                                <view class="progress-fill calories" style="width: 71%"></view>
                            </view>
                        </view>

                        <!-- 碳水化合物 -->
                        <view class="progress-item">
                            <view class="progress-header">
                                <view class="progress-label">
                                    <view class="progress-icon carbs">🌾</view>
                                    <view class="label-group">
                                        <text>碳水化合物</text>
                                        <text class="form-sublabel">每日推荐 250g</text>
                                    </view>
                                </view>
                                <input
                                    type="number"
                                    class="progress-input"
                                    v-model="formData1.carbohydrate"
                                    placeholder="0"
                                />
                            </view>
                            <view class="progress-bar">
                                <view class="progress-fill carbs" style="width: 70%"></view>
                            </view>
                        </view>

                        <!-- 蛋白质 -->
                        <view class="progress-item">
                            <view class="progress-header">
                                <view class="progress-label">
                                    <view class="progress-icon protein">🥩</view>
                                    <view class="label-group">
                                        <text>蛋白质</text>
                                        <text class="form-sublabel">每日推荐 60g</text>
                                    </view>
                                </view>
                                <input
                                    type="number"
                                    class="progress-input"
                                    v-model="formData1.protein"
                                    placeholder="0"
                                />
                            </view>
                            <view class="progress-bar">
                                <view class="progress-fill protein" style="width: 80%"></view>
                            </view>
                        </view>

                        <!-- 脂肪 -->
                        <view class="progress-item">
                            <view class="progress-header">
                                <view class="progress-label">
                                    <view class="progress-icon fat">🥑</view>
                                    <view class="label-group">
                                        <text>脂肪</text>
                                        <text class="form-sublabel">每日推荐 70g</text>
                                    </view>
                                </view>
                                <input
                                    type="number"
                                    class="progress-input"
                                    v-model="formData1.fat"
                                    placeholder="0"
                                />
                            </view>
                            <view class="progress-bar">
                                <view class="progress-fill fat" style="width: 46%"></view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>

            <button class="setup-btn submit-btn" v-if="analysisCompleted" @click="saveData1">
                保存
            </button>
        </view>

        <!-- 手动记录标签页 -->
        <!-- 结构与拍照识别标签页类似，只是不包含拍照和预览部分 -->
        <!-- 手动记录标签页 -->
        <view class="meal-list" v-show="activeTab === 1">
            <view class="meal-category">
                <view class="category-header">
                    <view class="category-title">
                        <view class="category-icon">📝</view>
                        <text>手动记录</text>
                    </view>
                </view>

                <view class="nutrition-form">
                    <!-- 食物名称 -->
                    <view class="food-row">
                        <view class="food-detail">
                            <view class="progress-icon calories">🍽️</view>
                            <view class="food-info">
                                <text class="food-name">食物名称</text>
                                <input
                                    type="text"
                                    class="form-input"
                                    v-model="formData2.name"
                                    placeholder="请输入食物名称"
                                />
                            </view>
                        </view>
                    </view>

                    <!-- 数量 -->
                    <view class="food-row">
                        <view class="food-detail">
                            <view class="progress-icon carbs">🔢</view>
                            <view class="food-info">
                                <view class="food-header">
                                    <text class="food-name">数量</text>
                                    <text class="food-unit">1~99</text>
                                </view>
                                <input
                                    type="number"
                                    class="form-input"
                                    v-model="formData2.quantity"
                                    :min="1"
                                    :max="99"
                                    maxlength="2"
                                    placeholder="1"
                                    @input="limitQuantityInput($event, 'formData2')"
                                />
                            </view>
                        </view>
                    </view>

                    <!-- 营养素进度条组 -->
                    <view class="progress-group">
                        <!-- 热量 -->
                        <view class="progress-item">
                            <view class="progress-header">
                                <view class="progress-label">
                                    <view class="progress-icon calories">🔥</view>
                                    <view class="label-group">
                                        <text>热量</text>
                                        <text class="form-sublabel">每日推荐 2000kcal</text>
                                    </view>
                                </view>
                                <input
                                    type="number"
                                    class="progress-input"
                                    v-model="formData2.calorie"
                                    placeholder="0"
                                />
                            </view>
                            <view class="progress-bar">
                                <view class="progress-fill calories" style="width: 71%"></view>
                            </view>
                        </view>

                        <!-- 碳水化合物 -->
                        <view class="progress-item">
                            <view class="progress-header">
                                <view class="progress-label">
                                    <view class="progress-icon carbs">🌾</view>
                                    <view class="label-group">
                                        <text>碳水化合物</text>
                                        <text class="form-sublabel">每日推荐 250g</text>
                                    </view>
                                </view>
                                <input
                                    type="number"
                                    class="progress-input"
                                    v-model="formData2.carbohydrate"
                                    placeholder="0"
                                />
                            </view>
                            <view class="progress-bar">
                                <view class="progress-fill carbs" style="width: 70%"></view>
                            </view>
                        </view>

                        <!-- 蛋白质 -->
                        <view class="progress-item">
                            <view class="progress-header">
                                <view class="progress-label">
                                    <view class="progress-icon protein">🥩</view>
                                    <view class="label-group">
                                        <text>蛋白质</text>
                                        <text class="form-sublabel">每日推荐 60g</text>
                                    </view>
                                </view>
                                <input
                                    type="number"
                                    class="progress-input"
                                    v-model="formData2.protein"
                                    placeholder="0"
                                />
                            </view>
                            <view class="progress-bar">
                                <view class="progress-fill protein" style="width: 80%"></view>
                            </view>
                        </view>

                        <!-- 脂肪 -->
                        <view class="progress-item">
                            <view class="progress-header">
                                <view class="progress-label">
                                    <view class="progress-icon fat">🥑</view>
                                    <view class="label-group">
                                        <text>脂肪</text>
                                        <text class="form-sublabel">每日推荐 70g</text>
                                    </view>
                                </view>
                                <input
                                    type="number"
                                    class="progress-input"
                                    v-model="formData2.fat"
                                    placeholder="0"
                                />
                            </view>
                            <view class="progress-bar">
                                <view class="progress-fill fat" style="width: 46%"></view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>

            <button class="setup-btn submit-btn" @click="saveData2">保存</button>
        </view>

        <!-- Loading遮罩 -->
        <loading-overlay :show="isLoading"/>
    </view>
</template>

<script>
import addApi from "@/api/add-api";

export default {
    data() {
        return {
            statusBarHeight: 0,// 适配屏幕高度

            activeTab: 0,
            previewImage: '',
            isLoading: false,
            formData1: {
                name: '',
                meal: '',
                quantity: 1,
                calorie: '',
                carbohydrate: '',
                protein: '',
                fat: ''
            },
            formData2: {
                name: '',
                meal: '',
                quantity: 1,
                calorie: '',
                carbohydrate: '',
                protein: '',
                fat: ''
            },

            // 图片分析参数
            analysisCompleted: false,
            isAnalyzing: false,
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

        async takePicture() {
            try {
                const res = await uni.chooseImage({
                    count: 1,
                    sourceType: ['camera']
                })
                this.previewImage = res.tempFilePaths[0]
            } catch (e) {
                uni.showToast({
                    title: '拍照失敗',
                    icon: 'none'
                })
            }
        },

        async selectFromGallery() {
            try {
                const res = await uni.chooseImage({
                    count: 1,
                    sourceType: ['album']
                })
                this.previewImage = res.tempFilePaths[0]
            } catch (e) {
                uni.showToast({
                    title: '選取圖片失敗',
                    icon: 'none'
                })
            }
        },

        // 重新拍照
        async retakePhoto() {
            try {
                const res = await uni.showActionSheet({
                    itemList: ['拍新照片', '從相冊選擇']
                })

                if (res.tapIndex === 0) {
                    // 选择拍照
                    await this.takePicture()
                } else {
                    // 选择相册
                    await this.selectFromGallery()
                }
            } catch (e) {
                // 用户取消操作，不做处理
            }
        },

        // 取消/删除图片
        cancelImage() {
            uni.showModal({
                title: '取消選取',
                content: '确定要取消選取當前圖片吗？',
                success: (res) => {
                    if (res.confirm) {
                        this.previewImage = '';
                        this.analysisCompleted = false; // 重置分析状态
                        this.formData1 = {  // 清空表单数据
                            name: '',
                            meal: '',
                            quantity: '',
                            calorie: '',
                            carbohydrate: '',
                            protein: '',
                            fat: ''
                        };
                        uni.showToast({
                            title: '已取消選取',
                            icon: 'success',
                            duration: 1500
                        });
                    }
                }
            });
        },

        async analyzeImage() {
            if (this.isAnalyzing) return;

            this.isAnalyzing = true;

            try {
                uni.showLoading({
                    title: '正在分析...',
                    mask: true
                });

                // 处理文件路径
                let processedFilePath = this.previewImage;
                if (processedFilePath.startsWith('file://')) {
                    processedFilePath = this.previewImage.replace('file://', '');
                }

                // 1. 调用分析API
                const response = await addApi.getVersion(processedFilePath);

                // 2. 处理响应结果
                if (response.code === 'A0001' && response.data) {
                    const {data} = response;

                    // 3. 映射API返回数据到表单
                    this.formData1 = {
                        name: data.name,
                        meal: data.meal,
                        quantity: data.quantity,
                        calorie: data.calorie,
                        carbohydrate: data.carbohydrate,
                        protein: data.protein,
                        fat: data.fat
                    };

                    // 4. 显示成功提示
                    uni.showToast({
                        title: '分析成功',
                        icon: 'success'
                    });

                    // 5. 更新分析完成状态
                    this.analysisCompleted = true;

                } else {
                    uni.showToast({
                        title: response.message,
                        icon: 'none'
                    });
                }
            } catch (error) {
                uni.showToast({
                    title: error.message,
                    icon: 'error'
                });

                // 6. 分析失败时重置状态
                this.analysisCompleted = false;
                this.formData1 = {
                    name: '',
                    meal: '',
                    quantity: '',
                    calorie: '',
                    carbohydrate: '',
                    protein: '',
                    fat: ''
                };
            } finally {
                this.isAnalyzing = false;
                uni.hideLoading();
            }
        },

        async saveData1() {
            if (this.isLoading) return

            this.isLoading = true

            try {
                await new Promise(resolve => setTimeout(resolve, 1500))
                uni.showToast({
                    title: '保存成功',
                    icon: 'success'
                })
            } catch (e) {
                uni.showToast({
                    title: '保存失敗',
                    icon: 'none'
                })
            } finally {
                this.isLoading = false
            }
        },

        async saveData2() {
            if (this.isLoading) return

            this.isLoading = true

            try {
                await new Promise(resolve => setTimeout(resolve, 1500))
                uni.showToast({
                    title: '保存成功',
                    icon: 'success'
                })
            } catch (e) {
                uni.showToast({
                    title: '保存失敗',
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

/* 列表样式 */
.meal-list {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 40rpx;
    /* #ifdef APP-PLUS */
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    /* #endif */
}

.meal-category {
    margin-bottom: 40rpx;
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

/* 拍照选项 */
.photo-options {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
}

/* 预览图片 */
.preview-image {
    width: 100%;
    height: 400rpx;
    border-radius: 24rpx;
    background: #f7fafc;
    margin-bottom: 30rpx;
}

/* 表单样式 */
.food-row {
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

.food-info {
    flex: 1;
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
    width: 120rpx;
    text-align: right;
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

/* 按钮组样式 */
.button-group {
    display: flex;
    gap: 20rpx;
    margin-top: 30rpx;
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

.submit-btn {
    width: 100%;
    margin-top: 40rpx;
}

.setup-btn:active {
    opacity: 0.9;
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