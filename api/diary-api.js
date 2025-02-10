import request from '@/utils/request'

export default {
    getByDate(data) {
        return request.post('/diary/get-by-date', data)
    },
}