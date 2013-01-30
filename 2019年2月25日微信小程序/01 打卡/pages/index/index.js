var change = require("../../utils/change.js");
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 116.3831681013,
    latitude: 40.1027401905,
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
  signin: function(){
    // 获取公司经纬度
    var bus_long = this.data.longitude;
    var bus_lait = this.data.latitude;
    // 获取手机位置
    wx.getLocation({
      success: function(res) {
        console.log(res);
        var self_long = res.longitude;
        var self_lati = res.latitude;
        // 转换两者的经纬度成千米数
        var result = change(self_lati, self_long, bus_lait, bus_long);
        console.log(result);
        if (result <= 1000) {
          console.log('打卡成功');
        } else {
          console.log("赶紧来上班")
        }
      },
    })
    
    // 判定 如果小于某个数就认为打卡成功
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