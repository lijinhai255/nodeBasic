// pages/deliver/deliver.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  chooseOtherAddress: function() {
    wx.chooseAddress({
      success: (res) => {
        var addressStr = res.provinceName + res.cityName + res.countyName + res.detailInfo + res.userName + "收";
        this.setData({
          addressStr
        })
      }
    })
  },
  chooseNewAddress: function() {
    wx.chooseLocation({
      success: (res) => {
        console.log(res);
        var addressStr = res.address
        this.setData({
          addressStr
        })
      }
    })
  },
  pay: function() {
    // wx.requestPayment({
    //   timeStamp: '',
    //   nonceStr: '',
    //   package: '',
    //   signType: '',
    //   paySign: '',
    // })

    console.log("付款成功，跳转到订单列表页面");

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getphonenumber: function(e) {
    this.setData({
      phoneNumber: 12345678901
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
    // 从本地存储中获取数据
    var orderList = wx.getStorageSync("orderList");
    var amount = 0;
    orderList.forEach(function(value) {
      amount += value.price * value.num;
    })
    // 设置到data中
    this.setData({
      orderList,
      amount
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