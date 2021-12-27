import request from '@/utils/request'

//获取所有医院的列表
export function getHospList(params) {
    return request({
        url: "/hospital/hospitals/getHospList",
        method:'get',
        params
    })
}

//根据科室id获取医院详细信息列表
export function getHospListInfo(params) {
    return request({
        url: `/hospital/hospitals/getHospListInfo/${params.id}`,
        method:'get',
        params
    })
}