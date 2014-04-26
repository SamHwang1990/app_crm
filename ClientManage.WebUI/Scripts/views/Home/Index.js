/**
 * Created by samhwang1990@gmail.com on 14-4-12.
 * 系统前端首页系统视图JS
 */

define([
	'jquery',                                       //加载jQuery模块
	'underscore',                                   //加载underscore模块
	'backbone',                                     //加载backbone模块
	'checkLogin',                                   //监测当前用户是否已登录，是，则返回LoginUser Model实例，UserName已赋值
	'models/appConfig',                             //加载配置信息Model，未实例化
	'bootstrap'                                     //加载bootstrap模块
	],function($,_,Backbone,checkLogin,appConfigModel,Bootstrap){
		var indexView = Backbone.View.extend({
			el:"#appBody-content .wrap",                             //#appWrap 是页面内容的根元素
			tempID:'Index',
			initialize:function(){                  //初始化视图中各种框架性的交互行为
				_.bindAll(this, 'render');          //绑定各方法的this对象
				this.render();
			},
			render:function(){
				this.$el.html("/Home/Index，其实这家伙很懒，神码都没放就push出来了");

			}
		});
		return indexView;
	}
);
