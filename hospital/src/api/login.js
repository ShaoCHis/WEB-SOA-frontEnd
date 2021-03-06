import request from '@/utils/request'

//用ID登录
export function login_ID(id, password) {
    return request({
        url: '/loginRegister/hospitals/session',
        method: 'post',
        data: {
            id,
            password
        }
    })
}
//用Code登录
export function login_Code(code, password) {
    return request({
        url: '/loginRegister/hospitals/session',
        method: 'post',
        data: {
            code,
            password
        }
    })
}

//注册
export function register(Info) {
    return request({
        url: '/hospital/applies/info',
        method: 'post',
        data: Info
    })
}