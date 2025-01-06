import request from '@/utils/request'

export default {
    createFood(data) {
        console.log(data)
        return request.post('/api/food/create-food', data)
    },

    all(data) {
        console.log(data)
        return request.post('/api/food/create-food', data)
    },

    favorite(data) {
        console.log(data)
        return request.post('/api/food/create-food', data)
    },

    search(data) {
        console.log(data)
        return request.post('/api/food/search', data)
    }
}