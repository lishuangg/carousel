function Banner(options){
    var $box = $('#box');
    var html =  $('<div class="slider" id="slider"></div>'
                +'<span id="left"><</span>'
                +'<span id="right">></span>'
                +'<ul class="nav" id="navs"></ul>');
    $box.append(html);
    var $slider = $('#slider');
    var $navs = $('#navs');
    var $left = $('#left');
    var $right = $('#right');
    var slide,li;
    var index = 1;
    var timer;
    var isMoving = false;

    this.show = function(options){
        //添加元素
        var img = options.img;
        var len = img.length;
        var num = len+2;
        img.unshift(img[len-1]);
        img.push(img[1]);
        for(var i=0; i<num; i++){
            slide= $(`<div class="slide"><img src="${img[i]}" alt=""></div>`);
            $slider.append(slide);
        }
        for(var i=0; i<len; i++){
            if(i == 0) 
                li = $(`<li class="active">${i+1}</li>`);
            else
                li = $(`<li>${i+1}</li>`);
            $navs.append(li);
        }
        var $navli = $("#navs > li");

        timer = setInterval(next,2000);

        //鼠标滑动时的左右箭头
        $box.mouseover(function(){
            $('span').css('opacity','0.5');
            clearInterval(timer)
        })
        $box.mouseleave(function(){
            $('span').css('opacity','0');
            timer = setInterval(next, 3000);
        })
        //点击某一页
        $navli.click(function(event){
            var index=event.target.innerHTML;
            navmove(index);
            // $slider.css('left','-2400px');
            animate($slider,{left:-1200*index});
            console.log(-1200*index);
        });
        //点击上一页
        $left.click(function(){
            if(isMoving){
                return;
            }
            isMoving = true;
            index--;
            console.log(index);
            navmove(index==0?len:index);
            animate($slider,{left:-1200*index},function(){
                if(index == 0){
                    index = len;
                    $slider.css('left',(-1200)*index+'px');
                }
                isMoving = false;
            });
        })
        //点击下一页
        $right.click(next);
        function next(){
            if(isMoving){
                return;
            }
            isMoving = true;
            index++;
            navmove(index==len+1?1:index);
            animate($slider,{left:-1200*index},function(){
                if(index == len+1){
                    $slider.css('left','-1200px');
                    index = 1;
                }
                isMoving = false;
            });
        }
        //换页
        function navmove(idx){
            for(var i=0; i<len; i++){
                $navli[i].className = "";
            }
            $navli[idx-1].className = "active";
        }
        //图片的滑动
        function animate(obj,json,callback){
            clearInterval(obj.timer);
            obj.timer = setInterval(function(){
                var isStop = true;
                for(var attr in json){
                    var now = parseInt(obj.css(attr));
                    var speed = (json[attr] - now) / 10;
                    speed = speed>0?Math.ceil(speed):Math.floor(speed);
                    var cur = now + speed;
                    obj.css(attr,cur+'px');
                    if(json[attr] !== cur){
                        isStop = false;
                    }
                }
                if(isStop){
                    clearInterval(obj.timer);
                    callback&&callback();
                }
            },30)
        }
    }
}




