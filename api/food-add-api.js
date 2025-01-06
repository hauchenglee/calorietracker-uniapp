import request from '@/utils/request'

export default {
    getVersion(filePath) {
        return request.upload('/chatgpt/get-version', {
            filePath: filePath,
            name: 'image'
        })
    },

    save(data) {
        console.log(data)
        return request.post('/api/diet/add-by-input', data)
    }
}