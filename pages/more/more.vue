<template>
    <view :style="{ paddingTop: statusBarHeight + 'px' }"></view>
    <view class="container">
        <!-- 个人信息卡片 -->
        <view class="profile-card">
            <view class="avatar">👤</view>
            <view class="user-info">
                <text class="username">{{ $t('page.more.greeting') }}</text>
                <text class="user-level">{{ $t('page.more.member-level') }}</text>
            </view>
            <text class="arrow">></text>
        </view>

        <!-- 设置列表 -->
        <view class="menu-section">
            <view class="list-menu">
                <view v-for="(item, index) in settingItems"
                      :key="index"
                      class="list-item"
                      @tap="navigateTo(item.path)"
                >
                    <view class="list-left">
                        <view class="list-icon">{{ item.icon }}</view>
                        <text>{{ $t(item.labelKey) }}</text>
                    </view>
                    <text v-if="item.badge" class="badge">{{ $t('common.save') }}</text>
                    <text v-else class="arrow">></text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import bodyApi from "@/api/body-api";

export default {
    data() {
        return {
            statusBarHeight: 0,// 适配屏幕高度

            // 其他
            isLoading: false, // 添加 loading 状态变量
            isBodyExist: false, // 如果已设置body数据

            settingItems: [
                {
                    icon: '📝',
                    labelKey: 'page.more.menu.body-data',
                    path: '/pages/more/body/body'
                },
                {
                    icon: '🎯',
                    labelKey: 'page.more.menu.diet-plan',
                    path: '/pages/more/diet-plan/diet-plan'
                },
                // {
                //     icon: '📊',
                //     labelKey: 'page.more.menu.statistics',
                //     path: '/pages/more/statistic/statistic',
                //     badge: true
                // },
                // {
                //     icon: '⚙️',
                //     labelKey: 'page.more.menu.settings',
                //     path: '/pages/more/setting/setting'
                // },
                // {
                //     icon: '💡',
                //     labelKey: 'page.more.menu.help',
                //     path: '/pages/more/support/support'
                // }
            ]
        }
    },

    onLoad() {
        // 获取状态栏高度
        const systemInfo = uni.getSystemInfoSync()
        this.statusBarHeight = systemInfo.statusBarHeight
    },

    async onShow() {
        // 初始化加载数据
        try {
            this.isLoading = true;
            await this.checkBody();
        } catch (error) {
            uni.showToast({
                title: error.message,
                icon: 'error'
            });
        } finally {
            this.isLoading = false;
        }
    },

    methods: {
        // 添加导航方法
        navigateTo(path) {
            // 判断是否是diet-plan页面
            if (path.includes('diet-plan')) {
                // 如果是diet-plan页面且没有body数据
                if (!this.isBodyExist) {
                    uni.showToast({
                        title: this.$t('page.more.messages.setup-body-first'),
                        icon: 'error'
                    });
                    return; // 阻止路由跳转
                }
            }

            uni.navigateTo({
                url: path,
                fail(error) {
                    uni.showToast({
                        title: this.$t('page.more.messages.navigation-failed'),
                        icon: 'error'
                    })
                }
            })
        },

        // 页面初始化，调用api
        async checkBody() {
            try {
                const response = await bodyApi.checkExist({});
                if (response.code === 'A0001') {
                    this.isBodyExist = response.data;
                } else {
                    uni.showToast({
                        title: response.message,
                        icon: 'error'
                    });
                }
            } catch (error) {
                uni.showToast({
                    title: error.message,
                    icon: 'error'
                });
            }
        },
    }
}
</script>

<style>
page {
    background: #f5f7fa;
    color: #1a1a1a;
    min-height: 100vh;
}

.container {
    padding: 30rpx 40rpx;
}

.profile-card {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 40rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    margin-bottom: 30rpx;
    display: flex;
    align-items: center;
    gap: 20rpx;
    position: relative;
}

.profile-card .arrow {
    position: absolute;
    right: 40rpx;
}

.avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 24rpx;
    background: #f7fafc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
}

.user-info {
    display: flex;
    flex-direction: column;
}

.username {
    font-size: 48rpx;
    font-weight: bold;
    margin-bottom: 4rpx;
}

.user-level {
    color: #718096;
    font-size: 28rpx;
}

.menu-section {
    background: #ffffff;
    border-radius: 32rpx;
    padding: 30rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    margin-bottom: 30rpx;
}

.list-menu {
    background: #ffffff;
    border-radius: 24rpx;
    overflow: hidden;
}

.list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40rpx;
    border-bottom: 2rpx solid #edf2f7;
}

.list-item:last-child {
    border-bottom: none;
}

.list-left {
    display: flex;
    align-items: center;
    gap: 32rpx;
}

.list-icon {
    width: 80rpx;
    height: 80rpx;
    background: #f7fafc;
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40rpx;
}

.badge {
    padding: 8rpx 24rpx;
    background: rgba(76, 81, 191, 0.1);
    color: #4c51bf;
    border-radius: 40rpx;
    font-size: 24rpx;
}

.arrow {
    color: #a0aec0;
}
</style>