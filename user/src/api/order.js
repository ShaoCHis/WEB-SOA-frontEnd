import request from '@/utils/request'

//根据用户id获取用户信息
export function getReservationList(params) {
    return request({
        url: `/orders/reservations/getReservationList/${params.userId}`,
        method: 'get',
        params
    })
}

// 根据reservationId取消未付款的预约
export function cancelReservation(params) {
    return request({
        url: `/orders/reservations/cancelReservation/${params.reservationId}`,
        method: 'delete',
        params
    })
}

// 根据reservationId取消已经付款的预约，并退款
export function cancelPaidReservation(params) {
    return request({
        url: `/orders/reservations/cancelPaidReservation/${params.reservationId}`,
        method: 'get',
        params
    })
}
