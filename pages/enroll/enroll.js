// pages/enroll/enroll.js
import {
    get,post
} from '@/utils/request'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        account: '',
        password: '',
        email: '',
        trip: '获取验证码',
        isTap: true,
        code: ''
    },
    onGetCode(e) {
        if (this.data.isTap) {
            get(`/user/send/code`, {
                    email: this.data.email
                })
                .then(() => {
                    wx.showToast({
                        title: '获取成功',
                        icon: '',
                        duration: 2000
                    })
                    this.setData({
                        isTap: false
                    })
                    let t = 60
                    let jishiqi = setInterval(
                        () => {
                            t--;
                            if (t > 0) {
                                this.setData({
                                    trip: t
                                })
                            }
                            if (t == 0) {
                                this.setData({
                                    trip: '获取验证码'
                                })
                                this.setData({
                                    isTap: true
                                })
                                clearInterval(jishiqi)
                            }
                        }, 1000)
                })
                .catch((err) => {
                    wx.showToast({
                        title: 'Oops,失败了',
                        icon: 'error',
                        duration: 2000
                    })
                })
        }
    },
    onEnroll(){
        post('/user/signup',{
            username:this.data.account,
            password:this.data.password,
            email:this.data.email,
            code:this.data.code
        }).then(()=>{
            wx.showToast({
              title: '注册成功',
              duration:1000
            })
            setTimeout(()=>{
                wx.redirectTo({
                    url: '../login/login',
                  })
            },5000)

        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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