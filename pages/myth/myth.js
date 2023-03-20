// pages/myth/myth.js
import {
    get,
    post,
    put,
    remove
} from '@/utils/request';

Page({
    data: {
        isTap:true,
        vanImage: 'vanImage',
        overlayshow: false,
        height: '',
        weight: '',
        fat_rate: '',
        putdatashow: false,
        showPassword: false,
        oldPwd: '',
        newPwd: '',
        secretCode: '',
        oldemail: '2586784220@qq.com',
        code: '',
        newemail: '2586784220@qq.com',
        showEmail: false,
        age: '',
        nickName: '',
        sex: '',
        type: 'Info',
        trip: '获取验证码',
        show: false,
        userInfo: wx.getStorageSync('user'),
        imagedisplay: 'none',
        ifchangeimage: false,
        src: "https://tse4-mm.cn.bing.net/th/id/OIP-C.xTZAyLbHIRMtv2eVrqVMsAAAAA?w=161&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    },
    up() {
        setTimeout(()=>{
        wx.nextTick(() => {
            this.data.vanImage == 'vanImage' ? this.setData({
                vanImage: 'vanImage1'
            }) : this.setData({
                vanImage: 'vanImage'
            })
        })},10)
    },
    showimage() {
        this.setData({
            imagedisplay: 'block'
        })
    },
    closeimage() {
        this.setData({
            imagedisplay: 'none'
        })
    },
    changeimage() {
        this.setData({
            ifchangeimage: true
        })
    },
    changeimage1() {
        var that = this;
        wx.chooseMedia({
            count: 9,
            mediaType: ['image','video'],
            sourceType: ['album', 'camera'],
            maxDuration: 30,
            camera: 'back',
            success(res) {
              console.log(res.tempFiles.tempFilePath)
              console.log(res.tempFiles.size)
            }
          })
        // wx.chooseImage({ //从本地相册选择图片或使用相机拍照
        //     count: 1, // 默认9
        //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        //     success: function (res) {
        //         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        //         let tempFilePaths = res.tempFilePaths
        //         console.log(tempFilePaths);
        //         wx.uploadFile({
        //             url: `http://10.23.129.64:9999/file/upload`,
        //             filePath: tempFilePaths[0],
        //             name: 'file',
        //             formData: {
        //                 type: 'AVATAR'
        //             },
        //             header: {
        //                 token: wx.getStorageSync("token")
        //             },
        //             success: function (res) {
        //                 console.log(res)
        //                 that.setData({
        //                     src: tempFilePaths[0]
        //                 }) //上传成功后立刻更换前端展示的头像
        //             },
        //             fail(res) {
        //                 console.log(res);
        //             }
        //         })
        //     }
        // })
    },

    closeInfo() {
        wx.navigateTo({
            url: '../bodydata/bodydata',
        })
    },
    closeHide() {
        this.setData({
            overlayshow: false
        })
    },
    onClickHide() {
        this.setData({
            overlayshow: true
        })
    },
    putdata() {
        if (!(this.data.height && this.data.weight && this.data.fat_rate)) {
            wx.showToast({
                title: '不完整啊',
                icon: 'error'
            })
            return
        }
        post('/user/body/addInfo', {
            height: this.data.height,
            weight: this.data.weight,
            fatRate: this.data.fat_rate
        }, {
            token: wx.getStorageSync('token')
        }).then(() => {
            get('/user-info/body/statistics', {}, {
                token: wx.getStorageSync('token')
            }).then((res) => {
                wx.setStorageSync('bodydata', res.data)
            })
        })
    },
    showtianjiashuju() {
        this.setData({
            putdatashow: true
        })
    },
    putEmail() {
        get('/user/validate/code', {
            code: this.data.code,
            email: this.data.oldemail
        }).then((res) => {
            console.log(111);
            post('/user/modify/email', {
                secretCode: res.data,
                email: this.data.newemail
            }, {
                token: wx.getStorageSync('token')
            }).then(() => {
                get('/user-info/data', {}, {
                    token: wx.getStorageSync('token')
                }).then((res) => {
                    wx.setStorageSync('user', res.data)
                })
            }).then(() => {
                wx.showToast({
                    title: 'success'
                })
            })
        })
    },
    closeEmail() {
        this.setData({
            showEmail: true
        })
    },
    logout() {
        get('/user/logout', {}, {
            token: wx.getStorageSync('token')
        })
        wx.clearStorage()
        wx.reLaunch({
            url: '../login/login',
        })
    },
    Show() {
        this.setData({
            show: true
        })
    },
    changeInfo() {
        put('/user-info/update/information', {
            nickName: this.data.nickName,
            sex: this.data.sex === '女' ? 0 : 1,
            age: this.data.age
        }, {
            token: wx.getStorageSync('token')
        }).then(() => {
            get('/user-info/data', {}, {
                token: wx.getStorageSync('token')
            }).then((res) => {
                wx.setStorageSync('user', res.data)
                this.setData({
                    userInfo: wx.getStorageSync('user')
                })
            })
        })
    },
    chanPassword() {
        this.setData({
            showPassword: true
        })
    },
    putPassword() {
        post('/user/modify/password', {
            oldPwd: this.data.oldPwd,
            newPwd: this.data.newPwd
        }, {
            token: wx.getStorageSync('token')
        }).then(() => {
            get('/user-info/data', {}, {
                token: wx.getStorageSync('token')
            }).then((res) => {
                wx.setStorageSync('user', res.data)
            })
        })
    },
    onReady() {

        setTimeout(function () {
            // 获取 chart 实例的方式
            // console.log(chart)
        }, 2000);
    },
    onLoad() {
        this.setData({
            userInfo:wx.getStorageSync('user')
        })
    },
    onGetCode(e) {
        if (this.data.isTap) {
            get(`/user/send/code`, {
                    email: this.data.oldemail
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
});