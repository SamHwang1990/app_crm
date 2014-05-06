/***************************************
 * Created by samhwang1990@gmail.com on 14-5-5.
 * Application 创建，以及配置
 ***************************************/

define(['marionette'],function(Marionette){
	var ClientManage = new Marionette.Application();        //实例化Application

	ClientManage.navigate = function(route,  options){      //Backbone的Route导航
		options || (options = {});
		Backbone.history.navigate(route, options);
	};

	ClientManage.getCurrentRoute = function(){              //获取路由片段
		return Backbone.history.fragment
	};

	ClientManage.startSubApp = function(appName, args){
		var currentApp = appName ? ClientManage.module(appName) : null;
		if (ClientManage.currentApp === currentApp){ return; }

		if (ClientManage.currentApp){
			ClientManage.currentApp.stop();                 //关闭当前Module
		}

		ClientManage.currentApp = currentApp;               //重新配置当前Module
		if(currentApp){
			if(appName !== 'SignIn.SignIn' || appName !== 'SignIn.Check'){
				currentApp.on("before:start", function(){   //在Module Start之前出发Check-SignIn事件
					ClientManage.trigger("check:signIn");
				});
				currentApp.trigger("before:start");
			}
			currentApp.start(args);                         //启动Module
		}
	};

	ClientManage.on("initialize:after", function(){
		if(Backbone.history){
			require(['apps/SignIn/SignIn_app'], function () {
				Backbone.history.start();

				if(ClientManage.getCurrentRoute() === ""){
					ClientManage.trigger("check:signIn");  //即index.html页面打开时，默认模拟‘index:show’事件
				}
			});
		}
	});

	return ClientManage;
});
