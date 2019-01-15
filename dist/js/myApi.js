class Drag {
    constructor(id) {
        var that = this;
        this.ele = document.getElementById(id);
        this.ele.onmousedown = function (evt) {
            that.fnDown(evt);
        }
    }

    fnDown(evt) {
        var e = evt || window.event;
        this.disX = e.offsetX;
        this.disY = e.offsetY;
        var that = this;
        document.onmousemove = function (evt) {
            that.fnMove(evt);
        }
        document.onmouseup = this.fnUp;
        document.ondragstart = function () {
            return false;
        }
    }

    fnMove(evt) {
        var e = evt || window.event;
        this.ele.style.left = e.pageX - this.disX + 'px';
        this.ele.style.top = e.pageY - this.disY + 'px';
    }

    fnUp() {
        document.onmousemove = null;
    }
}

class Subdrag extends Drag{
    constructor(id){
        super(id);
    }

    fnMove(evt){
        var e = evt || window.event;
        var left = e.pageX - this.disX ;
        var top = e.pageY - this.disY;
        if(left <= 0){
            left =0;
        }else if(left <= document.documentElement.clientWidth - this.ele.offsetWidth){
            left = document.documentElement.clientWidth - this.ele.offsetWidth;
        }
        if(top <= 0){
            top = 0;
        }else if(top <= document.documentElement.clientHeight - this.ele.offsetHeight){
            top = document.documentElement.clientHeight - this.ele.offsetHeight;
        }
        this.ele.style.left = left + 'px';
        this.ele.style.top = top + 'px';
    }
}



//随机数取整  min 最小值、   max   最大值。
function randomNum(min,max){
	return parseInt(Math.random() * ( max - min ) + min);
}


//封装数组排序方法
function orderArr(arr){
	for(var i = 0 ; i < arr.length ; i++){
		for(var j = i + 1 ; j < arr.length ; j++){
			if(arr[i] > arr[j]){
				var temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
			}
		}
	}
	return arr;
}


//数组元素去重！！
function norepeat(arr){
	for(var i = 0 ; i < arr.length ; i++){
		for(var j = i + 1 ; j < arr.length ; j++){
			if(arr[i] == arr[j]){
				arr.splice(j,1);
				j--;
			}
		}
	}
		return arr;
}

//按照从小到大的排序，将数据插入数组
function insert(arr,n){
	var flag = true;
	for(var i = 0 ; i < arr.length ; i++){
		if(arr[i] > n){
			arr.splice(i,0,n);
			flag = false;
			break;
		}
	}
	if(flag == true){
		arr.push(n)
	}
	return arr;
}


//随机颜色
function randomColor(){
	var str = '0123456789abcdef';
	var color = '#';
	for(var i = 0 ; i < 6 ; i++){
		var num = parseInt(Math.random() * 16);
		color += str.charAt(num);
	}
	return color;
}


//时间上补0
//补零
function mendZero(n){
	if(n < 10){
		return '0' + n;
	}else{
		return n;
	}
}


//返回顶部
function goTop(){
	var st = document.documentElement.scrollTop || document.body.scrollTop;
	var timer = setInterval(function(){
		st-=50;
		document.documentElement.scrollTop = document.body.scrollTop = st;
		if(st <= 0){
			clearInterval(timer);
		}
	},10)
}


//获取非行间样式
function getStyle(ele,attr){
	if(ele.currentStyle){
		return ele.currentStyle[attr];
	}else{
		return getComputedStyle(ele,null)[attr];
	}
}



/*封装阻止浏览器默认行为*/
function preventDefault(e){
	return e.preventDefault ? e.preventDefault() : e.returnValue = false;
}
//转化时间
function stringDate(date,sign){
            if(!sign){
                sign = '-'
            }
            return '' + date.getFullYear() + sign + mendZero(date.getMonth() + 1) + sign + date.getDate() +' ' + mendZero(date.getHours()) + ':' + mendZero(date.getUTCMinutes()) + ':' + mendZero(date.getSeconds());
        }
        //补零
        function mendZero(n){
            if(n < 10){
                return "0" + n
            }else{
                return n;
            }
        }

