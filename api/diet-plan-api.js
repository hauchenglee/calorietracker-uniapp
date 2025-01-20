import request from '@/utils/request'

export default {
    getDietPlan(data) {
        return request.post('/diet-plan/get-diet-plan', data)
    },

    renew() {
        return request.post('/diet-plan/renew')
    },

    save(data) {
        return request.post('/diet-plan/save', data)
    }
}