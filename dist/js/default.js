function convertStrToObj(e){if(!e)return{};for(var n=e.split(":"),o={},i=0;i<n.length;i++){var l=n[i].split(",");o[l[0]]=l[1]}return o}function convertObjToStr(e){var n="";for(var o in e){n&&(n+=":"),n+=o+","+e[o]}return n}$(function(){var e=setInterval(function(){var e;e=$(".scroll ul li").height(),$(".scroll ul li").eq(0).appendTo($(".scroll ul")),$(".scroll").animate({marginTop:" - "+e},500,function(){$(".scroll").css({marginTop:0})})},5e3);var n=$(window).height();$(window).scroll(function(){$(window).scrollTop()>n?$(".upward").fadeIn(500):$(".upward").fadeOut(500)}),$(".upward").click(function(){return $("body,html").animate({scrollTop:0},"slow"),!1}),$("#menu ul").find("li").each(function(){$(this).on({mouseover:function(){$(this).find("ul").slideDown()},mouseout:function(){$(this).find("ul").slideUp()}})}),$(".wheel").find("span").each(function(){$(this).on({mouseover:function(){$(this).fadeTo("slow",1)},mouseout:function(){$(this).fadeTo("slow",.1)}})});var o=0;$(".wheel ul li").eq(0).show().siblings().hide(),e=setInterval(function(){$.banner(o),2==++o&&(o=-1)},3e3),$(".wheel").on({mouseover:function(){clearInterval(e)},mouseout:function(){e=setInterval(function(){$.banner(o),2==++o&&(o=-1)},2e3)}}),$(".wheel .wheelBtn ol").find("li").each(function(){$(this).mouseover(function(){$(this).addClass("active").siblings("li").removeClass("active"),o=$(this).index(),$.banner(o),clearInterval(e)})}),$(".wheel  .wheelLeft").click(function(){clearInterval(e),0==o&&(o=3),o--,$.banner(o)}),$(".wheel  .wheelRight").click(function(){clearInterval(e),2==o&&(o=-1),o++,$.banner(o)}),$.jqtab(".tableBox-btn ul",".tableBox-content","mouseover"),$(".rmtj").find("li:lt(4)").css("border-bottom","1px solid #dcdcdc"),$(".xsqg").find("li:lt(2)").css("border-bottom","1px solid #dcdcdc"),$(".xsqg .xsqgRight").find("li:lt(2)").css("border-bottom","1px solid #dcdcdc"),$(".xpsj").find("li:lt(4)").css("border-bottom","1px solid #dcdcdc"),console.log(1),$(".cBottom ul li").each(function(){$(this).on({mouseover:function(){console.log($(this)),$(this).css("border","1px solid #f24444")},mouseout:function(){$(this).css("border","1px solid #DCDCDC")}})});var i=$.cookie("loginedUsers")?$.cookie("loginedUsers"):"";if(i){convertStrToObj(i);$(".loginRightTop .login").prepend($("<s>&nbsp;&nbsp;"+i+'&nbsp;&nbsp;<a href="javascript:;" id="logout">&nbsp;&nbsp;注销&nbsp;&nbsp;</a></s>'))}else{var l=$(' <a href="login.html">[登录]</a><a href="register.html">[注册]</a>');$(".loginRightTop .login").prepend(l)}$("#logout").click(function(){$(this).parent().remove(),$.removeCookie("loginedUsers",{expires:7,path:"/"}),location.href="login.html"})}),jQuery.jqtab=function(n,o,e){$(o).find("div:first").show(),$(n).find("li:first").addClass("tableHover"),$(n).find("li").bind(e,function(){$(this).addClass("tableHover").siblings("li").removeClass("tableHover");var e=$(n).find("li").index(this);return $(o).children().eq(e).show().siblings().hide(),!1})},jQuery.banner=function(e){$(".wheel ul li").eq(e).fadeIn(500).siblings().fadeOut(500),$(".wheel .wheelBtn ol li").eq(e).addClass("active").siblings("li").removeClass("active")};