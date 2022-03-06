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
    choices: [ // 10个字以内
      "俯卧撑5个",
      "拉伸1分钟",
      "看一篇琴艺文章",
      "看一篇戒烟文章",
      "看一篇围棋文章",
      "看一篇开发文章",
      "喝口水",
      "双眼放空10秒",
      "自我暗示我是最帅的",
      "自我暗示我会发财",
      "防久坐：站起来5秒",
      "夸一夸人",
      "再来一次",
      "写一行代码",
    ],
    twoMinPassion: "\n",
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
  bindClickMe() {
    console.log(this.data.choices);
    let index = Math.floor((Math.random() * this.data.choices.length));
    let twoMinPassion = this.data.choices[index];
    this.setData({
      twoMinPassion: twoMinPassion
    })
        // 订阅消息
        console.log('123123',app)
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