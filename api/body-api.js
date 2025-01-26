import request from '@/utils/request'

export default {
    getBody(data) {
        return request.post('/body/get-body', data)
    },

    checkExist() {
        return request.post('/body/check-exist')
    },

    save(data) {
        return request.post('/body/save', data)
    }
}