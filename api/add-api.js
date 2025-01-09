import request from '@/utils/request'

export default {
    getVersion(filePath) {
        return request.upload('/chatgpt/get-version', {
            filePath: filePath,
            name: 'image'
        })
    },

    save(data) {
        console.log(data)
        return request.post('/diary/add-by-input', data)
    }
}