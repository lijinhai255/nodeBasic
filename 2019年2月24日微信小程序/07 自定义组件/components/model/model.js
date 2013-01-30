Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 这是一个对象 该对象的key 就是自定义组件的属性名 
    hello: {
      // 值
      value: true,
      // 值的类型
      type: "boolean",
      // 当该值发生变化时 执行的函数
      observer: function() {
        console.log("该值发生变化了");

      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    username: "wanglaowuchongya"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click: function() {
      console.log("宝刀屠龙，点击就送");
      this.triggerEvent("tulong",  213123, 123);
    }
  }
})
