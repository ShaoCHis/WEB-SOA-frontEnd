import request from '@/utils/request'

//根据科室ID查找科室
export function getDepartById(params) {
    return request({
        url: `/hospital/departments/getDepartInfo/${params.id}`,
        method: 'get',
        params
    })
}

//根据医院ID获取科室列表
export function getDepartListById(params) {
    return request({
        url: `/hospital/departments/getDepartListInfo/${params.id}`,
        method: 'get',
        params
    })
}

//获取所有科室信息
export function getAllDepart() {
    return request({
        url: '/hospital/departments/getAllDepart',
        method: 'get'
    })
}
