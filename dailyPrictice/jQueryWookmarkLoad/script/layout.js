var cparent = document.getElementsByClassName('container')[0];
var content = [];
var screenMark = document.documentElement || document.body;
var resource = {
    "data": [
        { "src": "1.jpg" },
        { "src": "2.jpg" },
        { "src": "3.jpg" },
        { "src": "4.jpg" },
        { "src": "5.jpg" },
        { "src": "6.jpg" },
        { "src": "7.jpg" },
        { "src": "8.jpg" },
        { "src": "9.jpg" },
        { "src": "10.jpg" }
    ]
};

window.onload = function() {
    init();
    imageAdd();
};

window.onscroll = function() {
    imageAdd();
};
/*初始化布局
	1.确定每一行放置图片的数量cols
	2.确定容器宽度:数量*图片宽度
	3.存储第一排信息
	4.找到最低的，在此位置放置新元素，用新元素信息替换原来的
 */

function imageAdd() {
    if ((document.documentElement.scrollTop || document.body.scrollTop) + (document.documentElement.offsetHeight || document.body.offsetHeight) >= content[0].offsetTop-content[0].offsetHeight-1500) {
        for (var j = 0; j < 5; j++) {
            for (var i = 0, l = resource.data.length; i < l; i++) {
                var box = document.createElement('div');
                box.className = 'box';
                var img_box = document.createElement('div');
                img_box.className = 'img_box';
                var image = document.createElement('img');
                image.src = 'image/' + resource.data[i].src
                img_box.appendChild(image);
                box.appendChild(img_box);
                cparent.appendChild(box);
                putLastImage(box);
            }
        }
    }
}

function init() {
    var all = document.getElementsByClassName('box');
    var cols = Math.floor(screenMark.clientWidth / all[0].offsetWidth);
    cparent.style.width = cols * all[0].offsetWidth + 'px';
    for (var i = 0, l = all.length; i < l; i++) {
        if (i < cols)
            content.push(all[i]);
        else
            putLastImage(all[i]);
    }
}

/*
	找到最低的，在此位置下面放置新元素，用新元素信息替换原来的
 */
function putLastImage(newBox) {
    var min = content[0];
    var index = 0;
    for (var i = 1, l = content.length; i < l; i++) {
        if (content[i].offsetTop + content[i].offsetHeight < min.offsetTop + min.offsetHeight) {
            min = content[i];
            index = i;
        }
    }
    newBox.style.position = 'absolute';
    newBox.style.left = min.offsetLeft + 'px';
    newBox.style.top = min.offsetTop + min.offsetHeight + 'px';
    content[index] = newBox;
}