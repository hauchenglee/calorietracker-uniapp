import request from '@/utils/request'

export default {
    checkToken(data) {
        return request.post('/check-token', data)
    },

    checkExist(data) {
        return request.post('/check-exist', data)
    },

    register(data) {
        return request.post('/register', data)
    },

    login(data) {
        return request.post('/login', data)
    },

    logout(data) {
        return request.post('/logout', data)
    },
}