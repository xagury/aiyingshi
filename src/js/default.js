$(function(){

    //header 公告切换
    var timer = setInterval(function () {
        cutLI();
    },5000)
    function cutLI(){
        var h = $('.scroll ul li').height();
        $('.scroll ul li').eq(0).appendTo($('.scroll ul'));
        $('.scroll').animate({
            "marginTop" : " - " + h
        },500,function () {
            $('.scroll').css({
                "marginTop":0
            })

        })
    }
    //超过屏幕出现返回顶部按钮
    var height = $(window).height();
    $(window).scroll(function () {
        if($(window).scrollTop() > height){
            $('.upward').fadeIn(500);
        }else{
            $('.upward').fadeOut(500);
        }
    });
    $('.upward').click(function () {
        $('body,html').animate({scrollTop:0},'slow');
        return false;
    });
    //


    $('#menu ul').find('li').each(function () {
        $(this).on({
            'mouseover' : function () {
                $(this).find('ul').slideDown();
            },
            'mouseout' : function () {
                $(this).find('ul').slideUp();
            }
        })
    })

    $('.wheel').find('span').each(function () {
        $(this).on({
                'mouseover' :function () {
                    $(this).fadeTo('slow',1);
                },
                'mouseout' :function () {
                    $(this).fadeTo('slow',0.1);
                }
         })
    })



    //banner 轮播图
    var index = 0;
    var timer;
    $('.wheel ul li').eq(0).show().siblings().hide();
    //定时器开始
     timer = setInterval(function () {
        $.banner(index);
        index++;
        if( index == 2){
            index = -1;
        }
    },3000);

    $('.wheel').on({
        'mouseover' : function () {
            clearInterval(timer);
        },
        'mouseout' : function () {
             timer = setInterval(function () {
                $.banner(index);
                index++;

                if( index == 2){
                    index = -1;
                }
            },2000)}
    })
    $('.wheel .wheelBtn ol').find('li').each(function () {
        $(this).mouseover(function () {
           $(this).addClass("active").siblings("li").removeClass("active");
            index = $(this).index();
            $.banner(index);
            clearInterval(timer);
         })
    })

    $('.wheel  .wheelLeft').click(function () {
        clearInterval(timer);
        if( index == 0 ) {
            index = 3;
        }
        index--;
        $.banner(index);
    })
    $('.wheel  .wheelRight').click(function () {
        clearInterval(timer);
        if( index == 2 ) {
            index = -1;
        }
        index++;
        $.banner(index);

    })

    //table切换
    $.jqtab(".tableBox-btn ul", ".tableBox-content", "mouseover");

    $(".rmtj").find("li:lt(4)").css('border-bottom','1px solid #dcdcdc');
    $(".xsqg").find("li:lt(2)").css('border-bottom','1px solid #dcdcdc');
    $(".xsqg .xsqgRight").find("li:lt(2)").css('border-bottom','1px solid #dcdcdc');
    $(".xpsj").find("li:lt(4)").css('border-bottom','1px solid #dcdcdc');
    console.log(1);
    $('.cBottom ul li').each(function () {

        $(this).on({
            'mouseover' : function () {
                console.log($(this));
                $(this).css('border','1px solid #f24444');
            },
            'mouseout' : function () {
                $(this).css('border','1px solid #DCDCDC');
            }
        })
    })

    var str = $.cookie("loginedUsers") ? $.cookie("loginedUsers") : "";
    if(str){
        var obj = convertStrToObj(str);
        $(".loginRightTop .login").prepend($('<s>&nbsp;&nbsp;' + str + '&nbsp;&nbsp;<a href="javascript:;" id="logout">&nbsp;&nbsp;注销&nbsp;&nbsp;</a></s>'))
    }else{
        var str1 = $(' <a href="login.html">[登录]</a><a href="register.html">[注册]</a>');
        $(".loginRightTop .login").prepend(str1);
    }
    $("#logout").click(function(){
        $(this).parent().remove();
        $.removeCookie("loginedUsers",{expires : 7,path:"/"});
        location.href = "login.html";
    })
});

jQuery.jqtab = function (button, content, affair)
{


    $(content).find("div:first").show();

    $(button).find("li:first").addClass("tableHover");

    $(button).find("li").bind(affair, function () {
        $(this).addClass("tableHover").siblings("li").removeClass("tableHover");

        var active = $(button).find("li").index(this);

        $(content).children().eq(active).show().siblings().hide();

        return false;
    });


}

//调用

jQuery.banner = function (index) {

    $('.wheel ul li').eq(index).fadeIn(500).siblings().fadeOut(500);
    $('.wheel .wheelBtn ol li').eq(index).addClass("active").siblings("li").removeClass("active");
}


function convertStrToObj(str){
    if(!str){
        return {};
    }
    var users = str.split(":");
    var obj = {};
    for(var i = 0; i < users.length; i ++){
        var data = users[i].split(",");
        obj[data[0]] = data[1];
    }
    return obj;
}
function convertObjToStr(obj){
    var str = "";
    for(var usn in obj){
        var pwd = obj[usn];
        if(str){
            str += ":";
        }
        str += usn + "," + pwd;
    }
    return str;
}



