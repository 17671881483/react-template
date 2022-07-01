import Request from './config'
import type { RequestConfig } from './config/types'

interface YWZRequestConfig<T> extends RequestConfig {
    data?: T
}
interface YWZResponse<T> {
    code: number
    message: string
    data: T
}

const request = new Request({
    baseURL: 'http://yapi.smart-xwork.cn/mock/157209/120.27.238.73', // 服务器基路径
    timeout: 1000 * 60 * 5, // 超时响应
    interceptors: {
        // 请求拦截器
        requestInterceptors: config => {
            console.log('实例请求拦截器')

            return config
        },
        // 响应拦截器
        responseInterceptors: result => {
            console.log('实例响应拦截器')
            return result
        },
    },
})

/**
 * @description: 函数的描述
 * @interface D 请求参数的interface
 * @interface T 响应结构的intercept
 * @param {YWZRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const ywzRequest = <D, T = any>(config: YWZRequestConfig<D>) => {
    const { method = 'GET' } = config
    if (method === 'get' || method === 'GET') {
        config.params = config.data
    }
    return request.request<YWZResponse<T>>(config)
}

const cancelRequest = (url: string | string[]) => {
    return request.cancelRequest(url)
}
// 取消全部请求
const cancelAllRequest = () => {
    return request.cancelAllRequest()
}

export { cancelRequest, cancelAllRequest, ywzRequest }