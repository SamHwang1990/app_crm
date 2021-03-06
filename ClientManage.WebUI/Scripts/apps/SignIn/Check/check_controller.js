/***************************************
 * Created by samhwang1990@gmail.com on 14-5-6.
 * Controller to check the user is sign in
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module("SignIn.Check",function(Check,ClientManage,Backbone, Marionette, $, _){
		Check.Controller = {
			CheckSignIn:function(){
				var checkUrl = '/Home/CheckLogin';                              //设置检查的Url
				require(['models/LoginUser'],function(SignInUserModel){
					var currentUser = new SignInUserModel();
					$.ajax({
						url:checkUrl,
						type:'POST',
						dataType: 'json',
						success:function(data){
							if(data.HasCurrentUser){
								currentUser.set("UserName",data.UserName);      //设置UserName
								currentUser.set("UserID",data.UserID);          //设置UserID
								ClientManage.CurrentUser = currentUser;         //把当前User信息存储到App中
								require(["apps/CM_app"],function(CM){
									ClientManage.trigger("render:frame");       //渲染界面框架
								})
							}
							else{                                               //如果没有登录信息，则重定向，渲染登录页面
								if(ClientManage.CurrentUser){
									ClientManage.CurrentUser = null;
								}
								//ClientManage.navigate("SignIn",{trigger:true});
								ClientManage.trigger("show:signIn");            //如果没有登录，则显示登录form
								return;
							}
						}
					});
				})
			}
		};
	});
	return ClientManage.SignIn.Check.Controller;
});
