// pages/task/index.js
//获取应用实例
var app = getApp();
const SERVER = require('../../../utils/leancloud-storage');
const { User } = require('../../../utils/leancloud-storage');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskName: "",
    taskDescribe: "",
    taskRespPerson: "",
    taskPlanComplTime: "",
    openId: "",
  },

  //任务名输入框触发事件
  bindInputTaskname: function (e) {
    this.setData({
      taskName: e.detail.value,
    })
  },

  //描述输入框触发事件
  bindTextAreaDescribe: function (e) {
    this.setData({
      taskDescribe: e.detail.value,
    })
  },
  //负责人输入框触发事件
  bindInputRespPerson: function (e) {
    this.setData({
      taskRespPerson: e.detail.value,
    })
  },
  //计划完成时间输入框触发事件
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      taskPlanComplTime: e.detail.value
    })
  },
  


  bindConformBtn: function () {


    var taskName = this.data.taskName;

    
    console.log(this.data.openId+"openId");

    var Task = SERVER.Object.extend('Task');
    var task = new Task();
    //task.set("userId", SERVER.User.current().id);
    task.set('name', taskName);
    task.set('describe', this.data.taskDescribe);
    console.log(this.data.taskRespPerson);
    task.set('respPerson', this.data.taskRespPerson);
    console.log(this.data.taskPlanComplTime);
    task.set('planComplTime', this.data.taskPlanComplTime);
    console.log(this.data.openId);
    task.set('openId', this.data.openId);

    task.save().then(function (task) {
      console.log('保存成功' + task.id);
      wx.showToast({
        title: '保存成功',
        duration: 1500
      })
      wx.navigateBack({
        url: '../dealingTask/index'
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('index is onLoad')
    var user = SERVER.User.current();
    // 调用小程序 API，得到用户信息
    wx.getUserInfo({
      success: ({ userInfo }) => {
        // 更新当前用户的信息
        user.set(userInfo).save().then(user => {
          // 成功，此时可在控制台中看到更新后的用户信息
          this.setData({
            openId: user.toJSON().authData.lc_weapp.openid
          })
          console.log(user.toJSON().username);
          console.log(user.toJSON().nickName);

        }).catch(console.error);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var user=getApp().globalData.openId
    console.log(user+"onRedy")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})