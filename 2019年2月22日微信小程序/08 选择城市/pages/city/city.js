var city = require("../../modules/city.js");
console.log(city);
// pages/city/city.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseCity: "--",
    hotCity: city.hotCity,
    history: [],
    cityList: city.cityList,
    searchLetter: city.searchLetter,
    type: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 因为设备的原因，每一个设备的高度不同，scroll-view的高度无法定死 
    // 我们需要自适应 所以要先获取设备的高度 再获取固定部分的高度 相减即为scroll-view的高度
    var systemInfo = wx.getSystemInfoSync();
    console.log(systemInfo);
    // 获取视口的高度 减去固定的50px
    var windowHeight = systemInfo.windowHeight;
    var height = windowHeight - 50;
    // 设置到data中去
    this.setData({
      height: height
    })
  },
  chooseLetter: function(e) {
    // 获取当前点击到的字母
    var letter = e.target.dataset.letter;
    this.setData({
      type: letter
    })
  },
  choose: function(e) {
    // 获取用户所选择的城市
    var city = e.currentTarget.dataset.city;
    // 将当前城市放入历史记录
    var history = this.data.history;
    // 先检测city是否已经存在于history中
    if (history.indexOf(city) != -1) {
      // 如果已经存在 就删掉
      history.splice(history.indexOf(city), 1);
    }
    // 不论之前存在还是不存在，当代码执行到这里的时候都已经不存在了
    history.unshift(city);
    // 保证最长12个
    history.length = history.length > 12 ? 12 : history.length;
    // 设置到数据源中
    this.setData({
      chooseCity: city,
      history: history
    })

  },
  scroll: function(e) {
    // 获取当前的手指的位置 并计算对应的字母
    var pageY = e.touches[0].pageY - 50;
    // 计算索引值
    var index = parseInt(pageY / (this.data.height / this.data.searchLetter.length));
    // 当前的字母
    var letter = this.data.searchLetter[index];
    // 当当前的字母与计算得到的字母相同，也就是在同一个字母上滑动触发了多次时。只需要执行第一次即可。后续不需要继续执行设置。
    // 判断当前的字母与data中的字母是否是同一个
    if (letter === this.data.type) {
      console.log("被拦截了", letter);
      return;
    }
    // 设置给type
    this.setData({
      type: letter
    })
  }
})