// //封装事件监听
// function addEventListener(ele,eType,fn){
// 	if(ele.addEventListener){
// 		return ele.addEventListener(eType,fn)
// 	}else{
// 		return ele.attachEvent('on'+eType,fn)
// 	}
// }


//封装阻止事件冒泡
function stopPropagation(e){
	return e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
}
//接受跳转参数
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
//判断cookie
function checkCookie(name){
    if(getCookie(name) == null || getCookie(name)=="" || getCookie(name)=="null" || typeof(getCookie(name))=="undefined" || getCookie(name)==false || getCookie(name) == undefined){
        return false;
    }else{
        return true;
    }
}
//读取cookies
function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return false;
}
function setCookie(cName,cValue,expires){
		var d = new Date();
		d.setDate(d.getDate() + Number(expires));
		document.cookie=cName+'='+cValue+';path=/lp;expires='+d.toGMTString();
	}

	function readCookie(cName){
		var allCookie = document.cookie;
		var arrCookie = allCookie.split('; ');
		for(var i = 0 ; i < arrCookie.length ;i++){
			var items = arrCookie[i].split('=');
			if(cName == items[0]){
				return items[1];
			}
		}
	}
	//删除cookie
	function deleteCookie(cName){
		setCookie(cName,null,-1);
	}
	deleteCookie('name')


	function moreMove(ele,attr,iTarget,fn){
		//关闭定时器   ele.timer    对象私有的定时器
		clearInterval(ele.timer);
		//开启定时器
		ele.timer = setInterval(function(){
			//获取运动的属性
			var iCur = getStyle(ele,attr)
			//判断属性是否为opacity；
			if(attr == 'opacity'){    //0.3
				iCur = iCur * 100;    //30
			}else{
				iCur = parseInt(iCur);
			}
			//设置速度
			var speed = (iTarget - iCur) / 8;
			//速度取整
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			//终止条件的判断
			if(iCur == iTarget){
				clearInterval(ele.timer);
				if(fn){

					fn();
				}
			}else{
				//因为透明的设置方式和其他的设置方式不同。所用要对属性做一个判断
				if(attr == 'opacity'){
					ele.style.opacity = (iCur + speed) / 100;
					ele.style.filter = 'alpha(opacity='+(iCur + speed)+')'
				}else{
					ele.style[attr] = iCur + speed +'px';
				}
			}
		},30)
	}


	function chainMove(ele,attr,iTarget,fn){
		//关闭定时器
		clearInterval(ele.timer);
		//开启定时器
		ele.timer =setInterval(function(){
			//获取运动属性值
			var iCur = getStyle(ele,attr);
			//判断属性是否为透明
			if(attr == 'opacity'){
				iCur *=100;
			}else{
				iCur =parseInt(iCur)
			}
			//速度
			var speed = (iTarget - iCur)/8;
			//处理边界误差
			speed = speed>0?Math.ceil(speed):Math.floor(speed)
			//判断终止条件
			if(iCur == iTarget){
				clearInterval(ele.timer);
				if(fn){
					fn();
				
				}
			}else {
				if(attr == 'opacity'){
					ele.style.opacity = (iCur + speed) /100;
					ele.style.filter = 'alpha(opacity'+iCur + speed+')';
				}else{
					ele.style[attr] = iCur + speed +'px'	
				}
			}
		},30)
	}

