

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


    $('.menu .menuWrap .all-shop a').on({
        'mouseenter' : function () {
            $('.all-shop-detail').show();
            $('.all-shop-detail').mouseleave(function () {

                    $('.all-shop-detail').hide();

            })
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
        $('body,html').animate({scrollTop:0},100);
        return false;
    });

    $.table(".cdRight .tableBoxBtn ul", ".cdRight .tableBoxContent", "click");
   $('.jqzoom').jqueryzoom({
       xzoom: 500,//放大图的宽度(默认是 200)
       yzoom: 500,//放大图的高度(默认是 200)
       offset: 10, //离原图的距离(默认是 10)
       position: "right",//放大图的定位(默认是 "right")
       preload: 1

   });


    $('.items ul').find('li').each(function () {
        $(this).find('img').mouseover(function () {
            console.log($(this).attr("src"));

            var srcImg = $(this).attr("src");

            $('.jqzoom .jqImg').attr("src",srcImg);

        })
    });

    $('.smallImg .control').click(function () {
        var h = $('.items ul li').width();
        $('.items ul li').eq(0).appendTo($('.items ul'));
        $('.items').animate({
            "marginLeft" : " - " + h
        },500,function () {
            $('.items').css({
                "marginLeft":0
            })
        })
    })


    $('.buyBtn .buy').click(function(){
        window.location = 'cart.html';
    })

    $(".join").click(function() {
        $('.addCart').show();
        var goodId = $('.dRight').attr("data-good-id");
        var goodName = $('#shopName').html();
        var goodPrice = $("#priceA").html();
        var goodSrc = $(".jqzoom img").attr("src");
        var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
        var cartObj = convertCartStrToObj(cartStr);
        if(goodId in cartObj){
            cartObj[goodId].num += 1;
        }else{
            cartObj[goodId] = {
                name : goodName,
                price : goodPrice,
                num : 1,
                src : goodSrc
            };
        }

        cartStr = convertObjToCartStr(cartObj);

        $.cookie("cart",cartStr,{expires : 7,path:"/"});

        loadCart();
        function loadCart(){
            var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
            var cartObj = convertCartStrToObj(cartStr);
            //获取到购物车中所有商品的数量
            var total = 0;
            for(var id in cartObj){
                total += cartObj[id].num;
            }
            $("#cartNum").html(total);
        }

    });

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

    $(".jssl input").blur(function(){
        var id = $('.dRight').attr("data-good-id");
        var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
        var cartObj = convertCartStrToObj(cartStr);
        var pattern = /^\d+$/;
        if(!pattern.test($(this).val())){
            cartObj[id].num = 1;
            $(this).val("1");
        }else{
            cartObj[id].num = parseInt($(this).val());
        }
        $(this).siblings("input").val("" + cartObj[id].num);
        $.cookie('cart', convertObjToCartStr(cartObj), {
            expires: 7,
            path: "/"
        });
    })
    //给增加按钮添加事件
    $(".jssl .btnA").click(function() {
        var id = $('.dRight').attr("data-good-id");
        var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
        var cartObj = convertCartStrToObj(cartStr);
        cartObj[id].num += 1;
        $(this).siblings("input").val("" + cartObj[id].num);
        $.cookie('cart', convertObjToCartStr(cartObj), {
            expires: 7,
            path: "/"
        });
    });
    //给减按钮添加点击事件
    $(".jssl .btnR").click(function(){
        var id = $('.dRight').attr("data-good-id");
        var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
        var cartObj = convertCartStrToObj(cartStr);
        if(cartObj[id].num > 1){ //商品数量减少不能少于1
            cartObj[id].num -= 1;
            $(this).siblings("input").val("" + cartObj[id].num);
            $.cookie('cart', convertObjToCartStr(cartObj), {
                expires: 7,
                path: "/"
            });
        }


    });


})

function convertCartStrToObj(cartStr){

    if(!cartStr){
        return {};
    }
    var goods = cartStr.split(":");
    var obj = {};
    for(var i = 0; i < goods.length; i ++){
        var data = goods[i].split(",");

        obj[data[0]] = {
            name : data[1],
            price : parseFloat(data[2]),
            num : parseInt(data[3]),
            src : data[4]
        }
    }
    return obj;
}
function convertObjToCartStr(obj){
    var cartStr = "";
    //遍历对象
    for(var id in obj){
        if(cartStr){
            cartStr += ":";
        }

        cartStr += id + "," + obj[id].name + "," + obj[id].price + "," + obj[id].num + "," + obj[id].src;
    }
    return cartStr;
}

jQuery.table = function (button, content, affair)
{


    $(content).find("div").show();

    $(button).find("li:first").addClass("active");

    $(button).find("li").bind(affair, function () {
        $(this).addClass("active").siblings("li").removeClass("active");

        var active = $(button).find("li").index(this);

        $(content).children().eq(active).show().siblings().hide();
        if(active == 1){
            $(content).find('.introduceTop').hide();
            $(content).find('.video').show().siblings().hide();
        }
        if(active == 2){
            $(content).children().hide();
        }
        return false;
    });
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
