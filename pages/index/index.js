// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: '1.01^365=37.8',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    showDialog: false,

    twoMinPassion: "\n",
  },
  
  /**
  * 控制 pop 的打开关闭
  * 该方法作用有2:
  * 1：点击弹窗以外的位置可消失弹窗
  * 2：用到弹出或者关闭弹窗的业务逻辑时都可调用
  */
 toggleDialog() {
  this.setData({
    showDialog: !this.data.showDialog
  });
 },
  // 分享功能
  onShareAppMessage() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: '两分钟热度',
          imageUrl: '/resource/image/1.jpg',
        })
      }, 2000)
    })
    return {
      title: '两分钟热度',
      path: '/page/index',
      promise
    }
  },
  
  onShareTimeline() {
    return {
      title: '两分钟热度',
      query: {
        // key: 'value' //要携带的参数
      },
      imageUrl: '' //分享图,默认小程序的logo
    }
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 点击问号
  bindClickImg() {
    console.log("hasdfasdf")
    this.toggleDialog();
  },
  // 点击“点我”按钮
  bindClickMe() {
    console.log("openid:", app.globalData.openid)
    wx.request({
      url: app.globalData.defaultURL + "/wechat/miniprogram/get_task",
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      data: {
        openid: app.globalData.openid
      },
      success: (res) => {
        console.log("res", res);
        this.setData({
          twoMinPassion: res.data.data
        })
      }
    })
    // 订阅消息
    console.log('123123', app)
    console.log('tmpid', app.globalData.tmplId)
    this.subscribeMessage(app.globalData.tmplId)
  },
  onLoad() {
    let that = this
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
    console.log()
    console.log("index that", that, this.global)
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 订阅消息
  subscribeMessage(tmplId) {
    console.log(tmplId)
    wx.requestSubscribeMessage({
      tmplIds: [tmplId],
      success(res) {
        console.log(res)
        console.log("订阅成功")
      },
      fail(res) {
        console.log(res)
        console.log("订阅失败")
      },
      complete(res) {
        console.log("complete", res)
      }
    })
  }
})