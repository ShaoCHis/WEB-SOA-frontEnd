import request from '@/utils/request'

//查看某医院所有排班信息
export function getAllSchedule(HosID) {
    return request({
        url: `/hospital/schedules/getHospSchedule/${HosID}`,
        method: 'get',
    })
}