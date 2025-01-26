import en from './locale/en.json'
import zhHans from './locale/zh-Hans.json'
import zhHant from './locale/zh-Hant.json'
const messages = {
    en,
    'zh-Hans': zhHans,
    'zh-Hant': zhHant
}

let i18nConfig = {
    locale: uni.getLocale(),// 获取已设置的语言
    messages
}

// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    i18n,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'// v9.x
const i18n = createI18n(i18nConfig)
export function createApp() {
    const app = createSSRApp(App)
    app.use(i18n)
    return {
        app
    }
}
// #endif