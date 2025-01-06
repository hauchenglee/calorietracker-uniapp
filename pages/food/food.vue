<template>
    <view class="page-container">
        <view class="layout-banner">
            <view class="banner__content">
            </view>
        </view>
        <view class="layout-segmented">
            <fui-segmented-control color="#3A5160" :values="values2" @click="itemClick"></fui-segmented-control>
        </view>
        <view class="layout-segmented-detail">
            <component :is="currentComponent" v-if="currentComponent"></component>
        </view>
    </view>
</template>

<script>
// 引入需要动态加载的子页面
import AddPage from "@/pages/food/add/add.vue";
import AllPage from "@/pages/food/all/all.vue";
import FavoritePage from "@/pages/food/favorite/favorite.vue";

export default {
    components: {
        AddPage,
        AllPage,
        FavoritePage
    },
    data() {
        return {
            values2: [
                {name: '新增', component: 'AddPage'},
                {name: '全部', component: 'AllPage'},
                {name: '收藏', component: 'FavoritePage'}
            ],
            currentComponent: 'AddPage' // 设置初始组件为 AddPage
        };
    },
    // 或者使用 created 生命周期
    mounted() {
        // 确保初始化时加载 AddPage
        if (!this.currentComponent) {
            this.currentComponent = 'AddPage';
        }
    },
    methods: {
        itemClick(e) {
            // 获取点击的组件名称
            const selectedComponent = this.values2[e.index].component;
            console.log("Switching to component:", selectedComponent);

            // 设置当前显示的组件
            this.currentComponent = selectedComponent;
        }
    }
};
</script>

<style>
.page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.layout-banner {
    height: 100px; /* 固定高度 */
    background-color: #fff;
    position: relative;
    z-index: 1;
}

.layout-segmented {
    height: 50px; /* 固定高度 */
    background-color: #fff;
    position: relative;
    z-index: 1;
}

.layout-segmented-detail {
    flex: 1;
    position: relative;
    overflow-y: auto;
    display: flex;  /* 关键：必须设置 打开开关 */
    flex-direction: column;  /* 关键：必须设置 调节旋钮 */
}

</style>