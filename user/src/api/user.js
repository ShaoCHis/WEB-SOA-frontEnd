import request from '@/utils/request'

//根据用户id获取用户信息
export function getUserInfo(params) {
    return request({
        url: `/user/Info/getUserInfo/${params.id}`,
        method: 'get',
        params
    })
}

//修改用户基本信息,用户id必须传
export function setUserInfo(userId, name, phoneNumber, email) {
    return request({
        url: '/user/Info/updateUserInfo',
        method: 'post',
        data: {
            userId,
            name,
            phoneNumber,
            email,
        }
    })
}

//根据病人id删除病人
export function deletePatient(params) {
    return request({
        url: `/user/patients/deletePatient/${params.patientId}`,
        method: 'delete',
        params
    })
}

// export function deletePatient(id) {
//     return request({
//         url: "/user/patients/deletePatient",
//         method: 'delete',
//         data: {
//             id
//         }
//     })
// }

// 根据用户id为用户添加病人
export function addPatient(patientId, name, sex, birthday, phoneNumber, isInsure, params) {
    return request({
        url: `/user/patients/addPatient/${params.userId}`,
        method: 'post',
        data: {
            patientId,
            name,
            sex,
            birthday,
            phoneNumber,
            isInsure,
        },
        params
    })
}
