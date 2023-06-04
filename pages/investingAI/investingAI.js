// pages/investingAI/investingAI.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recList: [{
      "name": "Hot",
      "strategyId": "0",
      "buyList": "1",
      "sellList": "2",
      "holdingList": "3"
    }]
  },
  //事件处理函数
  bindViewDetail: function (event) {
    let item = event.currentTarget.dataset.item
    wx.navigateTo({
      url: '../investingAIHistory1/investingAIHistory1?strategyId=' + item.strategyId
    });
  },
  // refresh
  refresh: function (event) {
    wx.request({
      url: app.globalData.defaultURL + "/wechat/miniprogram/stockAI/recList",
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      data: {
        openid: app.globalData.openid,
      },
      success: (res) => {
        console.log("res", res);
        this.setData({
          recList: res.data.data
        })
        console.log(this.data.recList)
      },
      fail: (res) => {
        wx.showToast({
          title: '服务器维护中',
          icon: 'error'
        })
      },
      complete: () => {
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    wx.request({
      url: app.globalData.defaultURL + "/wechat/miniprogram/stockAI/recList",
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      data: {
        openid: app.globalData.openid,
      },
      success: (res) => {
        console.log("res", res);
        this.setData({
          recList: res.data.data
        })
        console.log(this.data.recList)
      },
      fail: (res) => {
        wx.showToast({
          title: '服务器维护中',
          icon: 'error'
        })
      },
      complete: () => {

      }
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