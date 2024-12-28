import request from '@/utils/request'

export default {
    getAllList(data) {
        return request.post('/diet/list', {})
    },

    getByDate(data) {
        return request.post('/diet/get-by-date', data)
    }
}