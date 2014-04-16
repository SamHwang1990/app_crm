/**
 * Created by samhwang1990@gmail.com on 14-4-12.
 * 系统前端首页系统视图JS
 */

define([
	'jquery',                                       //加载jQuery模块
	'underscore',                                   //加载underscore模块
	'backbone',                                     //加载backbone模块
	'checkLogin',                                   //监测当前用户是否已登录，是，则返回LoginUser Model实例，UserName已赋值
	'models/LoginUser',                             //加载LoginUser Model，未实例化
	'models/appConfig',                             //加载配置信息Model，未实例化
	'bootstrap',                                    //加载bootstrap模块
	'assets/AppUISet',                              //加载AppUISet 初始化页面UI
	'text!templates/Common/adminMenu.html',         //加载左侧菜单html模板
	'text!templates/Common/appAdminBar.html',       //加载顶部功能调html模板
	'text!templates/Common/appBody-content.html',   //加载首页主内容html模板
	'text!templates/Common/Footer.html'             //加载底部Footer的html模板
	],function($,_,Backbone,checkLogin,UserModel,appConfigModel,Bootstrap,UISet,adminMenuTemp,appAdminBarTemp,appBodyContentTemp,footerTemp){
		var indexView = Backbone.View.extend({
			el:"#appWrap",                          //#appWrap 是页面内容的根元素
			model:{                                 //设置视图的Model对象
				CurrentUser:checkLogin,             //当前登录用户信息，其实只有用户名而已
				AppConfig:new appConfigModel()      //还没想好哪里会用到
			},
			events:{
				'click .adminMenu a':'menuLinkClick'//绑定<a/> click事件处理
			},
			initialize:function(){                  //初始化视图中各种框架性的交互行为
				_.bindAll(this, 'render','menuLinkClick','ShowRouteViewContent');          //绑定各方法的this对象
				this.render();
			},
			render:function(){
				//将模型对象及其属性转换为JSON对象
				var templateData={};
				templateData.AppConfig = this.model.AppConfig.toJSON();
				templateData.CurrentUser = this.model.CurrentUser.toJSON();

				//模板解析，并插入DOM
				var appAdminBarHtml = _.template(appAdminBarTemp);                      //解析#appAdminBar的模板
				this.$el.find("#appAdminBar").html(appAdminBarHtml(templateData));      //传入数据给模板，并绑定到DOM中

				var footerHtml = _.template(footerTemp);                                //解析#appFooter的模板
				this.$el.find("#appFooter").html(footerHtml(templateData.AppConfig));

				var adminMenuHtml = _.template(adminMenuTemp);                          //解析#adminMenuTemp的模板
				this.$el.find("#adminMenuWrap").html(adminMenuHtml(templateData.AppConfig));
				UISet.init();                                                           //绑定adminMenu的事件处理程序

			},
			//左侧菜单导航的<a/> 点击事件处理方法
			menuLinkClick:function(e){
				e.preventDefault();

				var linkElement = e.target;

				//获取a 的href路由值
				//比如：http://localhost:3000/Home/Index => Home/Index，sitePath=http://localhost:3000
				var linkRoute = linkElement.href.slice(this.model.AppConfig.toJSON().sitePath.length+1);
				//将路由值分割成数组
				var linkRouteArray = linkRoute.split('/');

				this.ShowRouteViewContent(linkRouteArray);

			},
			//根据传入的路由数组渲染对应的视图
			ShowRouteViewContent:function(routeArray){
				var appConfig = this.model.AppConfig.toJSON();
				var viewPath = appConfig.viewPath;
				var modelPath = appConfig.modelPath;
				var collectionPath = appConfig.collectionPath;
				var templatePath = appConfig.templatePath;
				//引入视图文件
				//以Temp作为一个例子
				require(['views/Home/Temp'],function(tempView){
					var temp_View = new tempView;
				});
			}

		});
		return indexView;
	}
);
