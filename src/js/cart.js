$(function () {
    var cartStr = $.cookie("cart") ? $.cookie("cart") : "";

    if(!cartStr) {
        $(".blank").show();
        $('.cart').hide();

    } else {
        var cartObj = convertCartStrToObj(cartStr);
            var str='';
        for(var id in cartObj) {
            //商品信息对象
            var good = cartObj[id];
            var str = '<div class="shopBody shopCheck l">'+
                '<input type="checkbox">'+
                        '</div>'+
                        '<div class="shopBody good l"  data-good-id="' + id + '">'+
                           '<a href="#">'+
                ' <img id="shopImg" class="goodImg" src="' + good.src+ '" alt="">'+
                                '<span id="shopName">' + good.name + '</span>'+
                            '</a>'+
                        '</div>'+
                        '<div class="shopBody price l">'+
                            '<p class="priceP">￥ <span id="priceA">' + good.price + '</span></p>'+
                        '</div>'+
                        '<div class="shopBody num l">'+
                            '<div class="numD">'+
                                '<span class="minus">-</span>'+
                                '<input type="text" id="shopNum" class="shopNum" value="' + good.num + '">'+
                                '<span class="add">+</span>'+
                            '</div>'+
                        '</div>'+
                        '<div class="shopBody total l">'+
                            '<p class="totalP" >￥<span class="total" id="shopTotal">' + good.price * good.num + '</span></p>'+
                        '</div>'+
                        '<div class="shopBody del l">'+
                            '<span class="delete">'+
                                '[删除]'+
                            '</span>'+
                        '</div>';

            $(str).appendTo(".cartShop");
        }
        $('.del .delete').click(function() {

            var id = $('.good').parent('.cartShop').remove().attr("data-good-id");
            $('.redemption').remove();

            //从cookie中将该商品删除
            var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
            var cartObj = convertCartStrToObj(cartStr);

            delete cartObj[id];


            $.cookie('cart', convertObjToCartStr(cartObj), {
                expires: -1,
                path: "/"
            });
        })

        //给增加按钮添加事件
        $(".numD .add").click(function() {

            var id = $('.good').attr("data-good-id");

            var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
            var cartObj = convertCartStrToObj(cartStr);
            cartObj[id].num += 1;
            //将页面上显示的数量加1
            $(this).siblings("input").val("" + cartObj[id].num);
            //更新页面上的小计
            $('#shopTotal').html(cartObj[id].num * cartObj[id].price + "");
            $('#totalAll').html(cartObj[id].num * cartObj[id].price + "");
            //将信息放回cookie
            $.cookie('cart', convertObjToCartStr(cartObj), {
                expires: 7,
                path: "/"
            });
        });
        //给减按钮添加点击事件
        $(".numD .minus").click(function(){
            var id = $('.good').attr("data-good-id");
            var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
            var cartObj = convertCartStrToObj(cartStr);
            if(cartObj[id].num > 1){ //商品数量减少不能少于1
                cartObj[id].num -= 1;
                //将页面上显示的数量减1
                $(this).siblings("input").val("" + cartObj[id].num);
                //更新页面上的小计
                $('#shopTotal').html(cartObj[id].num * cartObj[id].price + "");
                $('#totalAll').html(cartObj[id].num * cartObj[id].price + "");
                //将信息放回cookie
                $.cookie('cart', convertObjToCartStr(cartObj), {
                    expires: 7,
                    path: "/"
                });
            }


        });

        //改数量的input绑定一个blur事件
        $(".numD input").blur(function(){
            var id = $('.good').attr("data-good-id");
            var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
            var cartObj = convertCartStrToObj(cartStr);
            //判断用户输入是否合法
            var pattern = /^\d+$/;
            if(!pattern.test($(this).val())){
                cartObj[id].num = 1;
                $(this).val("1");
            }else{
                //修改一下数量
                cartObj[id].num = parseInt($(this).val());
            }


            $(this).siblings("input").val("" + cartObj[id].num);
            //更新页面上的小计
            $('#shopTotal').html(cartObj[id].num * cartObj[id].price + "");
            $('#totalAll').html(cartObj[id].num * cartObj[id].price + "");
            //将信息放回cookie
            $.cookie('cart', convertObjToCartStr(cartObj), {
                expires: 7,
                path: "/"
            });
        })

    }
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


function convertCartStrToObj(cartStr) {

    if(!cartStr) {
        return {};
    }
    var goods = cartStr.split(":");
    var obj = {};
    for(var i = 0; i < goods.length; i++) {
        var data = goods[i].split(",");

        obj[data[0]] = {
            name: data[1],
            price: parseFloat(data[2]),
            num: parseInt(data[3]),
            src: data[4]
        }
    }
    return obj;
}

function convertObjToCartStr(obj) {

    var cartStr = "";
    for(var id in obj) {
        if(cartStr) {
            cartStr += ":";
        }
        cartStr += id + "," + obj[id].name + "," + obj[id].price + "," + obj[id].num + "," + obj[id].src;
    }
    return cartStr;
}

function convertCookieStrToCookieObj(str){
    if(!str){
        return {};
    }
    return JSON.parse(str);
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
