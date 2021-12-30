import request from '@/utils/request'

// 点击微信付款，本函数生成微信支付二维码，前端展示二维码（需要安装组件才能展示）给用户扫描支付
export function createNative(params) {
    return request({
        url: `/orders/weixin/createNative/${params.reservationId}`,
        method:'get',
        params
    })
}


export function queryPayStatus(params) {
    return request({
        url: `/orders/weixin/queryPayStatus/${params.reservationId}`,
        method:'get',
        params
    })
}
