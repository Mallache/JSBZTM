//获取应用实例
var app = getApp();
const SERVER = require('../../utils/leancloud-storage');


Page({
  data: {
    userInfo: "",
    logined: false,
    tasks: {},
  },

  globalData: {
    userInfo: null,
  },

  //页面初始化start
  onLoad: function () {
    if (!this.data.logined){
      wx.navigateTo({
        url: '../login/index'
      })
    }
    this.getLoginUserInfor();
    if (!this.data.userInfo) {
      this.getLoginUserInfor();
    }
    
    wx.setStorage({
      key: 'userInfo',
      data: this.data.userInfo,
    })
  },//页面初始化end

  //获取登录信息
  getLoginUserInfor: function () {
    //
    if(this.data.logined) return;

  },

  //页面加载完
  onReady: function () {
    //this.getTaskByUserId();
  },

  //查询用户待处理的任务
  getTaskByUserId: function () {
    new SERVER.Query('Task')
      //.equalTo('useName',"XXX")
      .descending('createdAt')
      .find()
      .then(tasks => {
        this.setData({ tasks });
        console.log(tasks);
      })
      .catch(console.error);
  },

  bindCreatBtnTap: function () {
    wx.navigateTo({
      url: '../task/create/create'
    })
  },

//长按任务名删除
  bindtapDel:function(e){
    console.log(e);

  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    this.getTaskByUserId();
  }
})
