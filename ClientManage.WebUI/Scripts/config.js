/**
 * Created by samhwang1990@gmail.com on 14-4-12.
 * 前端各JS会用到的共用信息
 */

define([],function(){
	var appConfig = {
		host:'localhost',   //主机名
		port:'49511',   //端口
		sitePath:'http://localhost:49511',   //网站路径
		viewPath:'views',   //前端视图JS的路径
		modelPath:'models', //前端模型JS的路径
		templatePath:'templates',   //前端模板JS的路径
		collectionPath:'collections',   //前端集合JS的路径
		libPath:'libs', //前端库JS的路径
		siteName:'App-ClientManage',    //网站名字
		version:'0.0.0.1'   //网站版本
	};
	return appConfig;
})
