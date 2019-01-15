

$(function(){

//调用
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
    $('.down-btn').click(function () {
        cutLI();
    });

    $('.up-btn').click(function () {
        cutLI();
    });



    //loginBar滑过出现
    $('.myAys').on({
        'mouseover' : function(){
            $('.myAys-drop').show();
        },
        'mouseout' :function () {
            $('.myAys-drop').hide();
        }
    })

    $('.top-phone').on({
        'mouseover' : function(){
            $('.ays-ewm').show();
        },
        'mouseout' : function () {
            $('.ays-ewm').hide();
        }
    })

    $('.icon-weixin').on({
        'mouseover' : function(){
            $('.weixin-content').show();
        },
        'mouseout' : function () {
            $('.weixin-content').hide();
        }
    })


    //menu 大菜单滑过
    $('.all-shop-detail').find('.shop').each(function () {
        $(this).on({
            'mouseover' :function () {
                $(this).children('.lay-detail').show();
            },
            'mouseout' :function () {
                $(this).children('.lay-detail').hide();
            }
        })
    })

    //购物车滑过
    $('.gwc').on({
        'mouseover' : function () {
            $('.myCart').show();
        },
        'mouseout' : function () {
            $('.myCart').hide();
        }
    })
    $.jqtab(".tableBox-btn ul", ".tableBox-content", "mouseover");
    //超过屏幕出现返回顶部按钮
    returnTop();
    function returnTop() {
        var height = $(window).height();
        $(window).scroll(function () {
            if($(window).scrollTop() > height){
                $('.upward').fadeIn(500);
            }else{
                $('.upward').fadeOut(500);
            }
        });
        $('.upward').click(function () {
            $('body,html').animate({scrollTop:0},4000);
            return false;
        });
    }




    //b1name滑过出现样式
    $('#floor ul ').find('li').each(function () {
        $(this).on({
            'mouseover' : function () {

                $('.name1').on({
                    'mouseover' : function () {
                        $(this).next().show();
                        $(this).hide();
                    }
                });
            },
            'mouseout' : function () {
                $('.name2').on({
                    'mouseout' : function () {
                        $(this).hide();
                        $(this).prev().show();
                    }
                })
            }
        })
    })

    //floor content 滑过向右偏移
    //按钮
    $('#floor .content').on({
        'mouseover' : function () {
            $('.cbtn').css('opacity','1');
        },
        'mouseout' : function () {
            $('.cbtn').css('opacity','0.2');
        }
    });
    $('#floor .content ul').find('li').each(function () {
        //图标滑过向左偏移
        $(this).find('a').each(function () {
            $(this).on({
                'mouseover' : function () {
                    $(this).animate({marginRight:20},500);
                },
                'mouseout' : function () {
                    $(this).animate({marginRight:0},500);
                }
            })
        })
    })

    $('.floorRight ul ').find('li').each(function () {
        $(this).find('.img').on({
            'mouseover' : function () {
                $(this).animate({marginRight:20},500);
            },
            'mouseout' : function () {
                $(this).animate({marginRight:0},500);
            }
        })
    })

//登录名
    var str = $.cookie("loginedUsers") ? $.cookie("loginedUsers") : "";
    if(str){
        var obj = convertStrToObj(str);
        $(".login").prepend($('<s>&nbsp;&nbsp;' + str + '&nbsp;&nbsp;<a href="javascript:;" id="logout">&nbsp;&nbsp;注销&nbsp;&nbsp;</a></s>'))
    }else{
        var str1 = $(' <a href="login.html">[登录]</a><a href="register.html">[注册]</a>');
        $(".login").prepend(str1);
    }
    $("#logout").click(function(){
        $(this).parent().remove();
        $.removeCookie("loginedUsers",{expires : 7,path:"/"});
        location.href = "login.html";
    })
})
$(function () {

    var width2 = $("#floor .content ul li").width(); //获取焦点图的宽度（显示面积）
    var length2 = $("#floor .content ul li").length; //获取焦点图个数
    var index2 = 0;

    $("#floor .floorPrev").each(function () {
        $(this).click(function () {

            var length = $(this).siblings().children().length ;
            index2 -= 1;
            if (index2 == -1) { index2 = length - 1; }
            $(this).siblings().css("width", width2 * (length));
            var nowLeft2 = -index2 * width2;
            $(this).siblings().stop(true, false).animate({ "left": nowLeft2 }, 300);
        });
    })

    $("#floor .floorNext").each(function () {
        $(this).click(function () {
            var length = $(this).siblings().children().length ;
            index2 += 1;
            if (index2 == length) { index2 = 0; }
            $(this).siblings().css("width", width2 * (length));
            var nowLeft2 = -index2 * width2;
            $(this).siblings().stop(true, false).animate({ "left": nowLeft2 }, 300);
        });
    })

    function ShowPicSlide2(index2) {
        var nowLeft2 = -index2 * width2;
        $("#floor .content ul").stop(true, false).animate({ "left": nowLeft2 }, 300);
    }

    function solid() {
        window._currentWidth = document.body.clientWidth;
        window.onresize = function () {
            window._currentWidth = document.body.clientWidth;
            c = 0;
            g();
        };
        var f = $("#JS_side_stage"),
            i = $("#JS_side_nav a"),
            b = $("#JS_side_stage a"),
            d = $("#JS_side_nav a").length,
            e = 0,
            c = 0;
        i.on("mouseover",
            function () {
                c = $(this).index();
                if (h) {
                    clearInterval(h);
                }
                g();
            }).on("mouseout",
            function () {
                h = setInterval(function () {
                        g();
                    },
                    6000);
            });
        var g = function () {
            $(i.get(e)).removeClass("active");
            $(i.get(c)).addClass("active");
            $("#JS_side_stage").stop(true, false).animate({
                    "margin-left": (0 - c) * window._currentWidth + "px"
                },
                200);
            e = c;
            var l = $(b.get(e));
            c = (c >= d - 1) ? 0 : c + 1;
        };
        var h = setInterval(function () {
                g();
            },
            6000);
    }

})

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
