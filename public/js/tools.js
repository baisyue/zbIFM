/**
 * Created by 柏大树 on 2017/3/28.
 */

var tool = {

    //region 给元素挂载位置相关的属性 size(ele)
    size: function(ele){
        ele.h = ele.offsetHeight;
        ele.w = ele.offsetWidth;
        ele.l = ele.offsetLeft;
        ele.t = ele.offsetTop;
        return ele;
    },
    //endregion

    //region 把绝对定位元素定位到容器正中 pos(ele,cont) 省略cont默认容器为container
    pos: function(ele,cont){
        var container = cont||document.querySelector('.container');
        container = tool.size(container);
        ele = tool.size(ele);
        ele.style.left = (container.w-ele.w)/2+'px';
        ele.style.top = (container.h-ele.h)/2+'px';
    },
    //endregion

    //region 为指定元素添加类名 addClass(ele,strClass)
    addClass: function (ele, strClass) {
        var reg = new RegExp("(^| )" + strClass + "( |$)");
        if (!reg.test(ele.className))
            ele.className += " " + strClass;
    },
    //endregion

    //region 移除指定元素的类名 removeClass(ele,strClass)
    removeClass: function (ele, strClass) {
        var reg = new RegExp("(^| )" + strClass + "( |$)", "g");
        ele.className = ele.className.replace(reg, "");
    },
    //endregion

    //region 把节点集合nodeList（类数组）转化为数组 toArray(list)
    toArray: function (list) {
        try {
            return [].slice.call(list, 0);
        } catch (e) {
            var a = [];
            for (var i = 0; i < list.length; i++) {
                a.push(list[i]);
            }
            return a;
        }
    }
    //endregion
};


var container = tool.size(document.querySelector('.container'));
var files = document.querySelectorAll('.file');

