//index.js
//获取应用实例
const app = getApp()
import {
    get,
    remove
} from '@/utils/request'
Page({
    data: {
        bodydata: ''
    },
    deldata(e) {
        console.log(e.currentTarget.dataset.bid);
        remove('/user/body/delInfo', {
            bodyInfoId: e.currentTarget.dataset.bid
        }, {
            token: wx.getStorageSync('token')
        }).then(() => {
            wx.showToast({
                title: 'success',
                duration: 2000
            })
            this.onShow()

        })
    },
    // 初始化
    onLoad: function (options) {

    },
    async onShow() {
        console.log('woshidatachan');
        let bodydata = null
        await get('/user/body/getAllData', {}, {
            token: wx.getStorageSync('token')
        }).then((res) => {
            if(res.data!=='暂无身体数据信息'){
                this.setData({
                    bodydata: res.data
                })
            }
        })

    }

})