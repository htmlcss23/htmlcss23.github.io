var zpub = {
	//封装$函数
	$:function(selector,content ){
	    var first = selector.charAt(),
	        arr = [],content = content || document;
	    if( first === "#" ){ //id
	        return document.getElementById( selector.slice(1) );
	    }else if( first === "." ){  //class
	        var allEle = content.getElementsByTagName("*");
	        for( var i = 0; i < allEle.length; i++ ){
	            var allClassName = allEle[i].className.split(" ");
	            for( var j = 0; j < allClassName.length; j++ ){
	                if( selector.slice(1) === allClassName[j] ){
	                    arr.push( allEle[i] );
	                    break;
	                }
	            };
	        }
	        return arr;
	    }else{
	        return content.getElementsByTagName( selector );
	    }
	},
	//封装getStyle函数
	getStyle:function(obj,attr){
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
	},
	//封装offset函数
	offset:function( obj ){
		var l = 0,t = 0;
		var border_l_w = parseFloat(zpub.getStyle(obj,"borderLeftWidth"));
		var border_t_w = parseFloat(zpub.getStyle(obj,"borderTopWidth"));

		border_l_w = isNaN( border_l_w ) ? 0 : border_l_w;
		border_t_w = isNaN( border_t_w ) ? 0 : border_t_w;
		while( obj ){
			var border_l_w2 = parseFloat(zpub.getStyle(obj,"borderLeftWidth"));
			var border_t_w2 = parseFloat(zpub.getStyle(obj,"borderTopWidth"));

			border_l_w2 = isNaN( border_l_w2) ? 0 : border_l_w2;
			border_t_w2 = isNaN( border_t_w2 ) ? 0 : border_t_w2;

			l += obj.offsetLeft + border_l_w2;
			t += obj.offsetTop + border_t_w2;
			obj = obj.offsetParent;
		};
		return {
			x: l-border_l_w,
			y: t-border_t_w
		}
	},
	//封装抖函数
	shake:function( obj, attr, n,callBack ){
		if( obj.timer ) return;
		var arr = [];
		var iNow = parseInt(comm.getStyle(obj,attr));
		for( var i = n; i >=0 ; i -= 3 ){
			arr.push(i,-i);
		};
		arr.push(0);
		var a = 0;
		obj.timer = setInterval(function (){
			obj.style[attr] = iNow + arr[a] + "px";
			a++;
			if( a > arr.length - 1 ){
				clearInterval(obj.timer);
				obj.timer = null;
				if( typeof callBack === "function" ) callBack();
			}
		},30);
	},
	//封装运动函数
	doMove:function (obj,attr,speed,target,callBack){
		if( obj.timer ) return;
		//当前元素所处的初始位置
		var l = parseFloat( zpub.getStyle( obj,attr ) );
		speed = l > target ? -Math.abs(speed) : Math.abs(speed);
		obj.timer = setInterval(function (){
			if( speed > 0 &&  l >= target ){
				l = target;
				obj.style[attr] = l + "px";
				clearInterval( obj.timer );
				obj.timer = null;
				if( typeof callBack === "function" ) callBack();
			}else if(speed < 0 && l <= target){
				l = target;
				obj.style[attr] = l + "px";
				clearInterval( obj.timer );
				obj.timer = null;
				if( typeof callBack === "function" ) callBack();
			}else{
				l += speed;
				obj.style[attr] = l + "px";
			};
		},30)
	},
	//增加className
	addClass:function( obj,classnames ){
		if( obj.className === "" ){  //如果元素中没有class，那么直接添加
			obj.className = classnames;
			return;
		};
		var classArray = obj.className.split(" ");
		for( var i = 0; i < classArray.length; i++ ){
			if( classArray[i] === classnames ) return;
		}
		obj.className += " " + classnames;		
	},
	//移除className
	removeClass:function(obj,classNames){
		if( obj.className === "" ) return;
		var classArray = obj.className.split(" ");
		for( var i = 0; i < classArray.length; i++ ){
			if( classArray[i] === classNames ){
				classArray.splice(i,1);
				i--;
			}
		};
		obj.className = classArray.join(" ");	
	},
	//封装节点函数，first,last,next,prev
	first:function( obj ){
		var firstChild = obj.firstElementChild || obj.firstChild;
		if( !firstChild || firstChild.nodeType !== 1 ) {
			return null;
		}else{
			return firstChild;
		}
	},
	last:function( obj ){
		var lastChild = obj.lastElementChild || obj.lastChild;
		if( !lastChild || lastChild.nodeType !== 1 ) {
			return null;
		}else{
			return lastChild;
		}
	},
	next:function( obj ){
		var nextSibling = obj.nextElementSibling || obj.nextSibling;
		if( !nextSibling || nextSibling.nodeType !== 1 ){
			return null;
		}else{
			return nextSibling;
		}	
	},
	prev:function( obj ){
		var prevSibling = obj.previousElementSibling || obj.previousSibling;
		if( !prevSibling || prevSibling.nodeType !== 1 ){
			return null;
		}else{
			return prevSibling;
		}
	},
	//view可视窗口的宽高
	view:function(){
		return {
			W:document.documentElement.clientWidth,
			H:document.documentElement.clientHeight
		}
	},
	//scrollTop滚动的高度
	scrollTop:function(){
		return document.body.scrollTop || document.documentElement.scrollTop;
	},
	//scrollLeft滚动的宽度
	scrollLeft:function(){
		return document.body.scrollLeft || document.documentElement.scrollLeft;
	},
	//事件绑定，事件解除
	bind:function(obj,evName,evFn){
		if( obj.addEventListener ){
			obj.addEventListener(evName,evFn,false);
		}else{
			obj.attachEvent("on"+evName,function (){
				evFn.call(obj);	
			})
		}
	},

	unBind:function(obj,evName,evFn){
		if( obj.removeEventListener ){
			obj.removeEventListener(evName,evFn,false);
		}else{
			obj.detachEvent("on"+evName,evFn);
		}	
	},
	//检测碰撞的函数
	crash:function( obj1,obj2 ){
		var obj1L = obj1.offsetLeft;	
		var obj1T = obj1.offsetTop;	
		var obj1W = obj1.offsetWidth;	
		var obj1H = obj1.offsetHeight;

		var obj2L = obj2.offsetLeft;	
		var obj2T = obj2.offsetTop;	
		var obj2W = obj2.offsetWidth;	
		var obj2H = obj2.offsetHeight;	
		//排除没有碰上的区域
		if( obj1W + obj1L < obj2L || obj1H + obj1T < obj2T || obj1L > obj2L + obj2W || obj1T > obj2T + obj2H ){
			return false;
		}else{
			return true;
		}

	},
	//鼠标滚轮事件
	mousewheel:function( obj,upFn,downFn ){
		obj.onmousewheel = wheel;
		if( obj.addEventListener ){
			obj.addEventListener("DOMMouseScroll",wheel,false);
		}
		function wheel(ev){
			var e  = ev || event;
			var direction = true;
			if( e.wheelDelta ){
				direction = e.wheelDelta > 0 ? true : false;
			}
			if( e.detail ){
				direction = e.detail < 0 ? true : false;
			};
			if( direction ){
				upFn && typeof upFn === "function" && upFn(e);
			}else{
				downFn && typeof downFn === "function" && downFn(e);
			}
			//阻止默认行为
			if( e.preventDefault ){
				e.preventDefault();
			};
			e.returnValue = false;
			//return false;
		}
	},
	//封装时间运动函数
	startMove:function(obj, json, fn){
		//if(obj.timer ) return;
		clearInterval(obj.timer);
		obj.timer=setInterval(function (){
			var bStop=true;		
			for(var attr in json){
				var iCur=0;			
				if(attr=='opacity'){
					iCur=parseInt(parseFloat(zpub.getStyle(obj, attr))*100);
				}
				else{
					iCur=parseInt(zpub.getStyle(obj, attr));
				}
				var iSpeed=(json[attr]-iCur)/6;		
				iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);			
				if(iCur!=json[attr]){
					bStop=false;
				}			
				if(attr=='opacity'){
					obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
					obj.style.opacity=(iCur+iSpeed)/100;
				}
				else{
					obj.style[attr]=iCur+iSpeed+'px';
				}
			}		
			if(bStop){
				clearInterval(obj.timer);
				
				fn &&　fn();

				obj.timer = null;
			}
		}, 30)
	}
}