var app = {
    zIndex: 0,

    //region 初始化图标位置
    initialize: function(ele1,ele2){
        var add = document.querySelector('.add-btn');
        var files = document.querySelectorAll('.file');
        files = tool.toArray(files);
        files.push(add);
        var h = tool.size(files[0]).h,w=tool.size(files[0]).w; //文件的宽高
        var ch = tool.size(container).h,cw=tool.size(container).w;//容器的宽高
        var rows = parseInt(ch/(h)),cols = parseInt(cw/(w));//行数、列数
        h += (ch%(h))/rows ;
        w += (cw%(w))/cols ;

        for(var i=0;i<files.length;i++){
            var file = files[i];
            file.index = i;
            file.row = i%rows;
            file.col = parseInt(i/rows);
            file.style.top = file.row*h+'px';
            file.style.left = file.col*w+'px';
        }
    },
    //endregion

    //region 图标右键菜单位置
    menuPop: function(ev){
        if(this.right)return;
        ev = ev||window.event;
        var fileMenu = tool.size(document.querySelector('.fileMenu'));
	    var target = ev.target||ev.srcElement;
	    if(ev.button == '2'){//
            if(target.className =='file'||target.parentNode.className =='file'||target.parentNode.parentNode.className =='file'){
                var file = target.className=='file'?target:(target.parentNode&&target.parentNode.className=='file'?target.parentNode:target.parentNode.parentNode);
                fileMenu.index = file.index;
                //console.log(fileMenu.index);
                fileMenu.style.display='block';
                fileMenu.style.zIndex=++app.zIndex;

                var l = ev.clientX,t = ev.clientY;
                var w = tool.size(fileMenu).w,h = tool.size(fileMenu).h;
                if(container.w-l+10 < w&&container.h-t < h-30){
                    fileMenu.style.left = l-w-10+'px';
                    fileMenu.style.top = t-h-40+'px';
                }else if(container.w-l < w&&container.h-t >= h-30){
                    fileMenu.style.left = l-w-10+'px';
                    fileMenu.style.top = t-30+'px';
                }else if(container.w-l >= w&&container.h-t < h-30){
                    fileMenu.style.left = l+10+'px';
                    fileMenu.style.top = t-h-40+'px';
                }else{
                    fileMenu.style.left = l+10+'px';
                    fileMenu.style.top = t-30+'px';
                }
            }else{
                fileMenu.style.display='none';
            }
        }else if(ev.button== '0'&&target.className ==''){
            fileMenu.style.display='none';
        }

    },
    //endregion位置

    //region 点击新建按钮，弹出编辑框
    add: function(){
        if(this.lock)return;
        var config =document.querySelector('.config');
        config.style.display='block';
        tool.pos(config);
        this.lock = true;
    },
    //endregion

    //region 编辑框中，选择接口图标
    icon:function(){
        var pics = ['computer.png','file.png','recycle_full.png','setting.png'];
        var imgs = document.querySelectorAll('.item-img');//待选图标
        var icons = document.querySelectorAll('.item-icon');//单选框
        var curIcon =document.querySelector('.selected-img');
        for(var i=0;i<icons.length;i++){

            imgs[i].style.backgroundImage='url(../public/images/icon/'+pics[i]+')';
            icons[i].index = i;
            icons[i].onchange = function(){
                if (this.checked){
                    curIcon.dataSrc='../public/images/icon/'+pics[this.index];
                    curIcon.style.backgroundImage='url(../public/images/icon/'+pics[this.index]+')';
                }
            }
        }
    },
    //endregion

    //region 检查接口信息
    check: function(){
        return true;
    },
    //endregion

    //region 创建桌面接口图标
    createIcon: function(data){
        var file = document.createElement('div');
        var pic = document.createElement('div');
        var name = document.createElement('div');
        var img = document.createElement('img');
        file.className = 'file';
        pic.className = 'pic';
        name.className = 'name';
        file.data = data;
        file.addr = data.addr;
        img.src = data.imgSrc;
        img.title = data.desc;
        name.innerText = data.name;
        pic.appendChild(img);
        file.appendChild(pic);
        file.appendChild(name);
        container.appendChild(file);
    },
    //endregion

    //region 提交新建接口
    sub: function () {
        if(app.check()){
            var data = {};
            data.name = document.querySelector('.item-name').value;
            data.addr = document.querySelector('.item-addr').value;
            data.desc = document.querySelector('.desc').value;
            data.imgSrc = document.querySelector('.selected-img').dataSrc;
            app.createIcon(data);//创建桌面图标
            app.initialize();//初始化位置
            document.querySelector('.cancel').click();//隐藏编辑框并清空编辑表单
        }
    },
    //endregion

    //region 编辑桌面图标信息
    edit: function(){
        //console.log(1);
        var index = document.querySelector('.fileMenu').index;
        var data = document.querySelectorAll('.file')[index].data;
        console.log(index);
        console.log(data);
        document.querySelector('.item-name').value = data.name;
        document.querySelector('.item-addr').value = data.addr;
        document.querySelector('.desc').value =  data.desc;
        document.querySelector('.selected-img').style.backgroundImage = 'url('+data.imgSrc+')';
        app.add();

    },
    //endregion

    //region 重写alert方法
    alert: function(str){
        document.querySelector('.content').innerText = str;
        document.querySelector('.alertMask').style.display = 'block';
    },
    //endregion
    //region 监听事件
    listen: function(){

        //region 禁止浏览器默认右键菜单
        container.oncontextmenu = function(){
            return false;
        };
        //endregion

        //region 通过事件委托监听右键点击
        document.onmousedown = app.menuPop;
        //endregion

        //region 窗口大小改变时，图标位置改变
        window.onresize=app.initialize;
        //endregion

        //region 点击新建按钮
        document.querySelector('.add-btn').onclick = app.add;
        //endregion

        //region 关闭alert框
        document.querySelector('.confirm').onclick = function(){
            document.querySelector('.alertMask').style.display = 'none';
        };
        //endregion

        //region 取消新建菜单
        document.querySelector('.cancel').onclick = function(){
            document.querySelector('.config').style.display = 'none';
            document.querySelector('.add-btn').lock = false;

        };
        //endregion
        //region 提交新建菜单
        document.querySelector('.ok').onclick = app.sub;
        //endregion


        document.querySelector('.edit').onclick = app.edit;



    }
    //endregion



};

//var file=document.querySelector('.file');

window.onload=function(){
    app.initialize();
    app.listen();
    app.icon();

};

