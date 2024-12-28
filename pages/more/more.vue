<template>
  <view class="more-container">
    <text>更多页面</text>
  </view>
</template>

<script setup>
import { onShow } from '@dcloudio/uni-app'

onShow(() => {
  const isLoggedIn = uni.getStorageSync('isLoggedIn')
  if (!isLoggedIn) {
    uni.reLaunch({
      url: '/pages/login/login'
    })
  }
})
</script>

<style>
.more-container {
  padding: 20rpx;
}
</style>