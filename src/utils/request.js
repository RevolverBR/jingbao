import axios from 'axios';

// 新建axios实例
const instance = axios.create({
    // baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/',
    baseURL: 'http://localhost:3001',
    timeout: 10000
})

// 请求拦截添加token
instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export const get = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        instance.get(url, {params}).then((response) => {
            resolve(response.data)
        }, err => {
            reject(err)
        })
    })
}

export const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        instance.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            resolve(response.data)
        }, err => {
            reject(err)
        })
    })
}