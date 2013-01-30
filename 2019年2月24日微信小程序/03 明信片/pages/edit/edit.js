// pages/edit/edit.js
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

  },
  tijiao: function(e) {
    // 获取表单中的数据 并放入本地存储对象
    wx.setStorageSync("cardObj", e.detail.value)
    // 关闭当前页面 并跳转到原先的页面
    wx.navigateBack();
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
    // 在show页面中显示本地对象中的内容
    var cardObj = wx.getStorageSync("cardObj") || {};
    // 设置tail属性
    cardObj.tail = cardObj.nickname ? cardObj.nickname.slice(-2) : "";
    // 将cardObj设置为本页面的数据源info对象
    setTimeout(() => {
      console.log(123);
      this.setData({
        info: cardObj
      })
    }, 5000);
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
    console.log("卸载");
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