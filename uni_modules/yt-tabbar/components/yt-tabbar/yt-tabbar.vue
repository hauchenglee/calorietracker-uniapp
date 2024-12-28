<template>
	<view class="yt-tabbar" :style="{bottom:iosBottom ? '0rpx' : '-34rpx'}">
		<!-- 循环遍历tabArr数组，每一项都创建一个view，每一个view都有一个key值，点击时通过该key值可以找到对应的项 -->
		<view class="yt-list">
			<!-- 当点击时，调用clickTabbar函数，传入当前项和当前索引 -->
			<view v-for="(item, index) in tabArr" :key="item.id" :class="item.bigType ? 'yt-active-min' : 'yt-item'"
				@click="clickTabbar(item, index)">
				<template v-if="item.icon && item.activeImg">
					<!-- 当当前项的bigType为true时，显示activeImg的图片 -->
					<image v-if="index === showIndex" :src="item.activeImg"></image>
					<!-- 当当前项的bigType为false时，显示icon的图片 -->
					<image v-else :src="item.icon"></image>
				</template>
				<template v-else>
					<!-- 当icon和activeImg都不存在时，显示一个yt-icon的图片 -->
					<view class="yt-icon"></view>
				</template>
				<!-- 当icon和activeImg都不存在时，显示当前项的name -->
				<view class="yt-name" :style="{ color: index === showIndex ? activeColor : color }">{{ item.name }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "yt-tabbar",
		props: {
			// 选项卡数组
			tabArr: {
				type: Array,
				default: () =>[] 
			},
			// 当前选项卡索引
			index: {
				type: Number,
				default: 2
			},
			// 分割线颜色
			color: {
				type: String,
				default: '#272822'
			},
			// 激活状态下的分割线颜色
			activeColor: {
				type: String,
				default: '#c73a47'
			},
			// 是否设置导航标题
			setNavTitle: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// iosbottom为空，用于记录ios下面的分割线
				iosBottom: '',
				// 用于记录显示的索引
				showIndex: 0
			}
		},
		watch: {
			index: {
				// 观察对象index
				deep: true,
				// 递归观察对象index
				immediate: true,
				// 当index被发生变化时，执行handler函数
				handler(inx) {
					// 将inx的值赋给showIndex
					this.showIndex = inx
				}
			}
		},
		mounted() {
			// 设置NAV标题
			if (this.setNavTitle) {
				uni.setNavigationBarTitle({
					title: this.tabArr[this.showIndex]?.name
				})
			}
			// 获取系统信息，主要获取底部安全区域的高度
			uni.getSystemInfo({
				success: res => {
					// 获取IOS底部安全区域的高度
					console.log(res.safeAreaInsets.bottom)
					this.iosBottom = res.safeAreaInsets.bottom
				}
			})
		},
		methods: {
			clickTabbar(item, index) {
				// 设置显示的索引
				if (this.showIndex !== index) {
					this.showIndex = index
					// 触发事件，更新父组件的数据
					this.$emit('tabChange', item)
				}
				// 设置导航标题
				if (this.setNavTitle) {
					uni.setNavigationBarTitle({
						title: this.tabArr[this.showIndex]?.name
					})
				}
			}
		}
	}
</script>

<style lang='scss' scoped>
	.yt-tabbar {
		/* 设置yt-tabbar的宽度为100%，高度为154rpx */
		width: 100%;
		height: 154rpx;
		/* 设置yt-tabbar的位置为fixed，底部 */
		position: fixed;
		bottom: 0;
		left: 0px;
		right: 0px;
		z-index: 99999;
		/* 设置display为flex */
		display: flex;
		/* 设置align-items为center */
		align-items: center;
		/* 设置justify-content为center */
		justify-content: center;
		/* 设置背景大小为100% 100% */
		background-size: 100% 100%;
		/* 设置border-radius为12rpx 12rpx 0 0 */
		border-radius: 12rpx 12rpx 0 0;
		/* 设置背景重复方式为no-repeat */
		background-repeat: no-repeat;
	}

	.yt-list {
		// width: 100%;
		width: calc(100% - 40rpx);
		// padding: 0rpx;
		padding: 0 20rpx;
		display: flex;
		justify-content: space-around;
		// margin-top: 0rpx;
		margin-top: 0rpx;
		background-color: #ffffff;
	}

	.yt-item {
		width: 20%;
		display: flex;
		align-items: center;
		flex-direction: column;
		font-size: 24rpx;
		color: #3982A5;
	}

	.yt-active-min {
		width: 20%;
		display: flex;
		align-items: center;
		flex-direction: column;
		font-size: 24rpx;
		color: #3982A5;
		margin-top: -20rpx;
		margin-left: 2rpx;
		position: relative;
	}

	.yt-item image {
		width: 48rpx;
		height: 48rpx;
		margin-bottom: 8rpx;
	}

	.yt-active-min image {
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
		margin: 0 auto 10rpx auto;
	}

	.yt-icon {
		width: 48rpx;
		height: 48rpx;
		/* border: 2rpx solid red; */
		margin-bottom: 8rpx;
		border-radius: 50%;
	}

	.yt-name {
		text-align: center;
		line-height: 24rpx;
		margin-top: 4rpx;
	}
</style>