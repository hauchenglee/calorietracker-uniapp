<template>
    <view class="app-container">
        <view :style="{ paddingTop: statusBarHeight + 'px' }"></view>

        <view class="tabs-container">
            <view class="tabs">
                <text
                    class="tab"
                    :class="{ active: activeTab === 0 }"
                    @tap="showTab(0)"
                >拍照识别
                </text>
                <text
                    class="tab"
                    :class="{ active: activeTab === 1 }"
                    @tap="showTab(1)"
                >手动记录
                </text>
            </view>
        </view>

        <view class="tab-content" v-show="activeTab === 0">
            <view class="camera-options">
                <view class="camera-option" @tap="takePicture">
                    <view class="camera-icon">📸</view>
                    <text class="option-label">拍照</text>
                </view>
                <view class="camera-option" @tap="selectFromGallery">
                    <view class="camera-icon">🖼️</view>
                    <text class="option-label">从相册选择</text>
                </view>
            </view>

            <view class="card" v-if="previewImage">
                <view class="preview-area">
                    <image
                        :src="previewImage"
                        class="preview-image"
                        mode="aspectFit"
                    />
                </view>
                <view class="image-toolbar">
                    <view class="tool-item" @tap="retakePhoto">
                        <text class="tool-icon">📸</text>
                        <text class="tool-text">重新選擇</text>
                    </view>
                    <view class="tool-item" @tap="analyzeImage">
                        <text class="tool-icon">🔍</text>
                        <text class="tool-text">开始分析</text>
                    </view>
                    <view class="tool-item" @tap="cancelImage">
                        <text class="tool-icon">🗑️</text>
                        <text class="tool-text">取消選取</text>
                    </view>
                </view>
            </view>

            <!-- 营养成分分析部分 -->
            <view class="card analysis-result" v-if="analysisCompleted">
                <view class="card-title">营养成分分析</view>
                <view class="nutrition-container">
                    <view class="nutrition-details">
                        <view class="nutrition-label">名称</view>
                    </view>
                    <view class="nutrition-item">
                        <input
                            type="text"
                            class="nutrition-value input-style"
                            v-model="formData1.name"
                        />
                    </view>

                    <view class="nutrition-details">
                        <view class="label-group">
                            <view class="nutrition-label">热量</view>
                            <view class="nutrition-sublabel">每日推荐 2000kcal</view>
                        </view>
                    </view>
                    <view class="nutrition-item">
                        <input
                            type="number"
                            class="nutrition-value input-style"
                            v-model="formData1.calorie"
                        />
                        <view class="wave calories"></view>
                    </view>

                    <view class="nutrition-details">
                        <view class="label-group">
                            <view class="nutrition-label">碳水化合物</view>
                            <view class="nutrition-sublabel">每日推荐 250g</view>
                        </view>
                    </view>
                    <view class="nutrition-item">
                        <input
                            type="number"
                            class="nutrition-value input-style"
                            v-model="formData1.carbohydrate"
                        />
                        <view class="wave carbs"></view>
                    </view>

                    <view class="nutrition-details">
                        <view class="label-group">
                            <view class="nutrition-label">蛋白质</view>
                            <view class="nutrition-sublabel">每日推荐 60g</view>
                        </view>
                    </view>
                    <view class="nutrition-item">
                        <input
                            type="number"
                            class="nutrition-value input-style"
                            v-model="formData1.protein"
                        />
                        <view class="wave protein"></view>
                    </view>

                    <view class="nutrition-details">
                        <view class="label-group">
                            <view class="nutrition-label">脂肪</view>
                            <view class="nutrition-sublabel">每日推荐 70g</view>
                        </view>
                    </view>
                    <view class="nutrition-item">
                        <input
                            type="number"
                            class="nutrition-value input-style"
                            v-model="formData1.fat"
                        />
                        <view class="wave fat"></view>
                    </view>
                </view>
            </view>

            <button class="submit-btn1" @click="saveData1" v-if="analysisCompleted">保存</button>
        </view>

        <!-- 手动记录部分 -->
        <view class="tab-content" v-show="activeTab === 1">
            <view class="card">
                <view class="card-title">手动记录营养成分</view>
                <view class="nutrition-container">
                    <view class="nutrition-details">
                        <view class="nutrition-label">名称</view>
                    </view>
                    <view class="nutrition-item">
                        <input
                            type="text"
                            class="nutrition-value input-style"
                            v-model="formData2.name"
                        />
                    </view>

                    <view class="nutrition-details">
                        <view class="label-group">
                            <view class="nutrition-label">热量</view>
                            <view class="nutrition-sublabel">每日推荐 2000kcal</view>
                        </view>
                    </view>
                    <view class="nutrition-item">
                        <input
                            type="number"
                            class="nutrition-value input-style"
                            v-model="formData2.calorie"
                        />
                        <view class="wave calories"></view>
                    </view>

                    <view class="nutrition-details">
                        <view class="label-group">
                            <view class="nutrition-label">碳水化合物</view>
                            <view class="nutrition-sublabel">每日推荐 250g</view>
                        </view>
                    </view>
                    <view class="nutrition-item">
                        <input
                            type="number"
                            class="nutrition-value input-style"
                            v-model="formData2.carbohydrate"
                        />
                        <view class="wave carbs"></view>
                    </view>

                    <view class="nutrition-details">
                        <view class="label-group">
                            <view class="nutrition-label">蛋白质</view>
                            <view class="nutrition-sublabel">每日推荐 60g</view>
                        </view>
                    </view>
                    <view class="nutrition-item">
                        <input
                            type="number"
                            class="nutrition-value input-style"
                            v-model="formData2.protein"
                        />
                        <view class="wave protein"></view>
                    </view>

                    <view class="nutrition-details">
                        <view class="label-group">
                            <view class="nutrition-label">脂肪</view>
                            <view class="nutrition-sublabel">每日推荐 70g</view>
                        </view>
                    </view>
                    <view class="nutrition-item">
                        <input
                            type="number"
                            class="nutrition-value input-style"
                            v-model="formData2.fat"
                        />
                        <view class="wave fat"></view>
                    </view>
                </view>
            </view>

            <button class="submit-btn2" @click="saveData2">保存</button>
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
                calorie: '',
                carbohydrate: '',
                protein: '',
                fat: ''
            },
            formData2: {
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
    background: #F8F9FB;
    color: #172B4D;
}

