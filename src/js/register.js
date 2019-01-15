//验证码
$(function () {
    console.log(1);
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

        $("#register").click(function(){

            var usn = $(".name").val();
            var pwd = $(".password").val();
            var con = $(".password2").val(); //确认密码

            if(!usn){
                alert("用户名不能为空！");
                return;
            }

            if(pwd !== con){
                alert("两次输入的密码不相同，请重试!");
                return;
            }

            var users = $.cookie("registerUsers") ? $.cookie("registerUsers") : "";


            users = convertStrToObj(users);
            if(usn in users){
                alert("用户名已经被注册");
                return;
            }else{

                users[usn] = pwd;
                userStr = JSON.stringify(users);

                $.cookie("registerUsers",userStr,{expires:7,path:"/"});
                 alert("注册成功！");
            }
        });

    })

    function convertStrToObj(str){
        if(!str){
            return {};
        }
        return JSON.parse(str);
    }




