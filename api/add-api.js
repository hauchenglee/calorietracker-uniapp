import request from '@/utils/request'

export default {
    getVersion(filePath, content) {
        return request.uploadImage('/chatgpt/get-version', {
            filePath: filePath,
            content
        })
    },

    addByManual(data) {
        return request.post('/diary/add-by-manual', data)
    },

    delete(data) {
        return request.post('/diary/delete', data)
    }
}