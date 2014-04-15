/**
 * Created by samhwang1990@gmail.com on 14-4-9.
 * 初始化登录页面的视图：~/Home/Login
 */

// Require.js allows us to configure shortcut alias
require.config({
	urlArgs: "bust=v2",                                     //用来避免require的缓存信息
	paths: {
		jquery: 'libs/jquery/jquery-1.11.0.min',            //jQuery 1.11.0 路径
		bootstrap:'../Content/bootstrap/js/bootstrap.min',  //bootstrap 框架
		underscore: 'libs/underscore/underscore-min',       //underscore 路径
		backbone: 'libs/backbone/backbone.min',             //backbone 路径
		text: 'libs/require/text',                          //require text 插件路径
		domReady:'libs/require/domReady',                   //require domReady 插件路径
		appConfig:'config',                                 //系统前端配置JS路径
		checkLogin:'assets/CheckLogin'                      //检查是否已登录JS路径
	}

});

require(['views/Home/login'], function (LoginView) {
    var login_view = new LoginView;
});