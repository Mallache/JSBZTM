const SERVER = require('./utils/leancloud-storage');

SERVER.init({
  appId: 'bKhslx0xHAQFLIJbYl8XAQ3X-gzGzoHsz',
  appKey: 'f6TdxHPLqegnJBsdINgxUoBz',
});

App({
  onLaunch: function () {
    this.getUserInfo();
  },
  getUserInfo: function () {
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.getUserInfo({
            success: function (res) {
              wx.setStorage({
                key: 'userInfo',
                data: res.userInfo,
              })
              console.log(res.userInfo);
            }
          });
        }else{

        }
      }

    })

  },
  globalData: {
    openId: null,

  },

})