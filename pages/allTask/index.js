// page/allTask/index.js
var app = getApp();
const SERVER = require('../../utils/leancloud-storage');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
      new SERVER.Query('Task')
        .descending('createdAt')
        .find()
        .then(tasks => {
          this.setData({ tasks });
          console.log(tasks);
        })
        .catch(console.error);

        
    },
  
  
  //长按任务名删除
  bindtapDel: function (e) {
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