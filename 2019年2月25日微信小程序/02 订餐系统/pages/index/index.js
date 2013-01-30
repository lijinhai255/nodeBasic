// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount: 0,
    orderListArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 计算中间的高度
    var height = wx.getSystemInfoSync().windowHeight - 66 - 50;

    // 发送请求获取数据
    wx.request({
      url: 'https://localhost:3001/data/list.json',
      success: (res) => {
        // console.log(res);
        var data = res.data.data;
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < data[i].data.length; j++) {
            data[i].data[j].num = +data[i].data[j].num;
          }
        }
        this.setData({
          list: res.data.data,
          height: height
        })
        // console.log(this);
      }
    })
  },
  chooseCategory: function(e) {
    // console.log(e.currentTarget.dataset.target);
    this.setData({
      target: e.currentTarget.dataset.target
    })
  },
  plus: function(e ) {
    // 获取数组 该数组用于装载用户所选的所有产品的信息
    var orderListArr = this.data.orderListArr;
    // 获取组件身上的自定义数据
    var obj = e.currentTarget.dataset;
    // 定义变量 接收分类id
    var categoryID = obj.category;
    // 定义变量 接收产品id
    var productid = obj.productid;
    // 首先 根据分类id找到具体的分类信息
    var categoryObj = this.data.list.find(function(value, index) {
      return value.id === categoryID;
    })
    // 接下来 根据产品id去该分类的数组中查询该产品的信息
    var productObj = categoryObj.data.find(function(value) {
      return value.id === productid;
    })
    // 此时已经确定了产品的信息 接下来就是让自己的订单列表数组中的该项+1
    // 分情况 1 已经有了该产品 我们只是+1
    // 2 还没有该产品 我们将该产品直接放入数组 
    // 判断 是否已经购买过该产品
    var hasOrdered = orderListArr.some(function(value) {
      return value.id === productid;
    });
    if (hasOrdered) {
      orderListArr.find(function(value) {
        return value.id === productid;
      }).num += 1;
    } else {
      productObj.num++;
      orderListArr.push(productObj)
    }
    
    console.log(orderListArr);
    // 此时 订单列表中的内容已经妥善处理
    // 所以我们应该计算总体价格
    var amount = 0;
    orderListArr.forEach(function(value) {
      amount += value.price * value.num
    })
    // 重新设置list 为了保持数据一致性
    this.setData({
      list: this.data.list,
      amount: amount
    })
  },
  minus: function(e) {
    // 获取数组 该数组用于装载用户所选的所有产品的信息
    var orderListArr = this.data.orderListArr;
    // 获取组件身上的自定义数据
    var obj = e.currentTarget.dataset;
    // 定义变量 接收分类id
    var categoryID = obj.category;
    // 定义变量 接收产品id
    var productid = obj.productid;
    // 首先 根据分类id找到具体的分类信息
    var categoryObj = this.data.list.find(function (value, index) {
      return value.id === categoryID;
    })
    // 接下来 根据产品id去该分类的数组中查询该产品的信息
    var productObj = categoryObj.data.find(function (value) {
      return value.id === productid;
    })
    // 此时已经确定了产品的信息 接下来就是让自己的订单列表数组中的该项-1
    orderListArr.find(function (value) {
      return value.id === productid;
    }).num -= 1;
    // 此时 订单列表中的内容已经妥善处理
    // 所以我们应该计算总体价格
    var amount = 0;
    orderListArr.forEach(function (value) {
      amount += value.price * value.num
    })
    // 重新设置list 为了保持数据一致性
    this.setData({
      list: this.data.list,
      amount: amount
    })
  },
  ok: function() {
    // 当用户点击当前按钮时 说明用户已经选择完毕 
    if (this.data.amount === 0) {
      return;
    }
    // 将数据存储到本地对象中 
    wx.setStorage({
      key: 'orderList',
      data: this.data.orderListArr.filter(function(value) {return value.num != 0}),
      success: function() {
        // 跳转到配送页面
        wx.navigateTo({
          url: "/pages/deliver/deliver"
        })
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