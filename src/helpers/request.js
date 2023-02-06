import axios from 'axios'
import baseURLConfig from './config-baseURL'

console.log(baseURLConfig)

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
axios.defaults.baseURL = baseURLConfig.baseURL
axios.defaults.withCredentials = true  //是否使用跨域请求

export default function request(url, type = 'GET', data = {}) {
    return new Promise((resolve, reject) => {
        let option = {   //参数
            url,
            method: type,
            validateStatus(status) {
                return (status >= 200 && status < 300) || status === 400
            }
        }
        if (type.toLowerCase() === 'get') {
            option.params = data   //option添加params属性 该属性的值为data
        } else {
            option.data = data
        }
        axios(option).then(res => {     //发请求成功后
            if (res.status === 200) {
                resolve(res.data)
            } else {
                console.error(res.data)
                reject(res.data)
            }
        }).catch(err => {  //status非status >= 200 && status < 300) || status === 400         //发请求失败后
            console.error({ msg: '网络异常' })
            reject({ msg: '网络异常' })  //执行reject函数，给msg赋值“网络异常”
        })
    })
}


// request('/auth/login', 'POST', {username: 'hunger', password: '123456'})
//   .then(data=>{
//     console.log(data)
//   })