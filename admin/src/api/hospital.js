import request from '@/utils/request'

//返回医院信息
export function getHospInfo(params) {
    return request({
        url: `/hospital/hospitals/getHospInfo/${params.id}`,
        method: 'get',
        params
    })
}

//根据科室ID获取医院详细信息
export function getHospListInfo(params) {
    return request({
        url: `/hospital/hospitals/getHospListInfo/${params.id}`,
        method: 'get',
        params
    })
}

//医院加入系统
export function hospJoin(params) {
    return request({
        url: `/hospital/hospitals/join`,
        method: 'post',
        data:{
            code:params
        }
    })
}

//根据医院ID修改基本信息
export function hospModifyBasicInfo(params) {
    return request({
        url: '/hospital/hospitals/updateHospital',
        method: 'post',
        params
    })
}

//根据医院ID修改医院公告
export function hospModifyNotice(id, notice) {
    return request({
        url: '/hospital/hospitals/updateNoticeById',
        method: 'post',
        data: {
            id,
            notice
        }
    })
}

//根据医院ID修改密码
export function hospModifyPassword(params) {
    return request({
        url: '/hospital/hospitals/updatePassById',
        method: 'post',
        params
    })
}

//根据医院ID修改logo(需求id和oss服务返回的图片url)
export function hospModifyLogo(id, image) {
    return request({
        url: '/hospital/hospitals/updateLogoById',
        method: 'post',
        data: {
            id,
            image
        }
    })
}

//返回所有医院列表
export function getAllHospital() {
    return request({
        url: '/hospital/hospitals/getHospList',
        method: 'get',
    })
}

//返回所有医院申请列表
export function getAllHospitalApply() {
    return request({
        url: '/hospital/applies/getApplyList',
        method: 'get',
    })
}