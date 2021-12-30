import request from '@/utils/request'

//查询医院某月流水
export function getStatementMonth(year, month, hospitalId) {
    return request({
        url: `
        /statistic/hospital/getHospMonthEverydayMoney/${year}/${month}/${hospitalId}`,
        method: 'get',
    })
}

//查询医院某年流水
export function getStatementYear(year, hospitalId) {
    return request({
        url: `/statistic/hospital/getHospYearEverydayMoney/${year}/${hospitalId}`,
        method: 'get',
    })
}

//查询医院某段时间内流水s
export function getStatementDay(id,time) {
    return request({
        url: `/statistic/hospital/getHospitalMoneyByDay`,
        method: 'post',
        data: {
            hospitalId: id,
            reserveDateBegin: time[0],
            reserveDateEnd: time[1]
        }
    })
}

