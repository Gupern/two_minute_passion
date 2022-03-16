// pages/myFlag/myFlag.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        project: [{
            "projectName": "",
            "taskList": [{
                "name": "",
                "count": ''
            }, {
                "name": "",
                "count": ''
            }]

        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 请求后台接口，获取数据
        this.getPersonalProjectInfo();
    },

    /**
     * 获取个人的项目数据
     */
    getPersonalProjectInfo() {
        console.log("openid:", app.globalData.openid)
        wx.request({
            url: app.globalData.defaultURL + "/wechat/miniprogram/get_personal_project_info",
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            data: {
                openid: app.globalData.openid
            },
            success: (res) => {
                console.log("get_personal_project_info res", res);
                this.setData({
                    project: res.data.data
                })
            },
            fail: (res) => {
                wx.showToast({
                  title: '服务器维护中',
                  icon: 'error'
                })
            }
        })
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