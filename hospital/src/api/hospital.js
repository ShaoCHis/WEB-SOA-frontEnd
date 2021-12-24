import request from '@/utils/request'

//返回医院信息
export function getHospInfo(params) {
    return request({
        url: `/hospital/hospitals/getHospInfo/${params.id}`,
        method:'get',
        params
    })
}

//根据科室ID获取医院详细信息
export function getHospListInfo(params) {
    return request({
        url: `/hosp/getHospListInfo/${params.id}`,
        method:'get',
        params
    })
}

//医院加入系统
export function hospJoinSys(params) {
    return request({
        url: '/hosp/join',
        method: 'post',
        params
    })
}

//根据医院ID修改基本信息
export function hospModifyBasicInfo(params) {
    return request({
        url: '/hosp/updateHospital',
        method: 'post',
        params
    })
}

//根据医院ID修改医院公告
export function hospModifyNotice(params) {
    return request({
        url: '/hosp/updateNoticeById',
        method: 'post',
        params
    })
}

//根据医院ID修改密码
export function hospModifyPassword(params) {
    return request({
        url: '/hosp/updatePassById',
        method: 'post',
        params
    })
}

//根据医院ID修改logo(需求id和oss服务返回的图片url)
export function hospModifyLogo(params) {
    return request({
        url: '/hosp/updateLogoById',
        method: 'post',
        params
    })
}