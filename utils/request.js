// utils/request.js
const request = {
    baseURL: 'http://srv415056.hstgr.cloud:8080/api',

    // 基础请求方法
    async request(options) {
        const token = uni.getStorageSync('token')

        return new Promise((resolve, reject) => {
            uni.request({
                url: this.baseURL + options.url,
                method: options.method, // 明确指定 method
                data: options.data, // 明确指定 data
                header: {
                    'Authorization': token ? `Bearer ${token}` : '',
                    'Content-Type': 'application/json',
                    ...options.header
                },
                success: (res) => {
                    if (res.statusCode === 200) {
                        resolve(res.data) // 直接返回数据部分
                    } else if (res.statusCode === 401) {
                        uni.navigateTo({
                            url: '/pages/login/login'
                        })
                        reject(res)
                    } else {
                        reject(res)
                    }
                },
                fail: (error) => {
                    reject(new Error('网络请求失败'))
                }
            })
        })
    },

    // GET 请求
    async get(url, params = {}) {
        return this.request({
            url,
            method: 'GET',
            data: params
        })
    },

    // POST 请求
    async post(url, data = {}) {
        return this.request({
            url,
            method: 'POST',
            data
        })
    },

    // 文件上传
    async upload(url, {
        filePath,
        name = 'file',
        formData = {}
    }) {
        const token = uni.getStorageSync('token')

        return new Promise((resolve, reject) => {
            uni.uploadFile({
                url: this.baseURL + url,
                filePath,
                name: 'image', // 固定为'image'以匹配Java端的@RequestParam("image")
                formData,
                header: {
                    'Authorization': token ? `Bearer ${token}` : '',
                },
                success: (res) => {
                    if (res.statusCode === 200) {
                        try {
                            // uploadFile 返回的是字符串，需要解析
                            const data = JSON.parse(res.data)
                            resolve(data)
                        } catch (e) {
                            resolve(res.data)
                        }
                    } else if (res.statusCode === 401) {
                        uni.navigateTo({
                            url: '/pages/login/login'
                        })
                        reject(res)
                    } else {
                        reject(res)
                    }
                },
                fail: reject
            })
        })
    }
}

export default request