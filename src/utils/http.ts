import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

const http = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL || '', // url = base url + request url
    timeout: 60 * 1000,
    withCredentials: true
})

const err = (error: any) => {
    if (error.message.includes('timeout')) {
        ElMessage({
            message: '请求超时，请刷新页面重试',
            type: 'error'
        })
    }
    if (error.response) {
        const data = error.response.data
        const token: string = ''
        if (error.response.status === 403) {
            ElMessage({
                message: 'Forbidden',
                type: 'error'
            })
        }
        if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
            ElMessage({
                message: 'Unauthorized',
                type: 'error'
            })
            if (token) {

            }
        }
    }
    return Promise.reject(error)
}

http.interceptors.request.use((config: AxiosRequestConfig) => {
    return config
}, err)

http.interceptors.response.use((response: AxiosResponse) => {
    const res = response.data
    if (res.code != 20000) {
        ElMessage({
            message: res.message || 'Error',
            type: 'error',
            duration: 5 * 1000
        })
        if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
            return Promise.reject(new Error(res.message || 'Error'))
        }
    } else {
        return res
    }
}, err)

export default http