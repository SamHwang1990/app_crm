/***************************************
 * Created by samhwang1990@gmail.com on 14-4-17.
 * Home/Index 的视图
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'checkLogin',                                   //监测当前用户是否已登录，是，则返回LoginUser Model实例，UserName已赋值
	'models/Home/Feedback',                         //加载Home/Feedback Model，未实例化
	'bootstrap',                                    //加载bootstrap模块
	'text!templates/Home/Feedback.html'             //加载Home/Feedback模板
	],function($,_,Backbone,checkLogin,feedbackModel,Bootstrap,feedbackTemp){
		var feedbackView = Backbone.View.extend({
			el:'#appBody-content .wrap',
			tempID:'Feedback',
			template:_.template(feedbackTemp),
			model:new feedbackModel,
			initialize:function(){
				_.bindAll(this,'render')
				//this.render();
			},
			render:function(){
				this.$el.html(this.template({}));
			}
		});
		return feedbackView;
	}
);
