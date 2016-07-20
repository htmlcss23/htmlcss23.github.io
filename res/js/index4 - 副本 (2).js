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

	var oApp = zpub.$('.app')[0];
	var aAppLi = zpub.$('li',oApp);
	window.onscroll = window.onresize = function(){			
		oPagewrap.style.width = zpub.view().W *aPage.length + 'px'; 
		oPagewrap.style.height = zpub.view().H + 'px';
		oPagewrap.style.left = zpub.view().W *oLeft + 'px';

		appDis();

	}
	//背景桌面结束
	//navleft start
	navleftFn();
	function navleftFn(){
		var oLeftnav = zpub.$('#leftnav');
		var oNavs = zpub.$('#navs');
		var oNavul = zpub.$('ul',oLeftnav)[0];
		var oBack = zpub.$('.back')[0];
		var aLi = zpub.$("li",oLeftnav);	
		var aImg = zpub.$('img',oLeftnav);
		oNavs.onclick = function(){//onmouseenter
			oLeftnav.style.display = 'block';
			oNavs.style.display = 'none';		
			zpub.startMove(oLeftnav,{left:'0'},function(){});
		};
		oBack.onclick = function(){//onmouseleave
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
	for(var i=0;i<aAppLi.length;i++){
		drag(aAppLi[i]);
	}
	//var onOff2 = true;
	appDis();
	function appDis(){

		/*if(!onOff2) return;
		onOff2 = false;*/
		var count=Math.floor(zpub.view().H/150)
		for(var i = 0;i<aAppLi.length;i++){
			
			aAppLi[i].style.display = 'block';
			aAppLi[i].style.position = 'absolute';
			/*aAppLi[i].style.left = Math.floor(i/count)*120 +100 + 'px';
			aAppLi[i].style.top = (i%count)*120 + 100 +'px';*/
			
			zpub.startMove(aAppLi[i],{left:Math.floor(i/count)*120 +100,top:(i%count)*120 + 100 },function(){

			});			
		};
	}
	
	//dragFn
	var zIndexs = 0;
	function drag(obj){	              
		obj.onmousedown = function(ev){	
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
	var onOffss = true;	
	draw();		
	function draw(){		
		document.onmousedown = function(ev){
			if(!onOffss) return;
			for(var i = 0;i<aAppLi.length;i++){
				aAppLi[i].className = '';
			};			
			var e = ev || event;
			var drawDiv = document.createElement('div');
			drawDiv.className = 'drawDiv';
			drawDiv.style.position = 'absolute';
			var disX = e.clientX;
			var disY = e.clientY;
			drawDiv.style.left = e.clientX +3+ 'px';
			drawDiv.style.top = e.clientY +3+ 'px';
			var oMain = zpub.$('.main')[0];
			oMain.appendChild(drawDiv);
			document.onmousemove = function(ev){
				var e = ev || event;
				var w = e.clientX - disX;
				var h = e.clientY - disY;

				var x = w < 0 ? e.clientX : disX;
				var y = h < 0 ? e.clientY : disY;

				drawDiv.style.left = x +3 + "px";	
				drawDiv.style.top = y +3 + "px";

				drawDiv.style.width = Math.abs(w) + "px";	
				drawDiv.style.height = Math.abs(h) + "px";

				for(var i = 0;i<aAppLi.length;i++){
					if(pengzhuang(drawDiv,aAppLi[i])){
						aAppLi[i].className = 'se';
					}else{
						aAppLi[i].className = '';
					};
				}				
				return false;
			};
			document.onmouseup = function(ev){
				document.onmousemove = document.onmouseup = null;
				//oMenudis.style.display = 'none';
				//此处触发的是画的小div的up事件。解决冲突；也可以把上面down处drawDiv.style.left = x -3 + "px";	drawDiv.style.top = y -3 + "px";						
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
								e.cancelBubble = true;
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
	//点击出现新窗口
	for(var i = 0;i<aAppLi.length;i++){
		aAppLi[i].onOff = true;
		aAppLi[i].index = i;
		aAppLi[i].ondblclick = function(){

			if(!this.onOff) return;
			var str = 'newView' + this.index;
			var str = new NewView(aAppLi[this.index]);
			this.onOff = false;	
			onOffss = false;		
		}
	}
	function NewView(obj){
		this.obj = obj;
		this.viewSrc = this.obj.getAttribute('data');
		this.init();
	};
	var zin = 100;
	NewView.prototype.init= function(){
		var oDrawView = zpub.$('.drawView')[0];
		var oCloneView = oDrawView.cloneNode(true);
		
		//var oIframe = zpub.$('iframe',oCloneView);
		//console.log(oIframe.getAttribute('class'));
		oDrawIframe = zpub.$('.drawIframe',oCloneView)[0];
		var html = '<iframe src="'+this.viewSrc+'"  frameborder="no" allowtransparency="yes" ></iframe>';
		oDrawIframe.innerHTML += html;
		oCloneView.onclick = function(){
			
			zin++;
			this.style.zIndex = zin;
			//oMask.style.display = 'none';
		}		
		oCloneView.style.display = 'block';
		body.appendChild(oCloneView);
		oDrawIframe.style.height = oCloneView.offsetHeight - 40 + 'px';
		zpub.bind(window,"resize",fns);
		function fns(){
			oDrawIframe.style.height = oCloneView.offsetHeight - 40 + 'px';
		}
		var oDrawH3 = zpub.$('.drawH3',oCloneView)[0];
		this.dragView(oDrawH3);
		var oh3Span = zpub.$('span',oDrawH3);
		var that = this;
		//缩小窗口
		oh3Span[0].onclick = function(){
			that.changeSmall(oCloneView);
		};
		//放大窗口
		oh3Span[1].onclick = function(){
			that.changeBig(oCloneView);
		};
		//关闭		
		oh3Span[2].onclick = function(){
			that.closes(oCloneView);
		};
		//拖拽放大，缩小
		var oJiaotL = zpub.$('.jiaotL',oCloneView)[0],
			oJiaotR = zpub.$('.jiaotR',oCloneView)[0],
			oJiaobL = zpub.$('.jiaobL',oCloneView)[0],
			oJiaobR = zpub.$('.jiaobR',oCloneView)[0];
		
		that.leftTop(oJiaotL);
		that.rightTop(oJiaotR);
		that.leftBottom(oJiaobL);
		that.rightBottom(oJiaobR);
				
	};
	NewView.prototype.dragView = function(objs){
		var oMask = zpub.$('.mask',objs.parentNode)[0];
		objs.onmousedown = function(ev){
			oMask.style.display = 'block';			
			var e = ev || event;
			e.cancelBubble = true;

			var objsParent = objs.parentNode;

			var disX = e.clientX - objsParent.offsetLeft;
			var disY = e.clientY - objsParent.offsetTop;

			document.onmousemove = function(ev){
				var e = ev || event;
				e.cancelBubble = true;
				var l = e.clientX - disX;
				var t = e.clientY - disY;

				if(l <= 0){
					l = 0;
				};
				if(t <= 0){
					t = 0;
				};
				if(l >= (zpub.view().W - objsParent.offsetWidth)){
					l = (zpub.view().W - objsParent.offsetWidth);
				};
				if(t >= (zpub.view().H - objsParent.offsetHeight)){
					t = (zpub.view().H - objsParent.offsetHeight);
				};

				objsParent.style.left = l + 'px';
				objsParent.style.top = t + 'px';
			};
			document.onmouseup = function(){
				document.onmousemove = document.onmouseup = null;
				oMask.style.display = 'none';
				if( objs.releaseCapture ){
					objs.releaseCapture();
				}
			}
			//因为有iframe鼠标移动到iframe后还没有up会继续触发move；
			/*var a = zpub.$('.drawIframe',objsParent)[0];
			ifs = zpub.$('iframe',a)[0];
			ifs.onmouseover = function(){
				document.onmousemove = document.onmouseup = null;
			}*/
			
			if( e.preventDefault ){
				e.preventDefault();
			};

			if( objs.setCapture ){
				objs.setCapture();
			};
		};
	};
	//缩小
	NewView.prototype.changeSmall = function(grand){
		var that = this;
		var oFooter = zpub.$('#footer');
		var oAppnows = zpub.$('#appNows');
		var oSmalla = document.createElement('div');
		oSmalla.className = 'appNow';
		var oSrc = this.obj.children[0].children[0].src;
		oSmalla.innerHTML = '<img src="'+oSrc+'">';
		oAppnows.appendChild(oSmalla);
		var appjson = {left:oSmalla.offsetLeft,top:oFooter.offsetTop};

		/*grand.style.width = 0 + 'px';
		grand.style.height = 0 + 'px';*/
		var grandjson = {
			width:parseInt(grand.clientWidth),
			height:parseInt(grand.clientHeight),
			left:parseInt(grand.offsetLeft),
			top:parseInt(grand.offsetTop)
		}

		zpub.startMove(grand,{width:0,height:0,left:appjson.left+20,top:appjson.top+20},function(){
			oSmalla.style.visibility = 'visible';
			grand.style.display = 'none';						
		});
		var oClose = document.createElement('div');
		oSmalla.onmouseenter = function(){
			
			oClose.className = 'rightClose';
			oClose.innerHTML = '<span>还原</span><span>关闭</span>';
			oSmalla.appendChild(oClose);
			var sps = zpub.$('span', oSmalla);
			sps[1].onclick = function(ev){
				var e = ev || event;
				e.cancelBullble = true;
				that.obj.onOff = true;
				body.removeChild(grand);
				oAppnows.removeChild(oSmalla);
				onOffss = true;
			};
			sps[0].onclick = function(){
				oSmalla.style.visibility = 'hidden';
				grand.style.display = 'block';
				zpub.startMove(grand,{width:grandjson.width,height:grandjson.height,left:grandjson.left,top:grandjson.top},function(){
					oAppnows.removeChild(oSmalla);
					grand.style.display = 'block';						
				});
			};
		};
		oSmalla.onmouseleave = function(){
			if(oClose){
				oSmalla.removeChild(oClose);
			}
			
		}
		/*oSmalla.onclick = function(){
			oSmalla.style.visibility = 'hidden';
			grand.style.display = 'block';
			zpub.startMove(grand,{width:grandjson.width,height:grandjson.height,left:grandjson.left,top:grandjson.top},function(){
				oAppnows.removeChild(oSmalla);
				grand.style.display = 'block';						
			});
		};*/
		/*oSmalla.oncontextmenu = function(){
			var oClose = document.createElement('div');
			oClose.className = 'rightClose';
			oClose.innerHTML = '关闭窗口';
			oSmalla.appendChild(oClose);
			oClose.onclick = function(ev){
				var e = ev || event;
				e.cancelBullble = true;
				that.obj.onOff = true;
				body.removeChild(grand);
				oAppnows.removeChild(oSmalla);
			}
		};*/
	}
	//放大
	NewView.prototype.changeBig = function(grand){
		grand.style.width = zpub.view().W - 10 + 'px';
		grand.style.height = zpub.view().H - 10 + 'px';
		grand.style.left = '0';
		grand.style.top = '0';
		/*zpub.startMove(grand,{left:0,top:0},function(){			
		});*/
		zpub.$('.drawIframe',grand)[0].style.height = grand.offsetHeight - 40 + 'px';
		zpub.bind(window,"resize",fns);
		function fns(){
			grand.style.width = zpub.view().W - 10 + 'px';
			grand.style.height = zpub.view().H - 10 + 'px';
			grand.style.left = '0';
			grand.style.top = '0';
			zpub.$('.drawIframe',grand)[0].style.height = grand.offsetHeight - 40 + 'px';
		}
	}
	//关闭
	NewView.prototype.closes = function(grand){
		this.obj.onOff = true;
		body.removeChild(grand);
		onOffss = true;
	}
	//点击出现新窗口结束

	//拖拽放大缩小
	NewView.prototype.leftTop = function(ne){
		var oMask = zpub.$('.mask',ne.parentNode)[0];
		var t = ne.parentNode.offsetLeft;
		ne.onmousedown = function(ev){
			oMask.style.display = 'block';
			var e = ev || event;
			e.cancelBubble = true;
			var disX = e.clientX + ne.parentNode.clientWidth;
			var disY = e.clientY + ne.parentNode.clientHeight;
			var x = e.clientX - ne.parentNode.offsetLeft;
			var y = e.clientY - ne.parentNode.offsetTop;
			var m = (ne.parentNode.offsetWidth - 200)+t;
			console.log( m );
			document.onmousemove = function(ev){
				var e = ev || event;
				var w = e.clientX - disX;
				var h = e.clientY - disY;
				var newL = e.clientX - x;
				var newT = e.clientY - y;
				console.log( Math.abs(w), newL );
				if(Math.abs(w)<=200){
					w = 200;
					newL = ne.parentNode.offsetLeft;
				};

				/*if( newL > m ){
					newL = m;
				}*/
				console.log( newL );

				if(Math.abs(h)<200){
					h = 200;
					newT = ne.parentNode.offsetTop;					
				};

				ne.parentNode.style.left = newL + 'px';
				ne.parentNode.style.top = newT + 'px';
				ne.parentNode.style.width = Math.abs(w) + "px";
				ne.parentNode.style.height = Math.abs(h) + "px";
				zpub.$('.drawIframe',ne.parentNode)[0].style.height = ne.parentNode.offsetHeight - 40 + 'px';
				
			};
			document.onmouseup = function(){
				document.onmousemove = document.onmouseup = null;
				oMask.style.display = 'none';
				if( ne.releaseCapture ){
					ne.releaseCapture();
				}

				t = ne.parentNode.offsetLeft;
			};
			if( e.preventDefault ){
				e.preventDefault();
			};

			if( ne.setCapture ){
				ne.setCapture();
			};
		}	
	};

	/////////////////////////

	NewView.prototype.rightTop = function(ne){
		var oMask = zpub.$('.mask',ne.parentNode)[0];
		ne.onmousedown = function(ev){
			oMask.style.display = 'block';
			var e = ev || event;
			e.cancelBubble = true;
			var disX = e.clientX - ne.parentNode.clientWidth;
			var disY = e.clientY + ne.parentNode.clientHeight;
			var y = e.clientY - ne.parentNode.offsetTop;
			document.onmousemove = function(ev){
				var e = ev || event;
				var w = e.clientX - disX;
				var h = e.clientY - disY;
				var newT = e.clientY - y;

				if(Math.abs(w)<200){
					w = 200;
				};

				if(Math.abs(h)<200){
					h = 200;
					newT = ne.parentNode.offsetTop;	
					console.log(newT)				
				};

				ne.parentNode.style.top = newT + 'px';
				ne.parentNode.style.width = Math.abs(w) + "px";
				ne.parentNode.style.height = Math.abs(h) + "px";
				zpub.$('.drawIframe',ne.parentNode)[0].style.height = ne.parentNode.offsetHeight - 40 + 'px';
				
			};
			document.onmouseup = function(){
				document.onmousemove = document.onmouseup = null;
				oMask.style.display = 'none';
				if( ne.releaseCapture ){
					ne.releaseCapture();
				}
			};
			if( e.preventDefault ){
				e.preventDefault();
			};

			if( ne.setCapture ){
				ne.setCapture();
			};
		}	
	};

	/////////////////////////
	NewView.prototype.leftBottom = function(ne){
		var oMask = zpub.$('.mask',ne.parentNode)[0];		
		ne.onmousedown = function (ev){
			oMask.style.display = 'block';		
			var e = ev || event;
			e.cancelBubble = true;
			var disX = e.clientX + ne.parentNode.clientWidth;
			var disY = e.clientY - ne.parentNode.clientHeight;
			var x = e.clientX - ne.parentNode.offsetLeft;
			document.onmousemove = function (ev){
				var e = ev || event;
				var w = e.clientX - disX;
				var h = e.clientY - disY;
				var newL = e.clientX - x;

				if(Math.abs(w)<200){
					w = 200;
					/*var s = e.clientX;
					newL = s - x;*/
					newL = ne.parentNode.offsetLeft;
					
				};

				if( w === 200 ){
					newL = ne.parentNode.offsetLeft;
				}

				if(Math.abs(h)<200){
					h = 200;					
				};

				ne.parentNode.style.left = newL + "px";	
				ne.parentNode.style.width = Math.abs(w) + "px";	
				ne.parentNode.style.height = Math.abs(h) + "px";
				zpub.$('.drawIframe',ne.parentNode)[0].style.height = ne.parentNode.offsetHeight - 40 + 'px';
			};
			document.onmouseup = function (){
				document.onmousemove = null;
				document.onmouseup = null;
				oMask.style.display = 'none';
				if( ne.releaseCapture ){
					ne.releaseCapture();
				}
			};
			if( e.preventDefault ){
				e.preventDefault();
			};

			if( ne.setCapture ){
				ne.setCapture();
			};
		};	
	};
	//////////////////////
	NewView.prototype.rightBottom = function(ne){
		var oMask = zpub.$('.mask',ne.parentNode)[0];
		ne.onmousedown = function (ev){
			oMask.style.display = 'block';
			var e = ev || event;
			e.cancelBubble = true;
			var disX = e.clientX - ne.parentNode.clientWidth;
			var disY = e.clientY - ne.parentNode.clientHeight;

			document.onmousemove = function (ev){
				var e = ev || event;

				var w = e.clientX - disX;
				var h = e.clientY - disY;

				if(Math.abs(w)<200){
					w = 200;
				};

				if(Math.abs(h)<200){
					h = 200;					
				};

				ne.parentNode.style.width = Math.abs(w) + "px";	
				ne.parentNode.style.height = Math.abs(h) + "px";
				zpub.$('.drawIframe',ne.parentNode)[0].style.height = ne.parentNode.offsetHeight - 40 + 'px';
			};
			document.onmouseup = function (){
				document.onmousemove = null;
				document.onmouseup = null;
				oMask.style.display = 'none';
				if( ne.releaseCapture ){
					ne.releaseCapture();
				}
			};
			if( e.preventDefault ){
				e.preventDefault();
			};

			if( ne.setCapture ){
				ne.setCapture();
			};
		};	
	};
	////////////////////////////////
}
