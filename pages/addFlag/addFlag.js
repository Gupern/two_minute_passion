// pages/addFlag/addFlag.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    formSubmit(e) {
        console.log('form发生了submit事件，携带数据为：', e)
        // TODO 向后台发起请求，添加任务
        let project = e.detail.value.project;
        let task = e.detail.value.task;
        if (!project) {
            project = "未分类"
        }
        console.log('ddd', project, task)
        wx.request({
            url: app.globalData.defaultURL + "/wechat/miniprogram/update_personal_project_info",
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            data: {
                openid: app.globalData.openid,
                project: project,
                task: task
            },
            success: (res) => {
                console.log("get_personal_project_info res", res);
                wx.showToast({
                    title: '添加成功',
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

    formReset(e) {
        console.log('form发生了reset事件，携带数据为：', e.detail.value)
        this.setData({
            chosen: ''
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