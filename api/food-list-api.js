import request from '@/utils/request'

export default {
    createFood(data) {
        return request.post('/api/food/create-food', data)
    },

    all(data) {
        return request.post('/api/food/create-food', data)
    },

    favorite(data) {
        return request.post('/api/food/create-food', data)
    },

    search(data) {
        return request.post('/api/food/search', data)
    }
}