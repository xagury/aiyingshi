var ajax = {};
ajax.get = function(url,fn){
	var xhr = new XMLHttpRequest();
	xhr.open('GET',url);
	xhr.send();
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			if(typeof fn === 'function'){
				fn(xhr.responseText);
			}
		}
	}
}
ajax.post = function(url,data,fn){
	var xhr = new XMLHttpRequest();
	xhr.open('POST',url,true);
	//设置请求头
	xhr.setRequestHeader("content-type","application/x-www-form-urlencode;charset=utf-8");
	xhr.send(data); // key=value&key=value
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			if(typeof fn === 'function'){
				fn(xhr.responseText);
			}
		}
	}
}