function convertCartStrToObj(o){if(!o)return{};for(var t=o.split(":"),r={},a=0;a<t.length;a++){var e=t[a].split(",");r[e[0]]={name:e[1],price:parseFloat(e[2]),num:parseInt(e[3]),src:e[4]}}return r}function convertObjToCartStr(o){var t="";for(var r in o)t&&(t+=":"),t+=r+","+o[r].name+","+o[r].price+","+o[r].num+","+o[r].src;return t}function convertCookieStrToCookieObj(o){return o?JSON.parse(o):{}}function convertStrToObj(o){if(!o)return{};for(var t=o.split(":"),r={},a=0;a<t.length;a++){var e=t[a].split(",");r[e[0]]=e[1]}return r}function convertObjToStr(o){var t="";for(var r in o){t&&(t+=":"),t+=r+","+o[r]}return t}$(function(){var o=$.cookie("cart")?$.cookie("cart"):"";if(o){var t=convertCartStrToObj(o),r="";for(var a in t){var e=t[a],r='<div class="shopBody shopCheck l"><input type="checkbox"></div><div class="shopBody good l"  data-good-id="'+a+'"><a href="#"> <img id="shopImg" class="goodImg" src="'+e.src+'" alt=""><span id="shopName">'+e.name+'</span></a></div><div class="shopBody price l"><p class="priceP">￥ <span id="priceA">'+e.price+'</span></p></div><div class="shopBody num l"><div class="numD"><span class="minus">-</span><input type="text" id="shopNum" class="shopNum" value="'+e.num+'"><span class="add">+</span></div></div><div class="shopBody total l"><p class="totalP" >￥<span class="total" id="shopTotal">'+e.price*e.num+'</span></p></div><div class="shopBody del l"><span class="delete">[删除]</span></div>';$(r).appendTo(".cartShop")}$(".del .delete").click(function(){var o=$(".good").parent(".cartShop").remove().attr("data-good-id");$(".redemption").remove();var t=convertCartStrToObj($.cookie("cart")?$.cookie("cart"):"");delete t[o],$.cookie("cart",convertObjToCartStr(t),{expires:-1,path:"/"})}),$(".numD .add").click(function(){var o=$(".good").attr("data-good-id"),t=convertCartStrToObj($.cookie("cart")?$.cookie("cart"):"");t[o].num+=1,$(this).siblings("input").val(""+t[o].num),$("#shopTotal").html(t[o].num*t[o].price+""),$("#totalAll").html(t[o].num*t[o].price+""),$.cookie("cart",convertObjToCartStr(t),{expires:7,path:"/"})}),$(".numD .minus").click(function(){var o=$(".good").attr("data-good-id"),t=convertCartStrToObj($.cookie("cart")?$.cookie("cart"):"");1<t[o].num&&(t[o].num-=1,$(this).siblings("input").val(""+t[o].num),$("#shopTotal").html(t[o].num*t[o].price+""),$("#totalAll").html(t[o].num*t[o].price+""),$.cookie("cart",convertObjToCartStr(t),{expires:7,path:"/"}))}),$(".numD input").blur(function(){var o=$(".good").attr("data-good-id"),t=convertCartStrToObj($.cookie("cart")?$.cookie("cart"):"");/^\d+$/.test($(this).val())?t[o].num=parseInt($(this).val()):(t[o].num=1,$(this).val("1")),$(this).siblings("input").val(""+t[o].num),$("#shopTotal").html(t[o].num*t[o].price+""),$("#totalAll").html(t[o].num*t[o].price+""),$.cookie("cart",convertObjToCartStr(t),{expires:7,path:"/"})})}else $(".blank").show(),$(".cart").hide();if(r=$.cookie("loginedUsers")?$.cookie("loginedUsers"):""){convertStrToObj(r);$(".login").prepend($("<s>&nbsp;&nbsp;"+r+'&nbsp;&nbsp;<a href="javascript:;" id="logout">&nbsp;&nbsp;注销&nbsp;&nbsp;</a></s>'))}else{var n=$(' <a href="login.html">[登录]</a><a href="register.html">[注册]</a>');$(".login").prepend(n)}$("#logout").click(function(){$(this).parent().remove(),$.removeCookie("loginedUsers",{expires:7,path:"/"}),location.href="login.html"})});