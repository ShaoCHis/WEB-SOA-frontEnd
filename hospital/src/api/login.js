import request from '@/utils/request'

export function login_ID(id,password)
{
    return request({
        url:'/api/hospital/session',
        method:'post',
        data:{
            id,
            password
        }
    })
}

export function login_Code(code,password)
{
    return request({
        url:'/api/hospital/session',
        method:'post',
        data:{
            code,
            password
        }
    })
}