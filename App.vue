<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			const isLoggedIn = uni.getStorageSync('isLoggedIn')
			if (!isLoggedIn) {
				uni.reLaunch({
					url: '/pages/login/login'
				})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
    @import './common/theme.css';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	// 设置整个项目的背景色
	page {
		background-color: var(--color-background);
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>