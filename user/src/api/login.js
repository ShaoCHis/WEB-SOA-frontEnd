import request from '@/utils/request'

//用ID登录
export function login(email, password) {
    return request({
        url: '/loginRegister/users/session',
        method: 'post',
        data: {
            email,
            password
        }
    })
}

//注册
export function register(email, name, phoneNumber, password) {
    return request({
        url: '/loginRegister/users/register',
        method: 'post',
        data: {
            email,
            name,
            phoneNumber,
            password
        }
    })
}