<template>

</template>

<script setup>
import {onShow} from '@dcloudio/uni-app'
import {ref} from 'vue'

// 登录检查
onShow(() => {
    const isLoggedIn = uni.getStorageSync('isLoggedIn')
    if (!isLoggedIn) {
        uni.reLaunch({
            url: '/pages/login/login'
        })
    }
})

// Segmented 数据
const values = ref(['segmented1', 'segmented2'])

// Segmented 点击方法
const itemClick = (e) => {
    console.log(e)
}
</script>

<style>
.food-base {
    padding: 20rpx;
}
</style>