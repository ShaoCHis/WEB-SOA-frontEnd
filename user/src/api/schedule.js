import request from '@/utils/request'

//根据科室ID查找科室
export function getSchedule(params) {
    return request({
        url: `/hospital/schedules/getSchedule/${params.doctorId}`,
        method: 'get',
        params
    })
}
