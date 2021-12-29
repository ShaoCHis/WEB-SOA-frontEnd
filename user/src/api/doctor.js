import request from '@/utils/request'

//根据科室ID和医院ID获取医生列表
export function getDocListByHosRoom(HosID,depID) {
    return request({
        url: `/hospital/doctors/getDoctorList/${HosID}/${depID}`,
        method: 'get',
    })
}