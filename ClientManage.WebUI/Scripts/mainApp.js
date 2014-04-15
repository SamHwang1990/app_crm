/**
 * Created by samhwang1990@gmail.com on 14-4-11.
 * 系统首页初始化视图：~/Home/Index
 */

// Require.js allows us to configure shortcut alias
require.config({
	urlArgs: "bust=v2",                                     //用来避免require的缓存信息
	baseUrl: "Scripts",                                          //更改基目录
	paths: {
		'jquery': 'libs/jquery/jquery-1.11.0.min',            //jQuery 1.11.0 路径
		'bootstrap':'../Content/bootstrap/js/bootstrap.min',  //bootstrap 框架
		'underscore': 'libs/underscore/underscore-min',       //underscore 路径
		'backbone': 'libs/backbone/backbone.min',             //backbone 路径
		'text': 'libs/require/text',                          //require text 插件路径
		'domReady':'libs/require/domReady',                   //require domReady 插件路径
		'config':'config',                                 //系统前端配置JS路径
		'checkLogin':'assets/CheckLogin'                      //检查是否已登录JS路径
	}

});

require(['views/Home/Index'], function (indexView) {
	var index_view = new indexView;
});