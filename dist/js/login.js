function convertStrToObj(e){return e?JSON.parse(e):{}}$(function(){$(".code").createCode({len:5}),$("#inputCode").blur(function(){$(this).val().toLowerCase()!==$(".code").children("input").val().toLowerCase()&&alert("验证码不正确")})}),$(function(){$("#sub").click(function(){var e=$("#name").val(),o=$("#psd").val(),r=$.cookie("registerUsers")?$.cookie("registerUsers"):"";(r=convertStrToObj(r))[e]==o?($.cookie("loginedUsers",e,{expires:7,path:"/"}),console.log("登录成功!"),location.href="index.html"):alert("用户名和密码不匹配，请确认后重试！")})});