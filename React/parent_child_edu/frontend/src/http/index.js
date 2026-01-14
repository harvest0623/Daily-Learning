import axios from 'axios'
import { Toast } from 'antd-mobile'

axios.timeout = 5000;
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json';


// 请求拦截
axios.interceptors.request.use(request => {
    const token = localStorage.getItem('token');
    if (token) {
        request.headers.Authorization = token
    }
    return request;
})

// 响应拦截
axios.interceptors.response.use(
    (response) => {  // 逻辑性错误
        if (response.data.code !== 1) {
            Toast.show({
                icon: 'fail',
                content: response.data.message
            })
            return Promise.reject(response);
        }
        return response
    },
    (error) => { // 程序性错误
        if (error.response) {
            Toast.show({
                icon: 'fail',
                content: error.response.data.message || '请求失败'
            })

            if (error.response.status == 416) { // 没有权限
                // 重定向去登录页面
                setTimeout(() => {
                    window.location.href = '/login'
                }, 2000)
            }
        } else {
            Toast.show({
                icon: 'fail',
                content: error.message || '网络错误'
            })
        }
        return Promise.reject(error);
    }
)

export default axios