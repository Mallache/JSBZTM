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
    var taskQuery = new SERVER.Query('Task');
    taskQuery
      .equalTo('name', taskName)
      .descending('createdAt')
      .find()
      .then((task) =>{
        wx.showToast({
          title: '对不起，您已经创建过' + task.name,
          duration: 1500
        })
      });
    var Task = SERVER.Object.extend('Task');
        var task = new Task();
        //task.set("userId", SERVER.User.current().id);
        task.set('name', taskName);
        task.set('describe', this.data.taskDescribe);
        task.set('respPerson', this.data.taskRespPerson);
        task.set('planComplTime', this.data.taskPlanComplTime);
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
      },

      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: function () {

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