.app-container {
    padding: 30rpx;
    padding-bottom: 160rpx;
}

.tabs-container {
    background: #FFFFFF;
    padding: 12rpx;
    border-radius: 40rpx;
    box-shadow: 0 4rpx 8rpx rgba(9, 30, 66, 0.08);
    margin-bottom: 48rpx;
}

.tabs {
    display: flex;
    gap: 12rpx;
}

.tab {
    flex: 1;
    padding: 24rpx;
    text-align: center;
    border-radius: 32rpx;
    color: #5E6C84;
    font-weight: 500;
    font-size: 28rpx;
}

.tab.active {
    background: #4c51bf;
    color: #FFFFFF;
    box-shadow: 0 4rpx 8rpx rgba(9, 30, 66, 0.08);
}

.card {
    background: #FFFFFF;
    border-radius: 40rpx;
    padding: 48rpx;
    margin-bottom: 40rpx;
    box-shadow: 0 8rpx 16rpx rgba(9, 30, 66, 0.12);
}

.card-title {
    font-size: 32rpx;
    font-weight: 600;
    margin-bottom: 32rpx;
}

.camera-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32rpx;
    margin-bottom: 48rpx;
}

.camera-option {
    background: #FFFFFF;
    border-radius: 40rpx;
    padding: 48rpx;
    text-align: center;
    border: 4rpx dashed #E6E8EC;
}

.camera-icon {
    width: 96rpx;
    height: 96rpx;
    margin: 0 auto 24rpx;
    background: #E5F0FF;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48rpx;
}

.option-label {
    font-size: 28rpx;
    color: #5E6C84;
}

.preview-image {
    width: 100%;
    height: 400rpx;
    border-radius: 40rpx;
}

.image-toolbar {
    display: flex;
    justify-content: space-around;
    padding: 20rpx 0;
    border-top: 2rpx solid #eee;
    margin-top: 20rpx;
}

.tool-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16rpx 24rpx;
    transition: all 0.3s;
}

.tool-item:active {
    transform: scale(0.95);
}

/* 添加分析按钮特殊样式 */
.tool-item:nth-child(2) {
    background: #4c51bf;
    border-radius: 16rpx;
}

.tool-item:nth-child(2) .tool-text {
    color: #ffffff;
}

.tool-item:nth-child(2) .tool-icon {
    background: rgba(255, 255, 255, 0.2);
    padding: 8rpx;
    border-radius: 50%;
}

.tool-icon {
    font-size: 40rpx;
    margin-bottom: 10rpx;
}

.tool-text {
    font-size: 24rpx;
    color: #666;
}

.nutrition-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.nutrition-item {
    background: #ffffff;
    border-radius: 16px;
    height: 40px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;
}

.nutrition-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.label-group {
    margin-top: 16px;
    display: flex;
    align-items: center;
    gap: 8rpx; /* 控制标签之间的间距 */
}

.nutrition-label {
    font-size: 28rpx;
    font-weight: 500;
}

.nutrition-sublabel {
    font-size: 24rpx;
    color: #636e72;
}

.wave {
    position: absolute;
    left: 0;
    bottom: 0;
    width: var(--width);
    height: 100%;
    background: linear-gradient(to right, var(--color-light), var(--color));
    opacity: 0.15;
    border-radius: 0 16px 16px 0;
    transition: width 0.8s ease;
    z-index: 1;
}

/* 营养元素特定样式 */
.calories {
    --color: #ff7675;
    --color-light: #fab1a0;
    --width: 85%;
}

.carbs {
    --color: #74b9ff;
    --color-light: #a0d8ef;
    --width: 65%;
}

.protein {
    --color: #55efc4;
    --color-light: #81ecec;
    --width: 45%;
}

.fat {
    --color: #ffeaa7;
    --color-light: #fdcb6e;
    --width: 35%;
}

/* 输入框样式 */
.input-style {
    background: transparent;
    border: none;
    text-align: left;
    width: 100%;
    height: 100%;
    font-size: 20px;
    z-index: 2;
}

.input-style::placeholder {
    color: #a0a0a0;
    font-weight: normal;
}

.submit-btn1 {
    color: var(--white);
    background: #4c51bf;
    border-radius: 32rpx;
}

.submit-btn2 {
    color: var(--white);
    background: #4c51bf;
    border-radius: 32rpx;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>