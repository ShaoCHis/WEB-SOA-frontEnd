import request from '@/utils/request'

//用ID登录
export function login(id, password) {
    return request({
        url: '/loginRegister/users/session',
        method: 'post',
        data: {
            id,
            password
        }
    })
}

//注册
export function register(Info) {
    return request({
        url: '/loginRegister/users',
        method: 'post',
        data: {
            name: Info.name,
            password: Info.password,
            email: Info.email,
            phoneNumber: Info.phoneNumber
        }
    })
}