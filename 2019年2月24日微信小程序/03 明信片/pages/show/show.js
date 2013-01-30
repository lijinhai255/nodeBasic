// pages/show/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {
      nickname: "--",
      job: "--",
      phoneNumber: "--",
      office: "--",
      address: "--",
      email: "--",
      blog: "--",
      intro: "--",
      tail: "--"
    }
  },
  editCard: function() {
    // 跳转到编辑页面
    wx.navigateTo({
      url: '/pages/edit/edit',
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
    // 在show页面中显示本地对象中的内容
    var cardObj = wx.getStorageSync("cardObj") || {};
    // 设置tail属性
    cardObj.tail = cardObj.nickname ? cardObj.nickname.slice(-2) : "";
    // 将cardObj设置为本页面的数据源info对象
    this.setData({
      info: cardObj
    })
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