import request from '@/utils/request'

//根据科室ID查找科室
export function getDepartById(params) {
    return request({
        url: `/department/getDepartInfo/${params.id}`,
        method: 'get',
        params
    })
}

//根据医院ID获取科室列表
export function getDepartListById(params){
    return request({
        url: `/department/getDepartListInfo/${params.id}`,
        method:'get',
        params
    })
}