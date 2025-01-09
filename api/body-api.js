import request from '@/utils/request'

export default {
    getBody(filePath) {
        return request.upload('/body/get-version', {
            filePath: filePath,
            name: 'image'
        })
    },

    checkExist() {
        return request.post('/body/check-exist')
    },

    save(data) {
        return request.post('/body/save', data)
    }
}