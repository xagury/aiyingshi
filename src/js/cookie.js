function setCookie(key,value,expires) {
    var cookieText = encodeURIComponent(key) + encodeURIComponent(value) + ';path=/';
    if(isNaN(expires)){
        var date = new Date();
        date.setDate(date.getDate() + expires);
        cookieText += ';expires=' + expires;
    }
    document.cookie = cookieText;
}
function getCookie(key) {
    var arr = document.cookie.split(';');
    for(var i = 0 ; i < arr.length ; i++){
        var list = arr[i].split('=');
        if(encodeURIComponent(key) == list[0]){
            return decodeURIComponent(list[1]);
        }
    }
}
function removeCookie(key) {
    document.cookie = encodeURIComponent(key) + '=;expires=' + new Date(0) + ';path=/';
}
