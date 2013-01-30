/*
* Game类
* Food
* Snake
* map
* Block
* */

function Game(map, snake, food, block) {
    this.map = map;
    this.snake = snake;
    this.food = food;
    this.block = block;
    this.timer = null;
    this.flag = null;
    this.init();
}

//游戏初始化方法
Game.prototype.init = function () {
    //渲染地图
    this.renderMap();
    //渲染食物
    this.renderFood();
    //渲染蛇
    this.renderSnake();
    //游戏开始
    // this.start();
    // //绑定按下事件
    // this.bindEvent();
    //渲染障碍物
    this.renderBlock();
};

//渲染地图
Game.prototype.renderMap = function () {
    this.map.fill();
};

//渲染食物
Game.prototype.renderFood = function () {
    //定义变量简化书写
    var row = this.food.row;
    var col = this.food.col;
    this.map.arr[row][col].style.backgroundImage = 'url(' + this.food.img + ')';
    //背景图填充满格子
    this.map.arr[row][col].style.backgroundSize = 'cover';
};

//渲染蛇
Game.prototype.renderSnake = function () {
    // 蛇头
    var head = this.snake.arr[this.snake.arr.length - 1];
    //渲染蛇头图片
    this.map.arr[head.row][head.col].style.backgroundImage = 'url(' + this.snake.head_pic[this.snake.head_idx] + ')';
    //渲染蛇身体图片
    for (var i = 1; i < this.snake.arr.length - 1; i++) {
        var row = this.snake.arr[i].row;
        var col = this.snake.arr[i].col;
        this.map.arr[row][col].style.backgroundImage = 'url(' + this.snake.body_pic[0] + ')';
    }
    // 蛇尾
    var tail = this.snake.arr[0];
    //渲染蛇尾图片
    this.map.arr[tail.row][tail.col].style.backgroundImage = 'url(' + this.snake.tail_pic[this.snake.tail_idx] + ')';
};

//渲染障碍物
Game.prototype.renderBlock = function () {
    for (var i = 0; i < this.block.arr.length; i++) {
        var row = this.block.arr[i].row;
        var col = this.block.arr[i].col;
        this.map.arr[row][col].style.backgroundImage = 'url(' + this.block.img + ')';
        this.map.arr[row][col].style.backgroundSize = 'cover';
    }
};

//游戏开始
Game.prototype.start = function () {
    this.flag = true;
    //缓存this
    var that = this;
    // 开启定时器
    this.timer = setInterval(function () {
        //蛇移动
        that.snake.move();
        //判断是否撞墙
        that.checkMap();
        //判断是否吃到食物
        that.checkFood();
        //判断蛇是否吃到自己
        that.checkSnake();
        //判断蛇是否撞到障碍物
        that.checkBlock();
        if (that.flag) { // 当flag为真时才进行清屏 渲染操作
            //清屏
            that.map.clear();
            //渲染食物
            that.renderFood();
            //渲染蛇
            that.renderSnake();
            //渲染障碍物
            that.renderBlock();
        }
    }, 300)
};

//添加键盘事件
Game.prototype.bindEvent = function () {
    var that = this;

};

//游戏结束
Game.prototype.gameOver = function () {
    //游戏结束关开关
    this.flag = false;
    //清理定时器
    clearInterval(this.timer);
};

//判断是否吃到食物
Game.prototype.checkFood = function () {
    //蛇头
    var head = this.snake.arr[this.snake.arr.length - 1];
    //食物
    var food = this.food;
    //如果蛇头的坐标与食物坐标全等，吃到食物了
    if (head.col === food.col && head.row === food.row) {
        //调用蛇生长的方法
        this.snake.growUp();
        //重置食物
        this.resetFood();
        
    }
};

//重置食物的方法
Game.prototype.resetFood = function () {
    //随机生成新食物的坐标
    var row = parseInt(Math.random() * 20);
    var col = parseInt(Math.random() * 20);

    //判断食物是否重合到蛇身上
    for (var i = 0; i < this.snake.arr.length; i++) {
        // 蛇的某一节身体
        var one = this.snake.arr[i];
        //如果食物与蛇任意一节身体的坐标相等，便重合了
        if (one.row === row && one.col === col) {
            //递归，再次重置食物
            this.resetFood();
            return;
        }
    }
    //判断食物是否重合到障碍物身上
    for (var i = 0; i < this.block.arr.length; i++) {
        var one = this.block.arr[i];
        if (one.row === row && one.col === col) {
            this.resetFood();
            return;
        }
    }
    //将新生成的食物坐标传递给food的reset函数
    this.food.reset(row, col);
};

//判断是否撞墙
Game.prototype.checkMap = function () {
    //蛇头
    var head = this.snake.arr[this.snake.arr.length - 1];
    //将蛇头的坐标与Map地图的坐标范围相比较
    if (head.row < 0 || head.row >= this.map.row || head.col < 0 || head.col >= this.map.col) {
        this.gameOver();
        // alert('东风吹战鼓擂，不撞南墙头不回!!! F5 ==> play again');
    }
};

//判断蛇是否吃到自己
Game.prototype.checkSnake = function () {
    //蛇头
    var head = this.snake.arr[this.snake.arr.length - 1];
    //循环蛇数组
    for (var i = 0; i < this.snake.arr.length - 1; i++) {
        var one = this.snake.arr[i];
        //如果蛇头的坐标与任意一个蛇身体的坐标相同，即吃到自身了
        if (head.row === one.row && head.col === one.col) {
            this.gameOver();
            // alert('连自己都吃？？少侠是位狠人！！ Alt+F4 送你一个大宝贝...');
        }
    }
};

//判断蛇是否碰到障碍物
Game.prototype.checkBlock = function () {
    //蛇头
    var head = this.snake.arr[this.snake.arr.length - 1];
    //循环障碍物数组
    for (var i = 0; i < this.block.arr.length; i++) {
        var one = this.block.arr[i];
        //如果蛇头的坐标与任意一个障碍物的坐标相同，即撞到障碍物了
        if (head.row === one.row && head.col === one.col) {
            this.gameOver();
            // alert('只需体验三分钟，你就会跟我一样爱上这个游戏 F5 ==> play again');
        }
    }
};


