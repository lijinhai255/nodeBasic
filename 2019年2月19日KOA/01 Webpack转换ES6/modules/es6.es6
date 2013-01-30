class People {
	constructor (name, age, sex) {
		this.name = name;
		this.age = age;
		this.sex = sex;
	}

	sayHello() {
		console.log("sayHello");
	}

	static hi() {
		console.log("你好我是" + this.name);
	}

	get getName() {
		return this.name;
	}
	set setName(value) {
		this.name = value;
	}
}

class Student extends People {
	constructor(name, age, sex, grade) {
		super(name, age, sex);
		this.grade = grade;
	}
	intro() {
		console.log("我是Student的实例，我的名字是" + this.name);
	}
}

var s = new Student("小明", 12, "男", 6);
s.sayHello();
s.intro();