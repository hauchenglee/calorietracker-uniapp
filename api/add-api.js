import request from '@/utils/request'

export default {
    getVersion(filePath) {
        return request.upload('/chatgpt/get-version', {
            filePath: filePath,
            name: 'image'
        })
    },

    save(data) {
        return request.post('/diary/save', data)
    },

    delete(data) {
        return request.post('/diary/delete', data)
    }
}