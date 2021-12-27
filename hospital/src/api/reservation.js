import request from '@/utils/request'

//根据医生ID获取预约情况
export function getResByDocID(ID) {
    return request({
        url: `/orders/reservations/getDoctorResList/${ID}`,
        method: 'get',
    })
}

//获取医院预约列表
export function getResByHosID(ID) {
    return request({
        url: `/orders/reservations/getHospResList/${ID}`,
        method: 'get',
    })
}