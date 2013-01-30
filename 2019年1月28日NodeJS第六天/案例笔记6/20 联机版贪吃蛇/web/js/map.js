/*
* map类
* row
* col
* width
* height
* */

function Map(dom, row, col, width, height) {
    this.row = row;
    this.col = col;
    this.width = width;
    this.height = height;
    // 地图元素dom
    this.dom = dom;
    // 映射元素的数组
    this.arr = [];
}

//地图填充出现方法
Map.prototype.fill = function () {
    //行
    for (var i = 0; i < this.row; i++) {
        var row_dom = document.createElement('div');
        //行数组
        var row_arr = [];
        row_dom.className = 'row';
        //列
        for (var j = 0; j < this.col; j++) {
            var col_dom = document.createElement('span');
            col_dom.className = 'grid';
            //将列加入到行中
            row_dom.appendChild(col_dom);
            row_arr.push(col_dom);
        }
        this.dom.appendChild(row_dom);
        //将行数组放入新数组中
        this.arr.push(row_arr);
        //设置dom元素的样式属性
        this.dom.className = 'map';
    }
};

// 清屏方法
Map.prototype.clear = function () {
    for (var i = 0; i < this.arr.length; i++) {
        for (var j = 0; j < this.arr[i].length; j++) {
            this.arr[i][j].style.backgroundImage = 'none';
        }
    }
};