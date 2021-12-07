import request from '@/utils/request'

//返回医院信息
export function getHospInfo(params) {
    return request({
        url: `/hosp/getHospInfo/${params.id}`,
        method:'get',
        params
    })
}

