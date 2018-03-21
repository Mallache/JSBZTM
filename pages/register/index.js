var util = require('../../utils/util.js');
const SERVER = require('../../utils/leancloud-storage');
var app = getApp();

Page({
  data: {
    showTopTips: false,
    errorMsg: ""
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    });
  },

  formSubmit: function (e) {
    var name = e.detail.value.name;
    var password = e.detail.value.password;
    var subPassword = e.detail.value.subPassword;
    var that = this;
    // 判断账号是否为空和判断该账号名是否被注册  
    if ("" == name.trim()) {
      wx.showToast({
        title: '用户名不能为空',
        image: '../../image/fail.png',
        duration: 2000
      })
      return;
    }
    // 判断密码是否为空  
    if ("" == password.trim()) {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'fail.png',
        duration: 2000
      })
      return;
    } 
    // 两个密码必须一致  
    if (subPassword != password) {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'fail.png',
        duration: 2000
      })
      return;
    }
    //是否有人注册
    new SERVER.Query('UserInfo')
      .equalTo('name', name)      // 查询条件
      .find()
      .then(users => {
        if (users.count==1){
          wx.showToast({
            title: '用户名已经注册',
            icon: 'fail.png',
            duration: 2000
          })
          return;
        }
      })
    // 验证都通过了执行注册方法  
    var UserInfo = SERVER.Object.extend('UserInfo');
    var userInfo = new UserInfo();
    userInfo.set('name', name);
    userInfo.set('password', password);
    wx.getStorage({
      //获取数据的key
      key: 'userInfo',
      success: function (res) {
        console.log(res.data);
        userInfo.set('nickName', res.data.nickName);
        userInfo.set('avatarUrl', res.data.avatarUrl);
        }
      });
    userInfo.save().then(function (userInfo) {
      console.log('保存成功' + userInfo.id);
      wx.showToast({
        title: '保存成功',
        duration: 1500
      })
      wx.navigateBack({
        url: '../dealingTask/index'
      })
    })
  }
})  