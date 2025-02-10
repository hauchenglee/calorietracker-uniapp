import request from '@/utils/request'

export default {
    updateFrequently(data) {
        return request.post('/api/user-food/update-frequently', data)
    },

    toggleFavorite(data) {
        return request.post('/api/user-food/toggle-favorite', data)
    },

    search(data) {
        return request.post('/api/user-food/search', data)
    }
}