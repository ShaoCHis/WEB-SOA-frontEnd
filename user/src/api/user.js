import request from '@/utils/request'

//根据用户id获取用户信息
export function getUserInfo(params) {
    return request({
        url: `/user/Info/getUserInfo/${params.id}`,
        method:'get',
        params
    })
}

//修改用户基本信息,用户id必须传
export function setUserInfo(userId,name,phoneNumber,email) {
    return request({
        url: '/user/Info/updateUserInfo',
        method: 'post',
        data: {
            userId,
            name,
            phoneNumber,
            email,
        }
    })
}