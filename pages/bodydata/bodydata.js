// pages/bodydata/bodydata.js
import {
    get
} from '@/utils/request'
import {
    useChart
} from '../../utils/echarts'
import {
    statusChart
} from '../../utils/statusDataEcharts'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        acdata: '',
        ac: {
            onInit: useChart([], [820, 932, 901])
        },
        bc: {
            onInit: useChart([], [])
        },
        cc: {
            onInit: useChart(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], [820, 932, 901, 934, 1290, 1330, 1320, 1000, 1000, 378])
        },
        dc: {
            onInit: statusChart(['Mon', 'Mon', 'Mon'], ['SO_WEAK', 'SO_WEAK', 'SO_WEAK'])
        },
        statusTime: [0, 0, 0, 0, 0],
        statusData: ['SO_WEAK', 'SO_WEAK', 'SO_WEAK']
    },
    cahngedata() {

    },
    show() {
        this.setData({
            show: true
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    detaildata() {
        wx.navigateTo({
            url: '../dataChan/dataChan',
        })
    },
    async onLoad(options) {
        await get('/user-info/body/statistics', {}, {
            token: wx.getStorageSync('token')
        }).then(
            (res) => {
                wx.setStorageSync('bodydata', res.data)
                this.setData({
                    ac: {
                        onInit: useChart(res.data.weight[0], res.data.weight[1])
                    },
                    bc: {
                        onInit: useChart(res.data.bmi[0], res.data.bmi[1])
                    },
                    cc: {
                        onInit: useChart(res.data.fat_rate[0], res.data.fat_rate[1])
                    },
                    dc: {
                        onInit: statusChart(res.data.body_status[0], res.data.body_status[1])
                    },
                    statusTime: res.data.body_status[0],
                    statusData: res.data.body_status[1].map(item => {
                        switch (item) {
                            case 'NEED_LOSE_WEIGHT':
                                return '需要减肥'
                            case 'SO_WEAK':
                                return '弱不禁风'
                            case 'EAT_MORE':
                                return '多吃点啦'
                            case 'BEAUTIFUL_HANDSOME':
                                return '美丽帅气'
                            default:
                                return '肥嘟嘟'
                        }
                    })
                })
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