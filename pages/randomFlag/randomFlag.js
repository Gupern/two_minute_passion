// randomFlag.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    motto: '1.01^365=37.8',
    userInfo: {},
    hasUserInfo: false,
    showDialog: false,
    twoMinPassion: "\n",
    taskId: "",
    hasTaskId: false,
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
  // 点击问号
  bindClickImg() {
    console.log("hasdfasdf")
    this.toggleDialog();
  },
  // 点击“点我”按钮
  bindClickMe() {
    console.log("openid:", app.globalData.openid)
    // 在“点我”时，需清空taskId，以随机获取
    this.setData({
      taskId: ""
    })
    this.setTwoMinutePassionByOpenidAndTaskId();
    // 订阅消息
    console.log('123123', app)
    console.log('tmpid', app.globalData.tmplId)
    this.subscribeMessage(app.globalData.tmplId)
  },
  // 点击“已完成”按钮
  finishTask() {
    wx.request({
      url: app.globalData.defaultURL + "/wechat/miniprogram/finish_task",
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      data: {
        openid: app.globalData.openid,
        taskId: this.data.taskId
      },
      success: (res) => {
        console.log("res", res);
        this.setData({
          twoMinPassion: res.data.data.task,
          taskId: res.data.data.id
        })
        wx.showToast({
          title: '离大师又近了！',
        })
      }
    })
    // 订阅消息
    this.subscribeMessage(app.globalData.tmplId)
  },
  // 点击“换一个”按钮
  changeTask() {
    wx.request({
      url: app.globalData.defaultURL + "/wechat/miniprogram/change_task",
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      data: {
        openid: app.globalData.openid,
        taskId: this.data.taskId
      },
      success: (res) => {
        console.log("res", res);
        this.setData({
          twoMinPassion: res.data.data.task,
          taskId: res.data.data.id
        })
        wx.showToast({
          title: '要加油哦',
        })
      }
    })
    // 订阅消息
    this.subscribeMessage(app.globalData.tmplId)
  },
  onLoad(option) {
    let that = this
    console.log("index that", that, that.global)
    console.log("option", option)
    console.log("globalData", app.globalData)
    app.globalData.openid = option.openid
    // 如果url中有taskId，则说明是从订阅消息中打开的，则设置该taskId
    if (option.taskId) {
      that.setData({
        taskId: option.taskId,
        hasTaskId: true
      })
      that.setTwoMinutePassionByOpenidAndTaskId()
      console.log(that.data.hasTaskId)
    }
  },



  // 请求接口，获取任务
  setTwoMinutePassionByOpenidAndTaskId() {
    console.log("this.taskId", this.data.taskId)
    wx.request({
      url: app.globalData.defaultURL + "/wechat/miniprogram/get_task",
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      data: {
        openid: app.globalData.openid,
        taskId: this.data.taskId
      },
      success: (res) => {
        console.log("res", res);
        this.setData({
          twoMinPassion: res.data.data.task,
          taskId: res.data.data.id,
          hasTaskId: true
        })
      }
    })
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，
    // 开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    console.log("getUserProfile")
    wx.getUserProfile({
      desc: '用于展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
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
  },
})