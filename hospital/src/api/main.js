import request from '@/utils/request'

export function getHospInfo(params) {
    return request({
        url: `/hosp/getHospInfo/${params.id}`,
        method:'get',
        params
    })
}

export function getDepartById(params) {
    return request({
        url: `/department/getDepartInfo/${params.id}`,
        method: 'get',
        params
    })
}

export function getDepartListById(params){
    return request({
        url: `/department/getDepartListInfo/${params.id}`,
        method:'get',
        params
    })
}
