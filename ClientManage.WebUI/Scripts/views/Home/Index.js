/**
 * Created by samhwang1990@gmail.com on 14-4-12.
 */

define([
	'jquery',
	'underscore',
	'backbone',
	'checkLogin',
	'models/LoginUser',
	'models/appConfig',
	'text!templates/Common/adminMenu.html',
	'text!templates/Common/appAdminBar.html',
	'text!templates/Common/appBody-content.html',
	'text!templates/Common/Footer.html'],
	function($,_,Backbone,checkLogin,appConfigModel,UserModel,adminMenuTemp,appAdminBarTemp,appBodyContentTemp,footerTemp){
		var indexView = Backbone.View.extend({
			el:"#appWrap",
			model:{
				CurrentUser:new UserModel,
				AppConfig:new appConfigModel
			},
			initialize:function(){
				_.bindAll(this, 'render');

				//判断checklogin 返回的User 的UserName，判断是否已登录，代码还没写！


			},
			render:function(){

			}

		});
		return indexView;
	}
);
