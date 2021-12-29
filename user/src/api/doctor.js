import request from '@/utils/request'


// 根据医院id和科室id获取某医院的某科室医生信息列表
export function getDoctorList(params) {
    return request({
        url: `/hospital/doctors/getDoctorList/${params.hid}/${params.did}`,
        method: 'get',
        params
    })
}

