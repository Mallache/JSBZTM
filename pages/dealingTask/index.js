//获取应用实例
var app = getApp();
const SERVER = require('../../utils/leancloud-storage');


Page({
  data: {
    userInfo: "",
    logined: false,
    tasks: {},
    openId:"",
    scrollTop: 100,
  },

  globalData: {
    userInfo: null,
  },

  //页面初始化start
  onLoad: function () {
   /* if (!this.data.logined){
     /* wx.navigateTo({
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
    })*/
    var user = getApp().globalData.openId
    console.log(user + "onRedy")
    this.setData({
      openId: user
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
      .equalTo('openId',this.data.openId)
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
    wx.showModal({
      title: '提示',
      content: '删除任务',
      success: function (res) {
        if (res.confirm) {
          var taskDel = SERVER.Object.createWithoutData('Task', e.target.id);
          taskDel.destroy().then(function (success) {
            console.log('删除成功')
            // 删除成功

          }, function (error) {
            console.log('删除失败')
            // 删除失败
          });
          console.log('用户点击确定')

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }

    })

  },

  /*onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },*/

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    this.getTaskByUserId();
  }
})