function move(ele,json,fn){
    //关闭定时器
    clearInterval(ele.timer)
    //开启定时器
    ele.timer = setInterval(function(){
        //定时开关（控制是否关闭定时器。结束运动）
        var bStop = true;
        //对传进来的对象进行遍历
        for(attr in json){
            //获取每个变化属性的初始值
            var iCur = getStyle(ele,attr);
            //判断是否为opacity
            if(attr == 'opacity'){
                iCur *= 100;
            }else{
                iCur = parseInt(iCur);
            }
            //设置速度  （目标值 - 初始值）/ 8
            var speed = (json[attr] - iCur) / 8;
            //速度取整
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //判断终止条件 (如果所有属性运动不完，把bStop = false);

            if(json[attr] != iCur){
                bStop = false;
            }

            //判断是否能为opacity
            if(attr == 'opacity'){
                ele.style.opacity = (iCur + speed) / 100;
                ele.style.filter = 'alpha(opacity='+(iCur + speed)+')'
            }else{
                ele.style[attr] = iCur + speed + 'px';
            }
        }

        if(bStop){
            clearInterval(ele.timer)
            //做回调函数的判断（链式运动）
            if(fn){
                fn();
            }
        }
    },30)
}


//1.scrollTop(滚动条到页面顶端的距离)
var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//2.scrollLeft（滚动条到页面左边的距离）
var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
//3.byClassName的兼容
function byClassName(obj,className){
    if(obj.getElementsByClassName){ //支持byClassName
        return obj.getElementsByClassName(className);
    }else{
        var arr = [];
        var eles = obj.getElementsByTagName('*'); //获取所有标签
        //遍历所有标签,寻找具有指定className的元素
        for(var i = 0,len = eles.length;i < len;i ++){
            if(eles[i].className == className){
                arr.push(eles[i]); //存入数组
            }
        }
        return arr;
    }
}
//4.获取节点对象中class属性的兼容
function getAttributeFromClass(obj,className){
    return obj.getAttribute('class') == null ? obj.getAttribute('className') : obj.getAttribute('class');
}

//7.获取鼠标按键的编码值
function getButton(evt){
    var e = evt || window.event;
    if(evt){
        return e.button;
    }else if(window.event){
        switch(e.button){
            case 1 : return 0;
            case 4 : return 1;
            case 2 : return 2;
        }
    }
}


// //12.移除事件监听的兼容
// function removeEventListener(obj,event,fn,boo){
//     if(obj.removeEventListener){
//         obj.removeEventListener(event,fn,boo);
//     }else{
//         obj.detachEvent('on' + event,fn);
//     }
// }
//获取ID

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}


// class Drag {
//     constructor(id) {
//         var that = this;
//         this.ele = document.getElementById(id);
//         this.ele.onmousedown = function (evt) {
//             that = fnDown(evt);
//         }
//     }
//
//     fnDown(evt) {
//         var e = evt || window.event;
//         this.disX = e.offsetX;
//         this.disY = e.offsetY;
//         var that = this;
//         document.onmousemove = function (evt) {
//             that = fnMove(evt);
//         }
//         document.onmouseup = this.fnUp;
//         document.ondragstart = function () {
//             return false;
//         }
//     }
//
//     fnMove(evt) {
//         var e = evt || window.event;
//         this.ele.style.left = e.pageX - this.disX + 'px';
//         this.ele.style.top = e.pageY - this.disY + 'px';
//     }
//
//     fnUp() {
//         document.onmousemove = null;
//     }
// }
//
// class Subdrag extends Drag{
//     constructor(id){
//         super(id);
//     }
//
//     fnMove(evt){
//         var e = evt || window.event;
//         var left = e.pageX - this.disX ;
//         var top = e.pageY - this.disY;
//         if(left <= 0){
//             left =0;
//         }else if(left <= document.documentElement.clientWidth - this.ele.offsetWidth){
//             left = document.documentElement.clientWidth - this.ele.offsetWidth;
//         }
//         if(top <= 0){
//             top = 0;
//         }else if(top <= document.documentElement.clientHeight - this.ele.offsetHeight){
//             top = document.documentElement.clientHeight - this.ele.offsetHeight;
//         }
//         this.ele.style.left = left + 'px';
//         this.ele.style.top = top + 'px';
//     }
// }


