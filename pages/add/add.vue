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
                    <view class="photo-row" @click="takePicture">
                        <view class="photo-detail">
                            <view class="progress-icon calories">📸</view>
                            <text class="photo-name">拍照</text>
                        </view>
                    </view>

                    <view class="photo-row" @click="selectFromGallery">
                        <view class="photo-detail">
                            <view class="progress-icon carbs">🖼️</view>
                            <text class="photo-name">从相册选择</text>
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
                    <view class="optional-row">
                        <view
                            class="meal-option"
                            :class="{ active: formData1.meal === 'breakfast' }"
                            @tap="selectMeal1('breakfast')"
                        >
                            <text class="meal-emoji">🌅</text>
                            <text class="meal-label">早餐</text>
                        </view>
                        <view
                            class="meal-option"
                            :class="{ active: formData1.meal === 'lunch' }"
                            @tap="selectMeal1('lunch')"
                        >
                            <text class="meal-emoji">☀️</text>
                            <text class="meal-label">午餐</text>
                        </view>
                        <view
                            class="meal-option"
                            :class="{ active: formData1.meal === 'dinner' }"
                            @tap="selectMeal1('dinner')"
                        >
                            <text class="meal-emoji">🌙</text>
                            <text class="meal-label">晚餐</text>
                        </view>
                    </view>

                    <!-- 日期 -->
                    <view class="row-title">
                        <view class="row-detail">
                            <view class="row-icon">📅</view>
                            <text class="food-name">日期</text>
                        </view>
                    </view>
                    <view class="food-row">
                        <picker
                            mode="date"
                            :value="formData1.date"
                            @change="onDateChange1"
                            :start="startDate"
                            :end="endDate"
                            class="picker-full"
                        >
                            <text :class="['picker-text', !formData1.date && 'empty']">
                                {{ formData1.date || '请选择日期' }}
                            </text>
                        </picker>
                    </view>

                    <!-- 食物名称 -->
                    <view class="row-title">
                        <view class="row-detail">
                            <view class="row-icon">🍽️</view>
                            <text class="food-name">食物名称</text>
                        </view>
                    </view>
                    <view class="food-row">
                        <input
                            type="text"
                            class="form-input"
                            v-model="formData1.name"
                        />
                    </view>

                    <!-- 数量和单位 -->
                    <view class="row-title">
                        <view class="row-detail">
                            <view class="row-icon">🔢</view>
                            <view class="food-header">
                                <text class="food-name">数量</text>
                                <text class="food-unit">1~99</text>
                            </view>
                        </view>
                    </view>
                    <view class="food-row">
                        <view class="quantity-unit-group">
                            <input
                                type="number"
                                class="form-input quantity-input"
                                v-model="formData1.quantity"
                                :min="1"
                                :max="99"
                                maxlength="2"
                                @input="limitQuantityInput($event, 'formData1')"
                            />
                            <view class="unit-selector" @tap="showUnitSelector">
                                <text>{{ formData1.unit || '选择单位' }}</text>
                                <text class="unit-arrow">▼</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <view class="meal-list-progress-group" v-show="activeTab === 0" v-if="analysisCompleted">
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

            <button class="setup-btn submit-btn" v-if="analysisCompleted" @click="saveData1">保存</button>
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

                    <!-- 餐食 -->
                    <view class="optional-row">
                        <view
                            class="meal-option"
                            :class="{ active: formData2.meal === 'breakfast' }"
                            @tap="selectMeal2('breakfast')"
                        >
                            <text class="meal-emoji">🌅</text>
                            <text class="meal-label">早餐</text>
                        </view>
                        <view
                            class="meal-option"
                            :class="{ active: formData2.meal === 'lunch' }"
                            @tap="selectMeal2('lunch')"
                        >
                            <text class="meal-emoji">☀️</text>
                            <text class="meal-label">午餐</text>
                        </view>
                        <view
                            class="meal-option"
                            :class="{ active: formData2.meal === 'dinner' }"
                            @tap="selectMeal2('dinner')"
                        >
                            <text class="meal-emoji">🌙</text>
                            <text class="meal-label">晚餐</text>
                        </view>
                    </view>

                    <!-- 日期 -->
                    <view class="row-title">
                        <view class="row-detail">
                            <view class="row-icon">📅</view>
                            <text class="food-name">日期</text>
                        </view>
                    </view>
                    <view class="food-row">
                        <picker
                            mode="date"
                            :value="formData2.date"
                            @change="onDateChange2"
                            :start="startDate"
                            :end="endDate"
                            class="picker-full"
                        >
                            <text :class="['picker-text', !formData2.date && 'empty']">
                                {{ formData2.date || '请选择日期' }}
                            </text>
                        </picker>
                    </view>

                    <!-- 食物名称 -->
                    <view class="row-title">
                        <view class="row-detail">
                            <view class="row-icon">🍽️</view>
                            <text class="food-name">食物名称</text>
                        </view>
                    </view>
                    <view class="food-row">
                        <input
                            type="text"
                            class="form-input"
                            v-model="formData2.name"
                        />
                    </view>

                    <!-- 数量和单位 -->
                    <view class="row-title">
                        <view class="row-detail">
                            <view class="row-icon">🔢</view>
                            <view class="food-header">
                                <text class="food-name">数量</text>
                                <text class="food-unit">1~99</text>
                            </view>
                        </view>
                    </view>
                    <view class="food-row">
                        <view class="quantity-unit-group">
                            <input
                                type="number"
                                class="form-input quantity-input"
                                v-model="formData2.quantity"
                                :min="1"
                                :max="99"
                                maxlength="2"
                                @input="limitQuantityInput($event, 'formData2')"
                            />
                            <view class="unit-selector" @tap="showUnitSelector">
                                <text>{{ formData2.unit || '选择单位' }}</text>
                                <text class="unit-arrow">▼</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <view class="meal-list-progress-group" v-show="activeTab === 1">
            <!-- 营养素进度条组 -->
            <view class="progress-group">
                <!-- 热量 -->
                <view class="progress-item">
                    <view class="progress-header">
                        <view class="progress-label">
                            <view class="progress-icon calories">🔥</view>
                            <view class="label-group">
                                <text>热量</text>
                                <text class="form-sublabel">每日推荐 {{ dietPlan.calorie }} kcal</text>
                            </view>
                        </view>
                        <input
                            type="number"
                            class="progress-input"
                            v-model="formData2.calorie"
                            placeholder="0"
                            @input="updateProgress('calorie', $event)"
                        />
                    </view>
                    <view class="progress-bar">
                        <view
                            class="progress-fill calories"
                            :style="{ width: progressPercentages.calorie + '%' }"
                        ></view>
                    </view>
                </view>

                <!-- 碳水化合物 -->
                <view class="progress-item">
                    <view class="progress-header">
                        <view class="progress-label">
                            <view class="progress-icon carbs">🌾</view>
                            <view class="label-group">
                                <text>碳水化合物</text>
                                <text class="form-sublabel">每日推荐 {{ dietPlan.carbohydrate }} g</text>
                            </view>
                        </view>
                        <input
                            type="number"
                            class="progress-input"
                            v-model="formData2.carbohydrate"
                            placeholder="0"
                            @input="updateProgress('carbohydrate', $event)"
                        />
                    </view>
                    <view class="progress-bar">
                        <view
                            class="progress-fill carbs"
                            :style="{ width: progressPercentages.carbohydrate + '%' }"
                        ></view>
                    </view>
                </view>

                <!-- 蛋白质 -->
                <view class="progress-item">
                    <view class="progress-header">
                        <view class="progress-label">
                            <view class="progress-icon protein">🥩</view>
                            <view class="label-group">
                                <text>蛋白质</text>
                                <text class="form-sublabel">每日推荐 {{ dietPlan.protein }} g</text>
                            </view>
                        </view>
                        <input
                            type="number"
                            class="progress-input"
                            v-model="formData2.protein"
                            placeholder="0"
                            @input="updateProgress('protein', $event)"
                        />
                    </view>
                    <view class="progress-bar">
                        <view
                            class="progress-fill protein"
                            :style="{ width: progressPercentages.protein + '%' }"
                        ></view>
                    </view>
                </view>

                <!-- 脂肪 -->
                <view class="progress-item">
                    <view class="progress-header">
                        <view class="progress-label">
                            <view class="progress-icon fat">🥑</view>
                            <view class="label-group">
                                <text>脂肪</text>
                                <text class="form-sublabel">每日推荐 {{ dietPlan.fat }} g</text>
                            </view>
                        </view>
                        <input
                            type="number"
                            class="progress-input"
                            v-model="formData2.fat"
                            placeholder="0"
                            @input="updateProgress('fat', $event)"
                        />
                    </view>
                    <view class="progress-bar">
                        <view
                            class="progress-fill fat"
                            :style="{ width: progressPercentages.fat + '%' }"
                        ></view>
                    </view>
                </view>
            </view>

            <button class="setup-btn submit-btn" @click="saveData2">保存</button>
        </view>

        <!-- 单位选择弹窗 -->
        <view class="unit-popup" v-if="showUnitPopup" @tap="closeUnitSelector">
            <view class="unit-popup-content" @tap.stop>
                <view class="unit-popup-header">
                    <text class="unit-popup-title">选择单位</text>
                    <text class="unit-popup-close" @tap="closeUnitSelector">✕</text>
                </view>
                <!-- 常用单位快速选择 -->
                <view class="quick-units">
                    <view
                        class="quick-unit-item"
                        :class="{ active: formData2.unit === unit }"
                        v-for="unit in quickUnits"
                        :key="unit"
                        @tap="selectUnit(unit)"
                    >
                        {{ unit }}
                    </view>
                </view>
                <!-- 自定义单位输入 -->
                <view class="custom-unit">
                    <input
                        type="text"
                        class="custom-unit-input"
                        v-model="customUnit"
                        placeholder="输入自定义单位"
                        maxlength="10"
                        @confirm="addCustomUnit"
                    />
                    <button class="custom-unit-btn" @tap="addCustomUnit">确定</button>
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
            isLoading: false,
            formData1: {
                date: '',
                meal: '',
                name: '',
                quantity: 1,
                unit: 'pics',
                calorie: 0,
                carbohydrate: 0,
                protein: 0,
                fat: 0
            },
            formData2: {
                date: '',
                meal: '',
                name: '',
                quantity: 1,
                unit: 'pics',
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

            // 单位量词
            showUnitPopup: false,
            quickUnits: ['份', '个', 'g', 'ml', '碗', '勺', '块', '片'],
            customUnit: '',

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
                icon: 'none'
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
            console.log(meal)
            this.formData1.meal = meal
        },

        selectMeal2(meal) {
            console.log(meal)
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

        // 单位量词 start
        showUnitSelector() {
            this.showUnitPopup = true;
        },

        closeUnitSelector() {
            this.showUnitPopup = false;
            this.customUnit = '';
        },

        selectUnit(unit) {
            this.formData2.unit = unit;
            this.closeUnitSelector();
        },

        addCustomUnit() {
            if (this.customUnit.trim()) {
                this.formData2.unit = this.customUnit.trim();
                this.closeUnitSelector();
            }
        },
        // 单位量词 end

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

        validateFormData1() {
            const requiredFields = {
                date: '日期',
                meal: '餐食类型',
                name: '食物名称',
                quantity: '数量',
                unit: '单位',
                calorie: '热量',
                carbohydrate: '碳水化合物',
                protein: '蛋白质',
                fat: '脂肪'
            };

            for (const [field, label] of Object.entries(requiredFields)) {
                if (!this.formData2[field]) {
                    uni.showToast({
                        title: `请填写${label}`,
                        icon: 'none'
                    });
                    return false;
                }
            }

            // 检查数值字段是否为有效数字
            const numericFields = ['quantity', 'calorie', 'carbohydrate', 'protein', 'fat'];
            for (const field of numericFields) {
                const value = Number(this.formData2[field]);
                if (isNaN(value) || value <= 0) {
                    uni.showToast({
                        title: `${requiredFields[field]}必须大于0`,
                        icon: 'none'
                    });
                    return false;
                }
            }

            return true;
        },

        validateFormData2() {
            const requiredFields = {
                date: '日期',
                meal: '餐食类型',
                name: '食物名称',
                quantity: '数量',
                unit: '单位',
                calorie: '热量',
                carbohydrate: '碳水化合物',
                protein: '蛋白质',
                fat: '脂肪'
            };

            for (const [field, label] of Object.entries(requiredFields)) {
                if (!this.formData2[field]) {
                    uni.showToast({
                        title: `请填写${label}`,
                        icon: 'none'
                    });
                    return false;
                }
            }

            // 检查数值字段是否为有效数字
            const numericFields = ['quantity', 'calorie', 'carbohydrate', 'protein', 'fat'];
            for (const field of numericFields) {
                const value = Number(this.formData2[field]);
                if (isNaN(value) || value <= 0) {
                    uni.showToast({
                        title: `${requiredFields[field]}必须大于0`,
                        icon: 'none'
                    });
                    return false;
                }
            }

            return true;
        },

        async saveData1() {
            if (this.isLoading) return

            // 添加表单验证
            if (!this.validateFormData1()) {
                return;
            }

            try {
                this.isLoading = true
                await new Promise(resolve => setTimeout(resolve, 500));
                const response = await addApi.save(this.formData1);
                uni.showToast({
                    title: response.message,
                    icon: 'success'
                })
            } catch (error) {
                this.isLoading = false
                uni.showToast({
                    title: error.message,
                    icon: 'none'
                })
            } finally {
                this.isLoading = false
                uni.hideLoading();
            }
        },

        async saveData2() {
            if (this.isLoading) return

            // 添加表单验证
            if (!this.validateFormData2()) {
                return;
            }

            try {
                this.isLoading = true
                await new Promise(resolve => setTimeout(resolve, 500));
                const response = await addApi.save(this.formData2);
                uni.showToast({
                    title: response.message,
                    icon: 'success'
                })
            } catch (error) {
                this.isLoading = false
                uni.showToast({
                    title: error.message,
                    icon: 'none'
                })
            } finally {
                this.isLoading = false
                uni.hideLoading();
            }
        },

        async renew() {
            try {
                this.isLoading = true
                await new Promise(resolve => setTimeout(resolve, 500));

                const response = await dietPlanApi.renew({});
                if (response.code === 'A0001') {
                    this.dietPlan = new DietPlan(response.data);
                } else {
                    uni.showToast({
                        title: response.message,
                        icon: 'none'
                    });
                }
            } catch (error) {
                this.isLoading = false
                uni.showToast({
                    title: error.message,
                    icon: 'none'
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

.photo-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx;
    border-radius: 24rpx;
    background: #f7fafc;
    margin-bottom: 20rpx;
}

.photo-detail {
    display: flex;
    align-items: center;
    gap: 24rpx;
    flex: 1;
}

.photo-name {
    font-weight: 500;
    font-size: 28rpx;
    flex: 1;
}

/* 预览图片 */
.preview-image {
    width: 100%;
    height: 400rpx;
    border-radius: 24rpx;
    background: #f7fafc;
    margin-bottom: 30rpx;
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
    display: flex; /* 将按钮设置为 Flex 容器 */
    justify-content: center; /* 水平方向居中 */
    align-items: center; /* 垂直方向居中 */
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