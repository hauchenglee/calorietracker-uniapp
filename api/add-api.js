import request from '@/utils/request'

export default {
    getVersion(filePath, content) {
        return request.uploadImage('/chatgpt/get-version', {
            filePath: filePath,
            content
        })
    },

    save(data) {
        return request.post('/diary/save', data)
    },

    delete(data) {
        return request.post('/diary/delete', data)
    }
}