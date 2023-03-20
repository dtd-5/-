const {
    post,
    get
} = require("@/utils/request")
Page({
    /**
     * 页面的初始数据
     */
    data: {
        account: '',
        password: '',
        show: false,
        trip: '获取验证码',
        email: '',
        code: '',
        newPwd: '',
        isTap: true,
        secretCode: '',
        type:'password'
    },
    showpwd(){
        this.data.type=='password'?this.setData({type:'text'}):this.setData({type:'password'})
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
    Show() {
        this.setData({
            show: true
        })
    },
    forgetPassword() {
        get('/user/validate/code', {
            code: this.data.code,
            email: this.data.email
        }).then((res) => {
            this.setData({
                secretCode: res.data
            })
            post('/user/forgot/password', {
                newPwd:this.data.newPwd,
                secretCode:this.data.secretCode,
                email:this.data.email
            }).then(() => {
                wx.showToast({
                    title: 'success'
                })
            })
        })
    },

    regist: function (e) {
        wx.navigateTo({
            url: '../enroll/enroll',
        })
    },
    signin: function (e) {
        var that = this
        if (that.data.account == '') {
            wx.showModal({
                title: "提示",
                content: "请输入用户名",
                showCancel: false,
                success(res) {}
            })
        } else if (that.data.password == '') {
            wx.showModal({
                title: "提示",
                content: "请输入密码",
                showCancel: false,
                success(res) {}
            })
        } else {
            wx.clearStorage()
            post('/user/login', {
                username: this.data.account,
                password: this.data.password
            }).then((data) => {
                wx.setStorageSync('token', data.data.token)
                wx.setStorageSync('user', data.data.user)
                wx.switchTab({
                    url: '../index/index',
                })
            }).catch((err) => {
                wx.showToast({
                    title: 'Error!',
                    icon: 'error'
                })
                console.log(err);
            })
        }
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let token = null;
        try {
            token = wx.getStorageSync('token')
        } catch (e) {
            console.log(e);
        }
        if (token) {
            wx.redirectTo({
                url: '../index/index',
            })
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {


    },


    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {


    },


    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {


    },


    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {


    },


    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {


    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {


    }
})