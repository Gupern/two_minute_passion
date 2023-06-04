// pages/investingAI.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shares: 0,
    amount: 0,
    profit: 0,
    zeroShares: 0,
    displayTable: 1, // 1份额运营表，2操作盈亏表，3基金记录表
    sharesRunningList: {},
    operationProfitList: {},
    fundRecordList: [],
    sharesRunningData: [],
    operationProfitData: [],
    isShowInput: false, //控制输入框

  },

  //点击出现输入框
  showInput: function () {
    this.setData({
      isShowInput: true
    })
  },

  //隐藏输入框
  hideInput: function () {
    this.setData({
      isShowInput: false
    })
    console.log(this.data);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.queryFundInfo()
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

  },

  // 切换表格1
  displayTable1() {
    this.setData({
      displayTable: 1
    })
  },
  // 切换表格2
  displayTable2() {
    this.setData({
      displayTable: 2
    })
  },
  // 切换表格3
  displayTable3() {
    this.setData({
      displayTable: 3
    })
  },
  // 更新基金记录表
  updateFundRecord(e) {
    console.log('form发生了submit事件，携带数据为：', e)
    // TODO 向后台发起请求，添加任务
    wx.request({
      url: app.globalData.defaultURL + "/wechat/miniprogram/updateFundRecord",
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      data: {
        id: e.detail.value.id,
        openid: app.globalData.openid,
        operationTime: e.detail.value.operationTime,
        amount: e.detail.value.amount,
        unv: e.detail.value.unv,
        shares: e.detail.value.shares,
        operation: e.detail.value.operation,
      },
      success: (res) => {
        console.log("updateFundRecord res", res);
        wx.showToast({
          title: '成功',
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '服务器维护中',
          icon: 'error'
        })
      },      complete: () => {
        this.queryFundInfo();
      }
    })
  },
  // 删除基金记录表
  deleteFundRecord: function (e) {
    console.log(e.currentTarget.dataset["id"]);
    wx.request({
      url: app.globalData.defaultURL + "/wechat/miniprogram/deleteFundRecord",
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      data: {
        id: e.currentTarget.dataset["id"],
        openid: app.globalData.openid,
      },
      success: (res) => {
        console.log("updateFundRecord res", res);
        wx.showToast({
          title: '成功',
        });
        // TODO 删除成功后重新请求所有数据接口

      },
      fail: (res) => {
        wx.showToast({
          title: '服务器维护中',
          icon: 'error'
        })
      },      complete: () => {
        this.queryFundInfo();
      }
    })
  },
  // 获取全部信息接口
  queryFundInfo() {
    // 获取基金信息
    wx.request({
      url: app.globalData.defaultURL + "/wechat/miniprogram/queryFundInfo",
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      data: {
        openid: app.globalData.openid
      },
      success: (res) => {
        console.log("queryFundInfo res", res);
        // 解析数据
        this.setData({
          shares: res.data.data.shares,
          amount: res.data.data.amount,
          profit: res.data.data.profit,
          zeroShares: res.data.data.zeroShares,
          fundRecordList: res.data.data.fundRecordList,
          operationProfitList: res.data.data.operationProfitList,
          sharesRunningList: res.data.data.sharesRunningList
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '服务器维护中',
          icon: 'error'
        })
      },
    })
  },
  // 更新操作盈亏表
  updateOperationProfit(e) {
    console.log('form发生了submit事件，携带数据为：', e)
    // TODO 向后台发起请求，添加任务
    wx.request({
      url: app.globalData.defaultURL + "/wechat/miniprogram/updateOperationProfit",
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      data: {
        id: e.detail.value.id,
        openid: app.globalData.openid,
        operationTime: e.detail.value.operationTime,
        unv: e.detail.value.unv,
        unvSold: e.detail.value.unvSold,
        shares: e.detail.value.shares,
        profit: e.detail.value.profit,
      },
      success: (res) => {
        console.log("updateFundRecord res", res);
        wx.showToast({
          title: '成功',
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '服务器维护中',
          icon: 'error'
        })
      },
      complete: () => {
        this.queryFundInfo();
      }
    })
  },
  // 删除操作盈亏表
  deleteOperationProfit: function (e) {
    console.log(e.currentTarget.dataset["id"]);
    wx.request({
      url: app.globalData.defaultURL + "/wechat/miniprogram/deleteOperationProfit",
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      data: {
        id: e.currentTarget.dataset["id"],
        openid: app.globalData.openid,
      },
      success: (res) => {
        console.log("updateFundRecord res", res);
        wx.showToast({
          title: '成功',
        });
        // TODO 删除成功后重新请求所有数据接口

      },
      fail: (res) => {
        wx.showToast({
          title: '服务器维护中',
          icon: 'error'
        })
      },
      complete: () => {
        this.queryFundInfo();
      }
    })
  },
  // 更新份额运营表
  updateSharesRunning(e) {
    console.log('form发生了submit事件，携带数据为：', e)
    // TODO 向后台发起请求，添加任务
    wx.request({
      url: app.globalData.defaultURL + "/wechat/miniprogram/updateSharesRunning",
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      data: {
        id: e.detail.value.id,
        openid: app.globalData.openid,
        operationTime: e.detail.value.operationTime,
        unv: e.detail.value.unv,
        unvSold: e.detail.value.unvSold,
        shares: e.detail.value.shares,
        profit: e.detail.value.profit,
      },
      success: (res) => {
        console.log("updateSharesRunning res", res);
        wx.showToast({
          title: '成功',
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '服务器维护中',
          icon: 'error'
        })
      },      complete: () => {
        this.queryFundInfo();
      }
    })
  },
  // 删除份额运营表
  deleteSharesRunning: function (e) {
    console.log(e.currentTarget.dataset["id"]);
    wx.request({
      url: app.globalData.defaultURL + "/wechat/miniprogram/deleteSharesRunning",
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      data: {
        id: e.currentTarget.dataset["id"],
        openid: app.globalData.openid,
      },
      success: (res) => {
        console.log("deleteSharesRunning res", res);
        wx.showToast({
          title: '成功',
        });
        // TODO 删除成功后重新请求所有数据接口

      },
      fail: (res) => {
        wx.showToast({
          title: '服务器维护中',
          icon: 'error'
        })
      },      complete: () => {
        this.queryFundInfo();
      }
    })
  },


})