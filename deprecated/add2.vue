<template>
    <view :style="{ paddingTop: statusBarHeight + 'px' }"></view>
    <view class="container">
        <!-- 标签选择器 -->
        <view class="tab-selector">
            <button
                class="tab-btn"
                :class="{ active: activeTab === 0 }"
                @click="showTab(0)"
            >
                <view class="tab-icon">📸</view>
                <text>拍照识别</text>
            </button>
            <button
                class="tab-btn"
                :class="{ active: activeTab === 1 }"
                @click="showTab(1)"
            >
                <view class="tab-icon">📝</view>
                <text>手动记录</text>
            </button>
        </view>

        <!-- 拍照识别标签页 -->
        <view class="tab-content" v-show="activeTab === 0">
            <view v-if="!previewImage" class="photo-options">
                <button class="photo-btn" @click="takePicture">
                    <view class="photo-icon">📸</view>
                    <text>拍照</text>
                </button>
                <button class="photo-btn" @click="selectFromGallery">
                    <view class="photo-icon">🖼️</view>
                    <text>从相册选择</text>
                </button>
            </view>

            <view class="preview-card" v-if="previewImage">
                <image
                    :src="previewImage"
                    class="preview-image"
                    mode="aspectFit"
                />
                <view class="action-buttons">
                    <button class="action-btn" @click="retakePhoto">重新选择</button>
                    <button class="action-btn primary" @click="analyzeImage">开始分析</button>
                    <button class="action-btn" @click="cancelImage">取消选取</button>
                </view>
            </view>

            <view class="nutrition-card" v-if="analysisCompleted">
                <view class="card-header">
                    <text class="card-title">营养成分分析</text>
                </view>

                <view class="nutrition-form">
                    <view class="form-group">
                        <text class="form-label">名称</text>
                        <input
                            type="text"
                            class="form-input"
                            v-model="formData1.name"
                            placeholder="食物名称"
                        />
                    </view>

                    <view class="form-group">
                        <view class="label-group">
                            <text class="form-label">数量</text>
                            <text class="form-sublabel">1~99</text>
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

                    <view class="form-group">
                        <view class="label-group">
                            <text class="form-label">热量</text>
                            <text class="form-sublabel">每日推荐 2000kcal</text>
                        </view>
                        <input
                            type="number"
                            class="form-input"
                            v-model="formData1.calorie"
                            placeholder="0"
                        />
                        <view class="progress-bar">
                            <view class="progress-fill calories" :style="{ width: '71%' }"></view>
                        </view>
                    </view>

                    <view class="form-group">
                        <view class="label-group">
                            <text class="form-label">碳水化合物</text>
                            <text class="form-sublabel">每日推荐 250g</text>
                        </view>
                        <input
                            type="number"
                            class="form-input"
                            v-model="formData1.carbohydrate"
                            placeholder="0"
                        />
                        <view class="progress-bar">
                            <view class="progress-fill carbs" :style="{ width: '70%' }"></view>
                        </view>
                    </view>

                    <view class="form-group">
                        <view class="label-group">
                            <text class="form-label">蛋白质</text>
                            <text class="form-sublabel">每日推荐 60g</text>
                        </view>
                        <input
                            type="number"
                            class="form-input"
                            v-model="formData1.protein"
                            placeholder="0"
                        />
                        <view class="progress-bar">
                            <view class="progress-fill protein" :style="{ width: '80%' }"></view>
                        </view>
                    </view>

                    <view class="form-group">
                        <view class="label-group">
                            <text class="form-label">脂肪</text>
                            <text class="form-sublabel">每日推荐 70g</text>
                        </view>
                        <input
                            type="number"
                            class="form-input"
                            v-model="formData1.fat"
                            placeholder="0"
                        />
                        <view class="progress-bar">
                            <view class="progress-fill fat" :style="{ width: '46%' }"></view>
                        </view>
                    </view>
                </view>
            </view>

            <button
                class="submit-button"
                v-if="analysisCompleted"
                @click="saveData1"
            >保存
            </button>
        </view>

        <!-- 手动记录标签页 -->
        <view class="tab-content" v-show="activeTab === 1">
            <view class="nutrition-card">
                <view class="card-header">
                    <text class="card-title">手动记录营养成分</text>
                </view>

                <view class="nutrition-form">
                    <!-- 与上面相同的表单结构 -->
                    <view class="form-group">
                        <text class="form-label">名称</text>
                        <input
                            type="text"
                            class="form-input"
                            v-model="formData2.name"
                            placeholder="食物名称"
                        />
                    </view>

                    <view class="form-group">
                        <view class="label-group">
                            <text class="form-label">数量</text>
                            <text class="form-sublabel">1~99</text>
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

                    <view class="form-group">
                        <view class="label-group">
                            <text class="form-label">热量</text>
                            <text class="form-sublabel">每日推荐 2000kcal</text>
                        </view>
                        <input
                            type="number"
                            class="form-input"
                            v-model="formData2.calorie"
                            placeholder="0"
                        />
                        <view class="progress-bar">
                            <view class="progress-fill calories" :style="{ width: '71%' }"></view>
                        </view>
                    </view>

                    <view class="form-group">
                        <view class="label-group">
                            <text class="form-label">碳水化合物</text>
                            <text class="form-sublabel">每日推荐 250g</text>
                        </view>
                        <input
                            type="number"
                            class="form-input"
                            v-model="formData2.carbohydrate"
                            placeholder="0"
                        />
                        <view class="progress-bar">
                            <view class="progress-fill carbs" :style="{ width: '70%' }"></view>
                        </view>
                    </view>

                    <view class="form-group">
                        <view class="label-group">
                            <text class="form-label">蛋白质</text>
                            <text class="form-sublabel">每日推荐 60g</text>
                        </view>
                        <input
                            type="number"
                            class="form-input"
                            v-model="formData2.protein"
                            placeholder="0"
                        />
                        <view class="progress-bar">
                            <view class="progress-fill protein" :style="{ width: '80%' }"></view>
                        </view>
                    </view>

                    <view class="form-group">
                        <view class="label-group">
                            <text class="form-label">脂肪</text>
                            <text class="form-sublabel">每日推荐 70g</text>
                        </view>
                        <input
                            type="number"
                            class="form-input"
                            v-model="formData2.fat"
                            placeholder="0"
                        />
                        <view class="progress-bar">
                            <view class="progress-fill fat" :style="{ width: '46%' }"></view>
                        </view>
                    </view>
                </view>
            </view>

            <button class="submit-button" @click="saveData2">保存</button>
        </view>

        <!-- Loading遮罩 -->
        <view class="loading-overlay" v-if="isLoading">
            <view class="loading-spinner">
                <view class="spinner-item" v-for="i in 3" :key="i"></view>
            </view>
        </view>
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
                    icon: 'none'
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
page {
    background: #f5f7fa;
    color: #1a1a1a;
}

