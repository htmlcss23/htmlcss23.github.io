// JavaScript Document

$(function(){
	//tab01
	/*$("#tab-01>li:first").addClass("se");*/
	$("#content-01>div:not(:first)").hide();
	$("#tab-01>li").hover(function(){
		$("#content-01").children(":eq("+$(this).index()+")").show().siblings().hide();
		$(this).addClass("se").siblings().removeClass("se")
	});
	
	
	//tab02
	$("#content-02>div:not(:first)").hide();
	$("#tab-02>li").hover(function(){
		$("#content-02").children(":eq("+$(this).index()+")").show().siblings().hide();
		$(this).addClass("se").siblings().removeClass("se")
	});
	
	
	//tab03
	$("#content-03>div:not(:first)").hide();
	$("#tab-03>li").hover(function(){
		$("#content-03").children(":eq("+$(this).index()+")").show().siblings().hide();
		$(this).addClass("se").siblings().removeClass("se")
	});
})