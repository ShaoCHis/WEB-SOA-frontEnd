import request from '@/utils/request'

//查询某月流水
export function getStatementMonth(year, month) {
    return request({
        url: `
        /statistic/system/getSystemMonthEverydayMoney/${year}/${month}`,
        method: 'get',
    })
}

//查询某年流水
export function getStatementYear(year) {
    return request({
        url: `/statistic/system/getSystemYearEverydayMoney/${year}`,
        method: 'get',
    })
}

//查询某段时间内流水s
export function getStatementDay(time) {
    return request({
        url: `/statistic/system/getSystemMoneyByDay`,
        method: 'post',
        data: {
            reserveDateBegin: time[0],
            reserveDateEnd: time[1]
        }
    })
}

