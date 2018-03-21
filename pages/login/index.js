//获取应用实例
var app = getApp()
const SERVER = require('../../utils/leancloud-storage');
var util = require('../../utils/util.js');

Page({
  data: {
    motto: '欢迎登录',
    userInfo: {},
    userName: '',
    userPassword: '',
    id_token: '',
    responseData: '',
  },
  //登录按钮处理
  bindtapLogin:function(){
    console.log(this.data.userName )
    if (this.data.userName==='') {
      wx.showToast({
        title: '请输入用户名',
        icon: false,
        duration: 2000
      })
      return
    }
    if (this.data.userPassword==='') {
      wx.showToast({
        title: '请输入密码',
        icon: false,
        duration: 2000
      })
      return
    }
    //判断用户是否注册过
    new SERVER.Query('UserInfo')
      .equalTo('name', this.data.userName)      // 查询条件
      .find()
      .then(users => {
        //判定是否已经注册过
        if(users.count===0){
          wx.showToast({
            title: '请先注册',
            icon: false,
            duration: 2000
          })
          return
        }
        if(users.password!=this.data.password){
          wx.showToast({
            title: '密码错误',
            icon: false,
            duration: 2000
          })
          return
        }
        console.log("登录")
        wx.switchTab({
          url:'../dealingTask/index',
          success: function (e) {
            console.log(e)},
            fail:function(e){
              console.log("失败")
            }
        })
        console.log("hh登录")
      })
      .catch(console.error);
 
  },

  //注册按钮
  /*bindtapRegister(){
    wx.navigateTo({
      url: '../register/index',
    })
  },*/
  
  //输入框事件
  bindinputUserName: function (e) {
    this.setData({
      userName: e.detail.value
    })
    console.log(e)
  },
  bindinputPassword: function (e) {
   
    this.setData({
      userPassword: e.detail.value
    })
  },

  onLoad: function () {
    console.log('index is onLoad')
  },
  onShow: function () {
    console.log('index is show')
  },
  onReady: function () {
    console.log('indx is on ready')
  },
  onHide: function () {
    console.log('index is on hide')
  },
  onUnload: function () {
    console.log('indx is on unload')
  },

})