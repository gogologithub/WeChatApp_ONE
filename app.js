//app.js
let {
  requestData
} = require("./utils/util.js");
App({
  onLaunch: function() {
    // // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    if (this.debug) {
      this.globalData.domain = 'http://192.168.0.241:8181';
    }
  },
  debug: false,
  globalData: {
    domain: 'https://one.mrabit.com'
  },
  login() {
    // 登录
    return new Promise(resolve => {
      wx.login({
        success: res => {
          requestData('/api/wx/jsoncode2session', {
            js_code: res.code
          }).then(d => {
            var OPEN_ID = d.openid; //获取到的openid
            var SESSION_KEY = d.session_key; //获取到session_key
            resolve({
              OPEN_ID,
              SESSION_KEY
            })
          })
        }
      })
    })
  }
})