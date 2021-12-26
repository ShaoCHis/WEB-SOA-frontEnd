import request from '@/utils/request'

//根据科室ID获取医院详细信息
export function getDocListByHosRoom(HosID,depID) {
    return request({
        url: `/hospital/doctors/getDoctorList/${HosID}/${depID}`,
        method: 'get',
    })
}