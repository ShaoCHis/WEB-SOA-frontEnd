import request from '@/utils/request'

export function getHospInfo(params) {
    return request({
        url: `/hosp/getHospInfo/${params.id}`,
        method:'get',
        params
    })
}
