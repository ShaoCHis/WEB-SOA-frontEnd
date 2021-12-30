import request from '@/utils/request'

export function submitReservation(params) {
    return request({
        url: `/orders/reservations/submitReservation/${params.scheduleId}/${params.patientId}`,
        method: 'post',
        params
    })
}
