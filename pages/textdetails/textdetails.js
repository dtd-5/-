const {
    get
} = require("@/utils/request");

// pages/textdetails/textdetails.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLoading: true, // 判断是否尚在加载中
        article: {} // 内容数据
    },
    onLoad: function (options) {
        wx.showLoading({
            title: '数据加载中...',
            mask: true
        })
        let that = this
        get('/home/information/detail', {id:options.id}, {
            token: wx.getStorageSync('token')
        }).then(res => {
            let text=res.data.text
            let result = app.towxml(text, 'markdown', {
                base: '', // 相对资源的base路径
                theme: 'light', // 主题，默认`light`
                events: { // 为元素绑定的事件方法
                    tap: (e) => {
                        console.log('tap', e);
                    }
                }
            });
            // 更新解析数据
            that.setData({
                article: result,
                isLoading: false
            });
            wx.hideLoading()
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})