// app.js
import $http from '/utils/request.js'
/**
 * post提交
 * 调用示例
 * app._post_form('xxxxxx',{},(res)=>{ })
 */
App({
    towxml:require('/towxml/index'),
    $http,
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
    },
    globalData: {
        userInfo: null
    }
})