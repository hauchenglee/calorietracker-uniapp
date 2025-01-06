<template>
    <view class="upload-card">
        <view class="preview-area" :class="{'has-image': hasImage}" @tap="chooseImage">
            <view class="placeholder" v-if="!hasImage">点击选择图片</view>
            <image v-if="hasImage" :src="previewUrl" mode="aspectFill" class="preview-image"/>
        </view>

        <button class="upload-button" @tap="chooseImage" v-if="!isUploading">选择图片</button>

        <view class="file-info" v-if="fileInfo">
            文件名：{{ fileInfo.name }}<br>
            大小：{{ fileInfo.size }} MB<br>
            类型：{{ fileInfo.type }}
        </view>

        <view class="progress-container" v-if="isUploading">
            <view class="progress-bar">
                <view class="progress" :style="{ width: progress + '%' }"></view>
            </view>
            <view class="status">
                <text>{{ statusText }}</text>
                <text>{{ progress }}%</text>
            </view>
        </view>

        <button class="reset-button" @tap="reset" v-if="hasImage">重新上传</button>
    </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const previewUrl = ref('')
const hasImage = ref(false)
const isUploading = ref(false)
const progress = ref(0)
const statusText = ref('准备上传...')
const fileInfo = ref(null)

const chooseImage = () => {
    uni.chooseImage({
        count: 1,
        success: (res) => {
            const tempFile = res.tempFiles[0]
            previewUrl.value = res.tempFilePaths[0]
            hasImage.value = true

            // 设置文件信息
            fileInfo.value = {
                name: tempFile.path.split('/').pop(),
                size: (tempFile.size / (1024 * 1024)).toFixed(2),
                type: tempFile.type || 'image'
            }

            startUpload()
        }
    })
}

const startUpload = () => {
    isUploading.value = true
    progress.value = 0
    statusText.value = '上传中...'

    // 模拟上传进度
    const interval = setInterval(() => {
        progress.value += Math.random() * 15
        if (progress.value >= 100) {
            progress.value = 100
            clearInterval(interval)
            statusText.value = '上传完成'
        }
    }, 200)
}

const reset = () => {
    previewUrl.value = ''
    hasImage.value = false
    isUploading.value = false
    progress.value = 0
    statusText.value = '准备上传...'
    fileInfo.value = null
}
</script>

<style>
.upload-card {
    background: white;
    border-radius: 16px;
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.preview-area {
    aspect-ratio: 4/3;
    background: #f8f9fa;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #adb5bd;
}

.preview-image {
    width: 100%;
    height: 100%;
}

.upload-button {
    width: 100%;
    padding: 14px;
    background: #339af0;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 16px;
    margin-bottom: 16px;
}

.upload-button:active {
    background: #228be6;
}

.progress-container {
    margin-top: 16px;
}

.progress-bar {
    height: 6px;
    background: #e9ecef;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 8px;
}

.progress {
    height: 100%;
    background: #339af0;
    width: 0%;
    transition: width 0.2s;
}

.status {
    display: flex;
    justify-content: space-between;
    color: #868e96;
    font-size: 14px;
}

.file-info {
    margin-top: 12px;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 8px;
    font-size: 14px;
    color: #495057;
}

.reset-button {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 14px;
    width: 100%;
    border-radius: 10px;
    font-size: 16px;
    margin-top: 16px;
}

.reset-button:active {
    background: #fa5252;
}
</style>