<template>
	<view class="floating-button" @click="handleClick" :style="buttonStyle">
		<view class="floating-button__ripple" v-if="showRipple" :style="rippleStyle"></view>
		<view class="floating-button__content">
			<text class="floating-button__icon">+</text>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		computed
	} from 'vue'

	const props = defineProps({
		bottom: {
			type: [Number, String],
			default: 120
		},
		right: {
			type: [Number, String],
			default: 30
		}
	})

	const emit = defineEmits(['click'])

	const showRipple = ref(false)
	const ripplePosition = ref({
		x: 0,
		y: 0
	})

	const buttonStyle = computed(() => {
		return {
			bottom: `${props.bottom}rpx`,
			right: `${props.right}rpx`
		}
	})

	const rippleStyle = computed(() => {
		return {
			left: ripplePosition.value.x + 'px',
			top: ripplePosition.value.y + 'px'
		}
	})

	const handleClick = (event) => {
		// 直接使用 uni.createSelectorQuery()
		const query = uni.createSelectorQuery()
		query.select('.floating-button').boundingClientRect(data => {
			if (data && event.touches && event.touches[0]) {
				const x = event.touches[0].clientX - data.left
				const y = event.touches[0].clientY - data.top

				ripplePosition.value = {
					x,
					y
				}
				showRipple.value = true

				setTimeout(() => {
					showRipple.value = false
				}, 300)
			}

			emit('click')
		}).exec()
	}
</script>

<style scoped>
	.floating-button {
		position: fixed;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background-color: #465CFF;
		box-shadow: 0 4rpx 16rpx rgba(70, 92, 255, 0.4);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
		overflow: hidden;
	}

	.floating-button__content {
		position: relative;
		z-index: 2;
	}

	.floating-button__icon {
		color: #fff;
		font-size: 48rpx;
		font-weight: bold;
	}

	.floating-button__ripple {
		position: absolute;
		width: 200rpx;
		height: 200rpx;
		background-color: rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		transform: translate(-50%, -50%) scale(0);
		animation: ripple 0.3s linear;
	}

	@keyframes ripple {
		to {
			transform: translate(-50%, -50%) scale(1);
			opacity: 0;
		}
	}
</style>