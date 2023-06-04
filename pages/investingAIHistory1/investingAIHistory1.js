// pages/investingAI/investingAI.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    strategyId: 0,
    recHisList: [
      "暂无数据"
    ]
  },
  //事件处理函数
  bindViewDetail: function (event) {
    let item = event.currentTarget.dataset.item
    wx.navigateTo({
      url: '../investingAIHistory2/investingAIHistory2?strategyId=' + this.data.strategyId + '&recommendDate=' + item
    });
  },
  // refresh
  refresh: function(event) {
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      strategyId: options.strategyId
    })
    wx.request({
      url: app.globalData.defaultURL + "/wechat/miniprogram/stockAI/recHisList",
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      data: {
        strategyId: options.strategyId,
        openid: app.globalData.openid,
      },
      success: (res) => {
        console.log("res", res);
        this.setData({
          recHisList: res.data.data
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '服务器维护中',
          icon: 'error'
        })
      }, complete: () => {
        
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