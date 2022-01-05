import request from '@/utils/request'

export function submitReservation(patientId, scheduleId) {
    // console.log(patientId)
    // console.log(scheduleId)
    return request({
        url: `/hospital/schedules/submitReservation/${scheduleId}/${patientId}`,
        method: 'get',
    })
}
