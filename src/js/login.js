//验证码
$(function () {
    $('.code').createCode({
        len:5
    });

    $('#inputCode').blur(function () {
        if($(this).val().toLowerCase()!==$('.code').children('input').val().toLowerCase()){
            alert('验证码不正确')
        }
    })
})

    $(function(){
        //给登录按钮加点击事件
        $("#sub").click(function(){

            var usn = $("#name").val();
            var pwd = $("#psd").val();
            var users = $.cookie("registerUsers") ? $.cookie("registerUsers") : "";
            users = convertStrToObj(users);

            if(users[usn] == pwd){
                $.cookie("loginedUsers",usn,{expires:7,path:"/"});
                console.log("登录成功!");
                location.href = "index.html";

            }else{
                alert("用户名和密码不匹配，请确认后重试！");
            }
        });
    });

    function convertStrToObj(str){
        if(!str){
            return {};
        }
        return JSON.parse(str);
    }


