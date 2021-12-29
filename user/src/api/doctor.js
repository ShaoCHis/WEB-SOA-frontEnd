import request from '@/utils/request'

//根据科室ID和医院ID获取医生列表
export function getDocListByHosRoom(HosID,depID) {
    return request({
        url: `/hospital/doctors/getDoctorList/${HosID}/${depID}`,
        method: 'get',
    })
}// 根据医院id和科室id获取某医院的某科室医生信息列表
export function getDoctorList(params) {
    return request({
        url: `/hospital/doctors/getDoctorList/${params.hid}/${params.did}`,
        method: 'get',
        params
    })
}

