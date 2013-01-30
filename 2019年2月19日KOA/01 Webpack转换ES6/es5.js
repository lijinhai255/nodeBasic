// 定义了一个立即执行函数 _createClass是该函数的返回值
var _createClass = (function () { 
	// target 目标 
	// props 属性集合
	function defineProperties(target, props) { 
		// 开始循环 循环props 
		for (var i = 0; i < props.length; i++) { 
			// 获取其中的一项
			var descriptor = props[i]; 
			// 适配当前项的特性
			descriptor.enumerable = descriptor.enumerable || false; 
			descriptor.configurable = true; 
			if ("value" in descriptor) descriptor.writable = true; 
			Object.defineProperty(target, descriptor.key, descriptor); 
		} 
	} 
	// Constructor 构造函数
	// protoProps 原型属性集合
	// staticProps 静态属性集合
	return function (Constructor, protoProps, staticProps) { 
		if (protoProps) defineProperties(Constructor.prototype, protoProps); 
		if (staticProps) defineProperties(Constructor, staticProps); 
		return Constructor; 
	}; 
})();



function _possibleConstructorReturn(self, call) { 
	if (!self) { 
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); 
	} 
	return call && (typeof call === "object" || typeof call === "function") ? call : self; 
}

// subClass 子类
// superClass 父类
// _inherits 继承
function _inherits(subClass, superClass) { 
	// 检测父类是否是函数 或者是 null
	if (typeof superClass !== "function" && superClass !== null) { 
		// 只有null和函数可以当父类
		throw new TypeError("Super expression must either be null or a function, not"  + typeof superClass); 
	} 
	// 将子类的原型指向了根据父类的实例创建出来的一个新对象 并补回了constructor属性
	subClass.prototype = Object.create(superClass && superClass.prototype, { 
		constructor: { 
			value: subClass, 
			enumerable: false, 
			writable: true, 
			configurable: true 
		} 
	}); 
	// 判断 如果superClass存在
	if (superClass) {
		if (Object.setPrototypeOf) {
			Object.setPrototypeOf(subClass, superClass) 
		} else {
			subClass.__proto__ = superClass;
		}
	}
}


// 检测外部的调用方式 
function _classCallCheck(instance, Constructor) { 
	if (!(instance instanceof Constructor)) { 
		throw new TypeError("Cannot call a class as a function"); 
	} 
}

// 定义了一个People
var People = (function () {
	function People(name, age, sex) {
		_classCallCheck(this, People);
		this.name = name;
		this.age = age;
		this.sex = sex;
	}
	_createClass(People, 
		[{
			key: "sayHello",
			value: function sayHello() {
				console.log("sayHello");
			}
		},
		{
			key: "getName",
			get: function get() {
				return this.name;
			}
		}, {
			key: "setName",
			set: function set(value) {
				this.name = value;
			}
		}], 
		[{
			key: "hi",
			value: function hi() {
				console.log("你好我是" + this.name);
			}
		}]);
	return People;
})();
var Student = function (_People) {
	_inherits(Student, _People);
	function Student(name, age, sex, grade) {
		_classCallCheck(this, Student);
		var _this = _possibleConstructorReturn(this, (Student.__proto__ || Object.getPrototypeOf(Student)).call(this, name, age, sex));
		_this.grade = grade;
		return _this;
	}
	_createClass(Student, [{key: "intro",value: function intro() {console.log("我是Student的实例，我的名字是" + this.name);}}]);
	return Student;
}(People);



var s = new Student("小明", 12, "男", 6);
s.sayHello();
s.intro();
