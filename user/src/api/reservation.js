import request from '@/utils/request'

export function submitReservation(patientId, scheduleId) {
    console.log(patientId)
    console.log(scheduleId)
    return request({
        url: `/hospital/schedules/submitReservation/${158}/${411422200010108891}`,
        method: 'get',
    })
}
