//开始菜单 
var start = (function(){
	var oStart = zpub.$('#start');
	var oMenu = zpub.$('.menu',oStart)[0];
	var oMenudis = zpub.$('#menuDis');

	oMenu.onclick = function(ev){
		var e = ev || event;
		e.cancelBubble = true;
		if(oMenudis.style.display === 'none'){
			oMenudis.style.display = 'block';
		}else{
			oMenudis.style.display = 'none';
		}
		
	};
	
	oMenudis.onclick = function(ev){
		var e = ev || event;
		e.cancelBubble = true;
	};

	//menu start
	var oUl = zpub.$('#lists');
	var str = "";
	var one = null;
	var onOff = true;
	var aUl = zpub.$('ul',oUl);
	var aSpan = zpub.$('span',oUl);
	document.onclick = function(){
		oMenudis.style.display = 'none';
		for(var i = 0;i<aUl.length;i++){
			aUl[i].style.display = "none";  
			aSpan[i].innerHTML = "<img src='res/img/jiao.png'/>";
		}
	};

	function fn(shuzu){
		var str = "";
		for( var i = 0; i < shuzu.length; i++ ){
			one = shuzu[i];
			str += "<li>";
			for( var attr in one ){
				if( attr === "child" ){
					onOff = false;
					str += "<ul>";
					
					str += fn(one[attr]);

					str += "</ul>";
				}
				
				if( attr === "title" ){
					if( one["child"] ){
						str += '<h3><em>'+ one.title +'</em><span><img src="res/img/jiao.png"/></span></h3>';
					}else{
						str += '<h3><em>'+ one.title +'</em></h3>';
					}					
				}
				if(attr === 'oimg'){
					str +='<label><img src="res/img/menu/'+one.oimg+'"/></label>'
				}
			};
			str += "</li>";
		}	
		return str;
	}
	oUl.innerHTML = fn(arrMenu);
	var aH3 = zpub.$('h3',oUl);
	for( var i = 0; i < aH3.length; i++ ){
		aH3[i].onclick = function (){
			var parent = this.parentNode;  //父级 li

			var parent_ul = parent.children[2]; //父级 li下面的ul

			var oSpan = this.children[1];

			var ppUl = parent.parentNode;  //父级的父级 ul

			var allUl = ppUl.getElementsByTagName("ul");
			var allSpan = ppUl.getElementsByTagName("span");

			//隐藏掉所有的ul
			for( var i = 0; i < allUl.length; i++ ){
				//如果ul实在显示的，就隐藏，如果已经处在隐藏状态，那么就没必要在隐藏依次，提高一点点性能
				if( allUl[i].style.display === "block" ){
					if( allUl[i] !== parent_ul ){   //排除当前正在操作的ul
						allUl[i].style.display = "none";  
						allSpan[i].innerHTML = "<img src='res/img/jiao.png'/>";
					}
				}

			};

			
			if( !!parent_ul ){  //有下级菜单的时候
				if( parent_ul.style.display === "block" ){
					 parent_ul.style.display = "none";
					 oSpan.innerHTML = "<img src='res/img/jiao.png'/>";
				}else{
					parent_ul.style.display = "block";
					oSpan.innerHTML = "<img src='res/img/jiao2.png'/>";
				}
			}
		};
	};
	//menu end
})();

//time start
var haveTime = (function(){
	function zero(time){
		return time >= 10?time:('0'+time);
	};
	fnTime();
	function fnTime(){
		var oThetime = zpub.$('#thetime'),
			aSpant = zpub.$('span',oThetime), 
		    nowtime = new Date(),
		    nowHour = nowtime.getHours(),
		    nowMin = nowtime.getMinutes(),
		    nowSec = nowtime.getSeconds(),
		    nowYear = nowtime.getFullYear(),
		    nowMon = nowtime.getMonth(),
		    nowDay = nowtime.getDate();

		aSpant[0].innerHTML = zero(nowHour)+ ':' + zero(nowMin) + ':' + zero(nowSec);
		aSpant[1].innerHTML = zero(nowYear)+ '/' + zero(nowMon+1) + '/' + zero(nowDay);	
	};
	setInterval(fnTime,1000);
	
})();
//time end
//weather start
var haveWea = (function(){
	var oWeather = zpub.$('#weather');
	oWeather.onmousedown = function(ev){
		var e = ev || event;
		e.cancelBubble = true;
		var disX = e.clientX - this.offsetLeft;
		var disY = e.clientY - this.offsetTop;
		document.onmousemove = function(ev){
			var e = ev || event;
			l = e.clientX - disX;
			t = e.clientY - disY;
			if(l<=0){
				l = 0;
			};
			if(l>=(zpub.view().W - oWeather.offsetWidth)){
				l = zpub.view().W - oWeather.offsetWidth;
			};
			if(t<=0){
				t = 0;
			};
			if(t>=zpub.view().H - oWeather.offsetHeight){
				t = zpub.view().H - oWeather.offsetHeight;
			}
			oWeather.style.left = l + 'px';
			oWeather.style.top = t + 'px';
		};
		document.onmouseup = function(){
			document.onmousemove = document.onmouseup = null;
			if( oWeather.releaseCapture ){
				oWeather.releaseCapture();
			};
		}
		if( e.preventDefault ){
			e.preventDefault();
		};

		if( oWeather.setCapture ){
			oWeather.setCapture();
		};


	};
})();
//weather end
	

            
