import request from '@/utils/request'

//根据医生ID获取预约情况
export function getResByDocID(ID) {
    return request({
        url: `/hospital/doctors/getReservationVo/${ID}`,
        method: 'get',
    })
}