.container {
    padding: 30rpx;
}

/* 标签选择器 */
.tab-selector {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 12rpx;
    display: flex;
    gap: 12rpx;
    margin-bottom: 40rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.tab-btn {
    flex: 1;
    background: transparent;
    border: none;
    padding: 24rpx;
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    color: #718096;
}

.tab-btn.active {
    background: #4c51bf;
    color: #ffffff;
}

.tab-icon {
    font-size: 32rpx;
}

/* 卡片样式 */
.photo-options,
.preview-card,
.nutrition-card {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 40rpx;
    margin-bottom: 40rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}

/* 拍照选项 */
.photo-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24rpx;
}

.photo-btn {
    background: #f7fafc;
    border: none;
    padding: 40rpx;
    border-radius: 24rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16rpx;
}

.photo-icon {
    font-size: 48rpx;
    width: 96rpx;
    height: 96rpx;
    background: #f7fafc;
    border-radius: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 预览卡片 */
.preview-image {
    width: 100%;
    height: 400rpx;
    border-radius: 24rpx;
    margin-bottom: 24rpx;
}

.action-buttons {
    display: flex;
    gap: 16rpx;
}

.action-btn {
    flex: 1;
    background: #f7fafc;
    border: none;
    padding: 16rpx;
    border-radius: 16rpx;
    font-size: 28rpx;
}

.action-btn.primary {
    background: #4c51bf;
    color: #ffffff;
}

/* 营养表单 */
.card-header {
    margin-bottom: 32rpx;
}

.card-title {
    font-size: 32rpx;
    font-weight: 600;
}

.nutrition-form {
    display: flex;
    flex-direction: column;
    gap: 32rpx;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 12rpx;
}

.label-group {
    display: flex;
    align-items: center;
    gap: 12rpx;
}

.form-label {
    font-size: 28rpx;
    font-weight: 500;
}

.form-sublabel {
    font-size: 24rpx;
    color: #718096;
}

.form-input {
    background: #f7fafc;
    border: none;
    padding: 16rpx;
    border-radius: 12rpx;
    font-size: 28rpx;
}

/* 进度条 */
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

/* 提交按钮 */
.submit-button {
    background: #4c51bf;
    color: #ffffff;
    border: none;
    padding: 24rpx;
    border-radius: 16rpx;
    font-size: 32rpx;
    margin-top: 40rpx;
}

/* Loading遮罩 */
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.loading-spinner {
    display: flex;
    gap: 12rpx;
}

.spinner-item {
    width: 20rpx;
    height: 20rpx;
    background: #4c51bf;
    border-radius: 50%;
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
</style>