// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    direction: "--",
    angle: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arr  = ["正北", "东北", "正东", "东南", "正南", "西南", "正西", "西北"];
    wx.onCompassChange(function(res){
      // 获取当前的手机角度
      // 设置到data中
      this.setData({
        angle: res.direction,
        // direction: 
      })
      // 该值决定图片的旋转角度

    }.bind(this));
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