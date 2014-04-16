/**
 * Created by samhwang1990@gmail.com on 14-4-16.
 * 用来初始化系统界面，包括UI、基本交互等
 */

define(['jquery'],function($){
	var adminMenuWrap = $("#adminMenuWrap");

	//处理li的Hover状态
	var handleLiHover = function(){

		//绑定各li的mouseenter 事件
		adminMenuWrap.on("mouseenter","ul.adminMenu>li.app-not-current-subMenu",function(){

			//隐藏所有li.app-not-current-subMenu 的submenu 浮动框
			adminMenuWrap.find("ul.adminMenu>li.app-not-current-subMenu").removeClass("app-subMenu-open");

			//如果当前li 有submenu，则显示submenu在右边
			if($(this).has("ul.app-subMenu")){
				$(this).addClass("app-subMenu-open");
			}
		});

		//绑定各li的mouseleave 事件
		adminMenuWrap.on("mouseleave","ul.adminMenu>li.app-not-current-subMenu",function(){
			//隐藏所有li.app-not-current-subMenu 的submenu 浮动框
			adminMenuWrap.find("ul.adminMenu>li.app-not-current-subMenu").removeClass("app-subMenu-open");
		});
	};

	//处理li的Click事件，可能是从a的click冒泡而来
	var handleLiClick = function(){

		//绑定各li的click 事件
		adminMenuWrap.on("click","ul.adminMenu>li.app-not-current-subMenu",function(){

			//隐藏li.app-has-current-subMenu 的子菜单
			adminMenuWrap.find("ul.adminMenu>li.app-has-current-subMenu")
				.removeClass("app-has-current-subMenu")
				.removeClass("app-menu-open")
				.addClass("app-not-current-subMenu");

			//给当前li 添加类，显示蓝色背景
			$(this).addClass("app-has-current-subMenu");

			//如果当前li 有submenu，显示在下面
			if($(this).has("ul.app-subMenu")){
				$(this).addClass("app-menu-open");
			}
		});
	};

	return {
		init:function(){

			handleLiHover();    //绑定adminMenu 的li hover状态

			handleLiClick();    //绑定adminMenu 的li click事件
		}
	}
});