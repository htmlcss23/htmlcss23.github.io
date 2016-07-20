window.onload = function(){
	//背景桌面开始
	var oPagewrap = zpub.$('#pagewrap');
	var osmall = zpub.$('#smallIcon');
	var aSmallIcon = zpub.$('span',osmall);
	var aPage = zpub.$('.page');
	oPagewrap.style.width = zpub.view().W *aPage.length + 'px'; 
	oPagewrap.style.height = zpub.view().H + 'px';
	var oLeft = 0;
	var onOff = true;
	for(var i = 0;i<aPage.length;i++){
		//给每个page加宽度；
		aPage[i].style.width = 100/aPage.length + '%';

		aSmallIcon[i].index = i;
		aSmallIcon[i].onclick = function(){
			if(!onOff) return;
			onOff = false;
			for(var j = 0;j<aSmallIcon.length;j++){
				aSmallIcon[j].className = '';
			}
			oLeft = -this.index;
			this.className = 'se';
			zpub.startMove(oPagewrap,{left:oLeft*zpub.view().W},function(){
				onOff = true;
			});
		}
	};
	var timer = null;	
	function roll(){
			timer = setInterval(function(){		
			oLeft --;		
			if(Math.abs(oLeft) >= aPage.length){
				oLeft = 0;
			}
			zpub.startMove(oPagewrap,{left:oLeft*zpub.view().W });
			//oPagewrap.style.left = oLeft*100 + '%';
		},10000);
	}
	//roll();
	document.onkeydown = function(ev){
		var e = ev || event;
		if( e.keyCode === 37){
			leftFn();
		}
		if( e.keyCode === 39){
			rightFn();
		}
	}
	//滚轮	
	//向右滚动	
	zpub.mousewheel(oPagewrap,leftFn,rightFn);		
	function rightFn(){	
		//clearInterval(timer);
		if(!onOff) return;
		onOff = false;
		oLeft --;		
		if(Math.abs(oLeft) >= aPage.length){
			oLeft = 0;
		}
		zpub.startMove(oPagewrap,{left:oLeft*zpub.view().W },function(){
			onOff = true;
		})
		for(var i = 0;i<aSmallIcon.length;i++){
			aSmallIcon[i].className = '';
		}
		aSmallIcon[Math.abs(oLeft)].className = 'se';
		//oPagewrap.style.left = oLeft*100 + '%';	
		//roll();
	};
	//向左滚动	
	function leftFn(){
		if(!onOff) return;
		onOff = false;		
		if(oLeft >= 0){
			oLeft = -(aPage.length);
		}
		oLeft++;
		zpub.startMove(oPagewrap,{left:oLeft*zpub.view().W},function(){
			onOff = true;
		})
		for(var i = 0;i<aSmallIcon.length;i++){
			aSmallIcon[i].className = '';
		}
		aSmallIcon[Math.abs(oLeft)].className = 'se';
		//oPagewrap.style.left = oLeft*100 + '%';		
	};
	window.onscroll = window.onresize = function(){			
		oPagewrap.style.width = zpub.view().W *aPage.length + 'px'; 
		oPagewrap.style.height = zpub.view().H + 'px';
		oPagewrap.style.left = zpub.view().W *oLeft + 'px';

	}
	//背景桌面结束
	//navleft start
	navleftFn();
	function navleftFn(){
		var oLeftnav = zpub.$('#leftnav');
		var oNavs = zpub.$('#navs');
		var oNavul = zpub.$('ul',oLeftnav)[0];
		var aLi = zpub.$("li",oLeftnav);	
		var aImg = zpub.$('img',oLeftnav);
		oNavs.onclick = function(){//onmouseenter
			oLeftnav.style.display = 'block';
			oNavs.style.display = 'none';		
			zpub.startMove(oLeftnav,{left:'0'},function(){});
		};
		oLeftnav.onclick = function(){//onmouseleave
			clearInterval(oLeftnav.timer);
			oLeftnav.timer = null;			
			zpub.startMove(oLeftnav,{left:'-100'},function(){
				oLeftnav.style.display = 'none';
				oNavs.style.display = 'block';
			});						
		};	
		oNavul.onmousemove = function(ev){
			var d=0;
			var e = ev || event;
			function getDis(obj){		
				return Math.sqrt(
					Math.pow(obj.offsetLeft + oLeftnav.offsetLeft - e.clientX+obj.offsetWidth/2,2)+
					Math.pow(obj.offsetTop + oLeftnav.offsetTop - e.clientY+obj.offsetHeight/2,2)
				)
			};		
			for(var i = 0; i<aLi.length;i++){
				d=getDis(aLi[i]);
				var scale = 0.8 - d/300;			
				if(scale < 0.5){
					scale = 0.5;
				}

				aLi[i].style.width = scale*68 +"px";
				aLi[i].style.height = scale*68 +"px";
			}
		}
		oNavul.onmouseleave = function(){
			for(var i = 0; i<aLi.length;i++){			
				aLi[i].style.width = 34 +"px";
				aLi[i].style.height = 34 +"px";
			}
		}
	};	
	//navleft end

	//drag start
	var oApp = zpub.$('.app')[0];
	var aAppLi = zpub.$('li',oApp);
	/*var arr = [];	
	for(var i = 0;i<aAppLi.length;i++){
		arr.push({
			left:aAppLi[i].offsetLeft,
			top:aAppLi[i].offsetTop
		})
	};
	for(var j = 0; j<aAppLi.length;j++){
		aAppLi[j].style.position = 'absolute';
		aAppLi[j].style.left = arr[j].left + 'px';
		aAppLi[j].style.top = arr[j].top + 'px';
		aAppLi[j].style.margin = '0';
		drag(aAppLi[j]);
	};*/
	for(var i=0;i<aAppLi.length;i++){
		drag(aAppLi[i]);
	}
	function bian(){
		var arr = [];
		for(var i = 0;i<aAppLi.length;i++){
			arr.push({
				left:aAppLi[i].offsetLeft,
				top:aAppLi[i].offsetTop
			})
		};
		for(var j = 0; j<aAppLi.length;j++){
			aAppLi[j].style.position = 'absolute';
			aAppLi[j].style.left = arr[j].left + 'px';
			aAppLi[j].style.top = arr[j].top + 'px';
			aAppLi[j].style.margin = '0';
		};
	}
	
	//dragFn
	var zIndexs = 0;
	function drag(obj){	              
		obj.onmousedown = function(ev){	
			bian();
			var e = ev || event;
			e.cancelBubble = true;	
			var cloneObj = obj.cloneNode(true);
			var objParent = obj.parentNode;
			objParent.appendChild(cloneObj);
			cloneObj.style.opacity = '0.5';
			cloneObj.style.filter = 'alpha(opacity = 50)';
			zIndexs ++;
			obj.style.zIndex = zIndexs;		
			
			var disX = e.clientX - obj.offsetLeft;
			var disY = e.clientY - obj.offsetTop;
			var a = 0;
			var b = 0;
			 
			function fn1(ev){
				var e = ev || event;

				var l = e.clientX - disX;
				var t = e.clientY - disY;
				if(l <= 0){
					l = 0;
				};
				if(t <= 0){
					t = 0;
				};
				if(l >= (zpub.view().W - obj.offsetWidth)){
					l = (zpub.view().W - obj.offsetWidth);
				};
				if(t >= (zpub.view().H - obj.offsetHeight)){
					t = (zpub.view().H - obj.offsetHeight);
				};
				cloneObj.style.left = a = l + 'px';
				cloneObj.style.top = b = t + 'px';								
			};
			document.onmousemove = fn1;
			function fn2(ev){
				var e = ev || event;	
			    e.cancelBubble = true;		
				if(Math.abs(cloneObj.offsetLeft-obj.offsetLeft) > cloneObj.offsetWidth/2 || Math.abs(cloneObj.offsetTop-obj.offsetTop) > cloneObj.offsetHeight/2){		
					obj.style.left = a;
					obj.style.top = b;
				}	
				objParent.removeChild(cloneObj);					
				document.onmousemove = document.onmouseup = null;			
				if( obj.releaseCapture ){
					obj.releaseCapture();
				}				
			}
		    document.onmouseup = fn2;
			if( e.preventDefault ){
				e.preventDefault();
			};

			if( obj.setCapture ){
				obj.setCapture();
			}
		}							
	};
	//drag end
	//检测碰撞的函数
	function pengzhuang( obj1,obj2 ){
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
	};
	//检测碰撞的函数	
	//画方块开始	
	draw();		
	function draw(){
		document.onmousedown = function(ev){
			for(var i = 0;i<aAppLi.length;i++){
				aAppLi[i].className = '';
			};			
			var e = ev || event;
			var drawDiv = document.createElement('div');
			drawDiv.className = 'drawDiv';
			var disX = e.clientX;
			var disY = e.clientY;
			drawDiv.style.left = e.clientX + 'px';
			drawDiv.style.top = e.clientY + 'px';
			var oMain = zpub.$('.main')[0];
			oMain.appendChild(drawDiv);
			document.onmousemove = function(ev){
				var e = ev || event;
				var w = e.clientX - disX;
				var h = e.clientY - disY;

				var x = w < 0 ? e.clientX : disX;
				var y = h < 0 ? e.clientY : disY;

				drawDiv.style.left = x + "px";	
				drawDiv.style.top = y + "px";

				drawDiv.style.width = Math.abs(w) + "px";	
				drawDiv.style.height = Math.abs(h) + "px";

				for(var i = 0;i<aAppLi.length;i++){
					if(pengzhuang(drawDiv,aAppLi[i])){
						aAppLi[i].className = 'se';
					};
				}				
				return false;
			};
			document.onmouseup = function(){
				document.onmousemove = document.onmouseup = null;						
				oMain.removeChild(drawDiv);
				//整体拖拽

				allDrag();
				function allDrag(){
					var arrTotal = [];
					for(var i = 0 ;i<aAppLi.length;i++){
						if(aAppLi[i].className === 'se'){
							arrTotal.push(aAppLi[i]);					
						}
					};
					var arrTotal2=[];
					for(var j = 0;j<arrTotal.length;j++){
						drag2(arrTotal[j]);	
						arrTotal2.push({left:arrTotal[j].offsetLeft,top:arrTotal[j].offsetTop})					
					};
					
					function drag2(obj){
						obj.onmousedown = totalFn1;						
						function totalFn1(ev){
							var e = ev || event;
							e.cancelBubble = true;
							olddisX = e.clientX;
							olddisY = e.clientY;							
							 
							document.onmousemove = totalFn2;
							function totalFn2(ev){
								var e = ev || event;
								//e.cancelBubble = true;
								newdisX = e.clientX;
								newdisY = e.clientY;
								for(var i = 0;i<arrTotal.length;i++){
									arrTotal[i].style.left = arrTotal2[i].left + (newdisX-olddisX) + 'px';
									arrTotal[i].style.top = arrTotal2[i].top + (newdisY-olddisY) + 'px';
								}				

							};
							document.onmouseup = totalFn3;
							function totalFn3(){
								//arrTotal = [];
								//arrTotal2=[];

								document.onmousemove = document.onmouseup = null;
								for(var z = 0;z<aAppLi.length;z++){
									aAppLi[z].className = '';
									drag(aAppLi[z]);
								}
								if( obj.releaseCapture ){
									obj.releaseCapture();
								}
							};
							if( e.preventDefault ){
								e.preventDefault();
							};

							if( obj.setCapture ){
								obj.setCapture();
							}
						};
						
					}
				};	
				//整体拖拽			
			};
			return false;
		};

	}
	//画方块结束
			
}
