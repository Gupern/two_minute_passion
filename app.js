// app.js

// 引入环境配置管理文件
const config = require('./projectConfig')

App({
  onLaunch() {
    // 获取本地配置信息
    console.log("APP.js 目前的配置信息为: ", config)
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)




    let that = this;
    
    // 进行登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: config.defaultURL + config.getSession,
          method: "POST",
          header: {"Content-Type": "application/json"},
          data: {
            code: res.code //将code值传入php中
          },
          success: function (result) {
            console.log(result); //传入成功code值返回过来
            var res = result.data
            that.globalData.openid = res.openid
            that.globalData.session_key = res.session_key

            typeof cb == "function" && cb(that.globalData.openid);
            typeof cb == "function" && cb(that.globalData.session_key);
            console.log(that);
          }
        })
      },              
      fail(res) {
        console.log(res)
        wx.showToast({
          title: '登录失败',
          icon: 'error'
        })
      },
      complete(res) {
        console.log(res)
      }
    })
  },

  // 获取openid
  getOpenId: function (cb) {
    let that = this
    if (this.globalData.openid) {
      typeof cb == "function" && cb(this.globalData.openid)
    } else {
      wx.login({
        success: function (res) {
          // console.log(res.code);//(1) 如果登录成功打印code值
          if (res.code) {
            //发起网络请求
            wx.request({
              url: config.defaultURL + config.getSession,
              data: {
                code: res.code //将code值传入php中
              },
              success: function (result) {
                console.log(result); //传入成功code值返回过来
                var res = result.data
                that.globalData.openid = res.openid
                that.globalData.session_key = res.session_key

                typeof cb == "function" && cb(that.globalData.openid);
                typeof cb == "function" && cb(that.globalData.session_key);
              },
              fail(res) {
                console.log(res)
                wx.showToast({
                  title: '登录失败',
                })
              },
              complete(res) {
                console.log(res)
                wx.showToast({
                  title: '登录失败',
                  icon: 'error'
                })
              }
            })
          } else {
            conso1e.log('获取用户登录态失败!' + res.errMsg)
          }
        }
      });
    }
  },



  // 全局参数
  globalData: {
    userInfo: null,
    ...config
  }
})