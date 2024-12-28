import request from '@/utils/request'

export default {
  login(data) {
    console.log(data)
    return request.post('/login', data)
  }
}