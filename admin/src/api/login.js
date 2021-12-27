import request from '@/utils/request'

//用ID登录
export function login(id, password) {
    return request({
        url: '/loginRegister/administrators/session',
        method: 'post',
        data: {
            id,
            password
        }
    })
}