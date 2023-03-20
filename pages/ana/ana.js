const {
    get,
    post,
    remove
} = require("@/utils/request");

// pages/ana/ana.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        advise: '',
        trainType: '',
        deleteshow: false,
        array: ['跑步', '跳绳', '乒乓球'],
        index: 0,
        show: false,
        minDate: new Date(2020, 0, 1).getTime(),
        maxDate: Date.now(),
        year: new Date(Date.now()).getFullYear(),
        month: new Date(Date.now()).getMonth() + 1,
        day: new Date(Date.now()).getDate(),
        defaultDate: '',
        Project: 0,
        Data: '',
        showadd: false,
        trainTime:'',
        avgHeartRate:'',
        runDistance:'',
        skipNum:"",
        calorieBrun:"",
        id:''

    },
    delete(e) {
        this.setData({
            deleteshow: true,
            id:e.currentTarget.dataset.id
        })
    },
    deletedata() {
        remove('/data/train/del', {
            trainDataId:this.data.id
        }, {
            token: wx.getStorageSync('token')
        }).then(()=>{
            wx.showToast({
              title: '成功',
              duration:2000
            })
            this.onLoad()

        })
    },
    show() {
        this.setData({
            show: true
        })
    },
    before() {
        if (this.data.day > 1) {
            this.setData({
                day: this.data.day - 1
            })
        } else {
            let month = this.data.month - 1,
                day, year = this.data.year
            console.log(month);
            if (month >= 1) {
                if (month == (1 || 3 || 5 || 7 || 8 || 10 || 12)) {
                    day = 31
                } else if (month == 2) {
                    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                        day = 29
                    } else {
                        day = 28
                    }
                } else {
                    day = 30
                }
                console.log(month, day);
                this.setData({
                    month: month,
                    day: day
                })
            } else {
                this.setData({
                    year: this.data.year - 1,
                    day: 31,
                    month: 12
                })
            }
        }
        this.confrim()

    },
    last(e) {
        let day = this.data.day;
        let month = this.data.month;
        let year = this.data.year;
        if (day == new Date(Date.now()).getDate() && month == new Date(Date.now()).getMonth() + 1 && year == new Date(Date.now()).getFullYear()) {
            wx.showToast({
                title: '最后一天了',
            })
            return
        }
        // 判断是否是闰年，用于计算二月的天数
        let isLeapYear = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;

        if (day < 28 || (day < 28 && month != 2) || (day < 29 && month == 2 && isLeapYear) || (day < 30 && [4, 6, 9, 11].includes(month)) || (day < 31 && [1, 3, 5, 7, 8, 10, 12].includes(month))) {
            // 当前月份的天数不超过当月天数时，直接将天数加1
            this.setData({
                day: day + 1
            });
        } else {
            // 当前月份的天数已经是最后一天时，将月份加1，并计算新月份的天数
            month += 1;
            this.setData({
                day: 1,
                month: month,
                year: year
            });
        }
        this.confrim()
    },

    confrim() {
        this.setData({
            show: false
        })
        this.onLoad()
    },
    select(value) {
        let date = value.detail
        this.setData({
            year: date.getFullYear(),
            month: (date.getMonth() + 1),
            day: date.getDate()
        })
    },
    adddata() {
        this.setData({
            showadd: true
        })
    },
    putdata() {
        let type=''
        if(this.data.index==0){type='RUNNING'}else if(this.data.index==1){type='ROPE_SKIPPING'
        }else{type='TABLE_TENNIS'}
        if(type=='RUNNING'){
            post('/data/train/add', {
                "trainTime": this.data.trainTime,
                "avgHeartRate": this.data.avgHeartRate,
                "runDistance": this.data.runDistance,
                "calorieBrun": this.data.calorieBrun,
                "trainType":type
            }, {
                token: wx.getStorageSync('token')
            }).then(res=>{
                this.onLoad()
            })
        }else if(type=='ROPE_SKIPPING'){
            post('/data/train/add', {
                "trainTime": this.data.trainTime,
                "avgHeartRate": this.data.avgHeartRate,
                "skipNum": this.data.skipNum,
                "calorieBrun": this.data.calorieBrun,
                "trainType":type
            }, {
                token: wx.getStorageSync('token')
            }).then(res=>{
                this.onLoad()
            })
        }else {
            post('/data/train/add', {
                "trainTime": this.data.trainTime,
                "avgHeartRate": this.data.avgHeartRate,
                "calorieBrun": this.data.calorieBrun,
                "trainType":type
            }, {
                token: wx.getStorageSync('token')
            }).then(res=>{
                this.onLoad()
            })
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        post('/data/train/page', {
            date: `${this.data.year}-${this.data.month}-${this.data.day} 00:00:00`
        }, {
            token: wx.getStorageSync('token')
        }).then(res => {
            let ans = []
            for (let res of res.data) {
                let t=null
                if(res.trainType=='RUNNING'){
                    t=res.runDistance
                }else if(res.trainType === "ROPE_SKIPPING"){
                    t=res.skipNum
                }else{
                    ans.push({
                        data: [res.trainTime, res.avgHeartRate,  res.calorieBrun],
                        trainType: res.trainType,
                        id:res.id
                    })
                    continue
                }
                ans.push({
                    data: [res.trainTime, res.avgHeartRate, t, res.calorieBrun],
                    trainType: res.trainType,
                    id:res.id
                })
            }
            this.setData({
                Project: res.data.length,
                // Data:[res.data[0].trainTime,res.data[0].avgHeartRate,res.data[0].trainType==="RUNNING"?res.data[0].runDistance:res.data[0].skipNum,res.data[0].calorieBrun],
                // trainType:res.data[0].trainType
                Data: ans
            })
            if (res.data.length !== 0) {
                get('/analyse/advise', {}, {
                    token: wx.getStorageSync('token')
                }).then(res => {
                    this.setData({
                        advise: res.data
                    })
                })
            }
        })
    },
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
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