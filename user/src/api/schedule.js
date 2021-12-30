import request from '@/utils/request'

// 查看某医生的排班信息
export function getSchedule(params) {
    return request({
        url: `/hospital/schedules/getSchedule/${params.doctorId}`,
        method: 'get',
        params
    })
}
//根据病人ID和scheduleID生成预约订单信息
export function submitReservation(params) {
    return request({
        url: `/orders/reservations/submitReservation/`,
        method: 'POST',
        params
    })
}