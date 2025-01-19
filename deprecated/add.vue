<template>
    <view class="div-child">
        <view class="div-image-upload">
            <image-upload ref="imageUploadRef"></image-upload>
        </view>
        <view class="div-button-analyse">
            <fui-button radius="96rpx" background="#618fca" :margin="['8rpx']" @click="analyzeImage">圖片分析</fui-button>
        </view>
        <view class="div-divider">
            <fui-divider dividerColor="#3A5160" color="#3A5160" width="100%" text="快速輸入"></fui-divider>
        </view>
        <view class="div-input">
            <fui-input id="name" label="品項" borderTop placeholder="請輸入文本" v-model="formData.name"></fui-input>
            <fui-input id="calorie" label="卡路里" :bottomLeft="0" placeholder="請輸入數字" v-model="formData.calorie"></fui-input>
            <fui-input id="carbohydrate" label="碳水化合物" :bottomLeft="0" placeholder="請輸入數字" v-model="formData.carbohydrate"></fui-input>
            <fui-input id="protein" label="蛋白質" :bottomLeft="0" placeholder="請輸入數字" v-model="formData.protein"></fui-input>
            <fui-input id="fat" label="脂肪" :bottomLeft="0" placeholder="請輸入數字" v-model="formData.fat"></fui-input>
        </view>
        <view class="div-button-form">
            <fui-button radius="96rpx" background="#618fca" :margin="['8rpx']" @click="saveForm">儲存</fui-button>
            <fui-button radius="96rpx" background="#618fca" :margin="['8rpx']" @click="clearForm">全部清除</fui-button>
        </view>
        <!-- 加载遮罩 -->
        <view class="mask" v-if="isLoading"></view>
        <!-- loadmore 组件 -->
    </view>
    <fui-loading v-if="isLoading" type="col" text="分析中..."></fui-loading>
</template>

<script setup>
import {reactive, ref} from 'vue';
import ImageUpload from "@/components/image/image-upload-single-photo-picture.vue";
import addApi from '@/api/add-api.js';

const imageUploadRef = ref(null);
const isLoading = ref(false);
const formData = reactive({
    name: '',
    calorie: '',
    carbohydrate: '',
    protein: '',
    fat: ''
});

const analyzeImage = async () => {
    // 直接访问 uploadFiles，因为 defineExpose 已经暴露了这个属性
    if (!imageUploadRef.value?.uploadFiles?.length) {  // 移除最后一个 .value
        uni.showToast({
            title: '請先上傳圖片',
            icon: 'none'
        });
        return;
    }

    const filePath = imageUploadRef.value.uploadFiles[0].url;  // 同样移除 .value

    try {
        isLoading.value = true;
        const response = await addApi.getVersion(filePath);

        if (response.code === 'A0001' && response.data) {
            const {data} = response;
            formData.name = data.name;
            formData.calorie = String(data.calorie);
            formData.carbohydrate = String(data.carbohydrate);
            formData.protein = String(data.protein);
            formData.fat = String(data.fat);

            uni.showToast({
                title: '分析成功',
                icon: 'success'
            });
        } else {
            throw new Error(response.message || '分析失敗');
        }
    } catch (error) {
        uni.showToast({
            title: error.message,
            icon: 'none'
        });
    } finally {
        isLoading.value = false;
    }
};

const clearForm = () => {
    formData.name = '';
    formData.calorie = '';
    formData.carbohydrate = '';
    formData.protein = '';
    formData.fat = '';

    // 清除已上传的图片
    if (imageUploadRef.value?.uploadFiles) {  // 移除 .value
        imageUploadRef.value.uploadFiles = [];
    }
};
</script>

<style scoped>
.div-child {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%; /* 添加这行 */
    position: relative; /* 添加相对定位 */
}

.div-image-upload {
    width: 100%;
}

.div-button-analyse {
    width: 100%;
}

.div-divider {
    width: 100%;
}

.div-input {
    width: 100%;
}

.div-button-form {
    width: 100%;
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
}

:deep(.fui-loadmore__fixed) {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
}
</style>