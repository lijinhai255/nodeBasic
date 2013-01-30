/*
* Snake类
* 蛇数组
* 方向
* */

function Snake(pic_obj) {
    //数组，存放蛇的每一节身体
    this.arr = [
        {row: 4, col: 4},
        {row: 4, col: 5},
        {row: 4, col: 6}
    ];
    //方向属性，默认向右
    this.direction = 39; // left 37  top 38 right 39 bottom 40
    //锁
    this.lock = true;
    //定义蛇头部图片的属性
    this.head_pic = pic_obj.head_pic;
    //定义蛇身体部图片的属性
    this.body_pic = pic_obj.body_pic;
    //定义蛇尾部图片的属性
    this.tail_pic = pic_obj.tail_pic;
    //定义蛇头部索引
    this.head_idx = 2;
    //定义蛇尾巴索引
    this.tail_idx = 0;
}

//蛇的移动方法
Snake.prototype.move = function () {
    //创建新的头部
    var newHead = {
        row: this.arr[this.arr.length - 1].row,
        col: this.arr[this.arr.length - 1].col
    };
    //判定方向，决定新头出现的位置
    if (this.direction === 37) {
        newHead.col--;
    } else if (this.direction === 38) {
        newHead.row--;
    } else if (this.direction === 39) {
        newHead.col++;
    } else if (this.direction === 40) {
        newHead.row++;
    }
    //将新的头部放入数组最后一项
    this.arr.push(newHead);
    //删除尾部，即数组第一项
    this.arr.shift();
    //开锁
    this.lock = true;

    //蛇尾巴
    var tail = this.arr[0];
    //蛇尾巴前一个元素 ==> 蛇屁股
    var pg = this.arr[1];
    //判断蛇尾巴与蛇屁股的位置改变蛇尾巴的图片（方向）
    if (tail.row === pg.row) {
        this.tail_idx = tail.col > pg.col ? 2 : 0;
    } else {
        this.tail_idx = tail.row > pg.row ? 3 : 1;
    }

};

// 蛇转向方法
Snake.prototype.change = function (direction) {
    //函数节流
    if (!this.lock) {
        return;
    }
    this.lock = false;
    // 当用户传递的方向与蛇自身方向向背时，没有任何操作直接return
    var result = Math.abs(direction - this.direction);
    if (result === 2 || result === 0) {
        return;
    } else {
        //将用户传递的方向赋值给当前蛇的方向
        this.direction = direction;
    }
    //判断方向，来改变蛇头的背景图片
    if (direction === 37) {
        this.head_idx = 0;
    } else if (direction === 38) {
        this.head_idx = 1;
    } else if (direction === 39) {
        this.head_idx = 2;
    } else if (direction === 40) {
        this.head_idx = 3;
    }

};
// 蛇吃到食物生长的方法
Snake.prototype.growUp = function () {
    var tail = this.arr[0];
    //将尾巴插入到蛇数组的第一项
    this.arr.unshift(tail);
};
