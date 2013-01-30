/*
* Block类
* 数组
* */

function Block(img) {
    //数组存储障碍物
    this.arr = [
        {row: 7, col:6},
        {row: 7, col:7},
        {row: 7, col:8},
        {row: 7, col:9},
        {row: 7, col:10},
        {row: 7, col:11},
        {row: 7, col:12},
        {row: 6, col:9},
        {row: 8, col:9},
        {row: 9, col:9},
        {row: 10, col:9},
        {row: 11, col:8},
        {row: 12, col:7},
        {row: 11, col:10},
        {row: 12, col:11}
    ];
    this.img = img;
}