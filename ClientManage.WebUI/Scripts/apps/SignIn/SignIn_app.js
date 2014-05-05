/***************************************
 * Created by samhwang1990@gmail.com on 14-5-5.
 * SignIn Module
 ***************************************/
define(['app'],function(ClientManage){
	ClientManage.module('SignInController',function(SignInController,ClientManage,Backbone,Marionette,$,_){

	});

	ClientManage.module('SignInAppView',function(SignInAppView,ClientManage,Backbone,Marionette,$,_){
		SignInAppView.startWithParent = false;
		SignInAppView.onStart = function(){
			console.log('start SignInApp');
		}
		SignInAppView.onClose = function(){
			console.log('close SignInApp');
		}
	});

	ClientManage.module('Routers.SignIn',function(SignInRouter,ClientManage,Backbone,Marionette,$,_){
		SignInRouter.Router = Marionette.AppRouter.extend({
			appRoutes: {
				"SignIn":"ShowSignIn"
			}
		});

		var executeAction = function(){
			ContactManager.startSubApp("SignInAppView");
		};

		var API = {
			ShowSignIn:function(){
				executeAction();
			}
		};
		CheckLogin = function(){
			var checkUrl = '/Home/CheckLogin';
			require(['models/LoginUser'],function(LoginUserModel){
				var currentUser = new LoginUserModel();
				$.ajax({
					url:checkUrl,
					type:'POST',
					dataType: 'json',
					success:function(data){
						if(data.HasCurrentUser){
							currentUser.set("UserName",data.UserName);   //设置UserName
							ClientManage.CurrentUser = currentUser;
						}
						else{                                       //如果没有登录信息，则重定向，渲染登录页面
							if(ClientManage.CurrentUser){
								ClientManage.CurrentUser = null;
							}
							//window.location.href="/Home/Login";
							return;
						}
					}
				});
			})
		}
	})
});
