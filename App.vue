<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')

            // 获取存储的语言设置
            const savedLang = uni.getStorageSync('language')

            // 获取系统语言
            const systemLang = uni.getLocale()

            // 决定使用哪种语言
            const lang = savedLang || this.getPreferredLanguage(systemLang)

            // 设置语言
            this.$i18n.locale = lang
            uni.setLocale(lang)
            
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
		},
        getPreferredLanguage(systemLang) {
            // 根据系统语言判断使用简体还是繁体
            if (systemLang === 'zh-CN') {
                return 'zh-Hans'
            } else if (systemLang === 'zh-TW' || systemLang === 'zh-HK') {
                return 'zh-Hant'
            }
            return 'zh-Hant' // 默认繁体
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