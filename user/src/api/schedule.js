import request from '@/utils/request'

// 查看某医生的排班信息
export function getSchedule(params) {
    return request({
        url: `/hospital/schedules/getSchedule/${params.doctorId}`,
        method: 'get',
        params
    })
}
