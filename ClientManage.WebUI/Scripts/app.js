/***************************************
 * Created by samhwang1990@gmail.com on 14-5-5.
 * Application 创建，以及配置
 ***************************************/

define(['marionette','backbone.relational','bootstrap'],function(Marionette,Backbone_Relational,Bootstrap){
	var ClientManage = new Marionette.Application();        //实例化Application

	ClientManage.navigate = function(route,  options){      //Backbone的Route导航函数
		options || (options = {});
		Backbone.history.navigate(route, options);
	};

	ClientManage.getCurrentRoute = function(){              //获取路由片段
		return Backbone.history.fragment
	};

	ClientManage.startSubApp = function(appName, args){     //启动新Module，并关闭旧的
		var currentApp = appName ? ClientManage.module(appName) : null;
		if (ClientManage.currentApp === currentApp){ return; }

		if (ClientManage.currentApp){
			ClientManage.currentApp.stop();                 //关闭当前Module
			//delete ClientManage[appName];
		}

		ClientManage.currentApp = currentApp;               //重新配置当前Module
		if(currentApp){
			currentApp.start(args);                         //启动Module
		}
	};

	ClientManage.addInitializer(function(){
		ClientManage.addRegions({                       //当前Module下注册Region
			bodyRegion: "body"
		});
	})

	ClientManage.on("initialize:after", function(){
		if(Backbone.history){
			require(['apps/SignIn/SignIn_app'], function(){
				Backbone.history.start();
				ClientManage.trigger("check:signIn");   //默认打开程序时检查是否登录
			});
		}
	});

	return ClientManage;
});
