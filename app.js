const SERVER = require('./utils/leancloud-storage');

SERVER.init({
  appId: 'bKhslx0xHAQFLIJbYl8XAQ3X-gzGzoHsz',
  appKey: 'f6TdxHPLqegnJBsdINgxUoBz',
});

App({
  onLaunch: function () {
    this.getUserInfo();
  },
  /*getUserInfo: function () {
    var that = this; 
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo; 
              wx.setStorage({
                key: 'userInfo',
                data: res.userInfo,
              })
              console.log(res.userInfo);
             
            }
          });
        }else{

        }
      }*/

  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口  
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      

    })
    }
  },

  globalData: {
    openId: null,
    userInfo: null,
  },

})