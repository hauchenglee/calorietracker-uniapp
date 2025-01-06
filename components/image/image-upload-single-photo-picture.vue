<template>
    <view class="upload-container">
        <view class="upload-buttons">
            <button class="upload-button" @tap="takePhoto">
                <text class="button-icon">📸</text>
                拍照上传
            </button>
            <button class="upload-button" @tap="chooseFromAlbum">
                <text class="button-icon">🖼️</text>
                相册选择
            </button>
        </view>

        <view class="upload-list">
            <view v-for="(item, index) in uploadFiles" :key="index" class="upload-item">
                <view class="item-preview">
                    <image :src="item.url" mode="aspectFill"></image>
                </view>
                <view class="item-info">
                    <view class="item-name">{{ item.name }}</view>
                    <view class="item-actions">
                        <text class="action-link" @tap="takePhoto">重新拍照</text>
                        <text class="action-link" @tap="chooseFromAlbum">重新选择</text>
                    </view>
                </view>
                <button class="remove-button" @tap="removeItem(index)">×</button>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const uploadFiles = ref([])

// 暴露方法和属性
defineExpose({
    uploadFiles,
    clearImage: () => {
        uploadFiles.value = []
    }
})

const takePhoto = () => {
    uni.chooseImage({
        count: 1,
        sourceType: ['camera'],
        success: handleImageSuccess
    })
}

const chooseFromAlbum = () => {
    uni.chooseImage({
        count: 1,
        sourceType: ['album'],
        success: handleImageSuccess
    })
}

const handleImageSuccess = (res) => {
    const path = res.tempFilePaths[0]
    uploadFiles.value = [{
        url: path,
        name: path.split('/').pop() || '已选择图片'
    }]
}

const removeItem = (index) => {
    uploadFiles.value.splice(index, 1)
}
</script>

<style>
/* 保持原有样式不变，只添加新的样式 */
.item-actions {
    margin-top: 4px;
    display: flex;
    gap: 12px;
}

.action-link {
    font-size: 12px;
    color: #228be6;
}

/* 其他原有样式保持不变 */
.upload-container {
    max-width: 600px;
    margin: 0 auto;
    background: white;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.upload-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 20px;
}

.upload-button {
    padding: 16px;
    border: none;
    border-radius: 12px;
    background: #f8f9fa;
    color: #333;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.upload-button:active {
    background: #e9ecef;
}

.button-icon {
    font-size: 24px;
    margin-bottom: 4px;
}

.upload-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.upload-item {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.item-preview {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    overflow: hidden;
    background: #e9ecef;
}

.item-preview image {
    width: 100%;
    height: 100%;
}

.item-info {
    flex: 1;
}

.item-name {
    font-size: 14px;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.remove-button {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: none;
    background: #ffe3e3;
    color: #e03131;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    padding: 0;
    margin: 0;
}

.remove-button:active {
    background: #ffc9c9;
}
</style>