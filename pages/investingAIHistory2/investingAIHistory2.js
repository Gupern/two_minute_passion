// pages/investingAI/investingAI.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    strategyId: 0,
    recommendDate: 0,
    recHisDetail: [{
      "name": "暂无数据",
      "d1": "3",
      "d2": "4",
      "d3": "5",
      "d4": "6",
      "d5": "-3",
      "d10": "2",
      "last": "3",
    }]
  },
  //事件处理函数
  bindViewDetail: function (event) {
    let item = event.currentTarget.dataset.item
    wx.navigateTo({
      url: '../investingAIHistory/investingAIHistory?id=' + item.id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    wx.request({
      url: app.globalData.defaultURL + "/wechat/miniprogram/stockAI/recHisDetail",
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      data: {
        strategyId: options.strategyId,
        openid: app.globalData.openid,
        recommendDate: options.recommendDate,
      },
      success: (res) => {
        console.log("res", res);
        let tsRes = res.data.data.tsRes;
        // 按日期升序
        tsRes.sort(function(a, b) {
          return a[1] - b[1];
        });
        console.log(tsRes);
        let buyList = res.data.data.buyList;
        let recHisDetail = [];
        let stock_code;
        let stock_name;
        let stock_code_j;
        let detail = {};
        let index = 0; // 下划线坐标
        let firstDayOpen; // 推荐日的开盘价
        let lastOnePrice = 0; // 最后的开盘价
        let profit_ratio;
        console.log(buyList)
        for (let i = 0; i　< buyList.length; i++) {
          stock_code = buyList[i]['stock_code']
          stock_name = buyList[i]['stock_name']
          detail = {}
          detail['name'] = stock_name + stock_code.split('.')[0];
          console.log(detail)
          index = 0;
          for (let j = 0; j　< tsRes.length; j++) {
            stock_code_j = tsRes[j][0]
            if (stock_code===stock_code_j) {
              if (index===0) {
                firstDayOpen = tsRes[j][2]
                console.log(i, j, stock_code, stock_name, stock_code_j, tsRes[j][1]);
              } else {
                console.log(i, j, stock_code, stock_name, stock_code_j, tsRes[j][1]);
                lastOnePrice = tsRes[j][2]
                profit_ratio = (lastOnePrice-firstDayOpen)/firstDayOpen*100
                detail['d' + index] = profit_ratio.toFixed(1)
              }
              index += 1
            }
          }
          detail['last'] = profit_ratio.toFixed(1)
          recHisDetail.push(detail)
          detail = {}
        }
        this.setData({
          recHisDetail: recHisDetail
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