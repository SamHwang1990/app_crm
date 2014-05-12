/***************************************
 * Created by samhwang1990@gmail.com on 14-5-5.
 * SignIn Module
 ***************************************/
define(['app'],function(ClientManage){
	ClientManage.module('SignIn',function(SignIn,ClientManage,Backbone,Marionette,$,_){
		SignIn.Router = Marionette.AppRouter.extend({   //SignIn Module的路由配置
			appRoutes: {
				"CheckSignIn":"Check",                  //检查是否已登录
				"SignIn":"SignInShow"                  //渲染登录form
				//"SignOut":"SignOut"                     //登出操作
			}
		});

		var executeAction = function(action, arg){
			action(arg);
			//ClientManage.execute("check:signIn");
		};

		var API = {
			Check:function(criterion){
				require(['apps/SignIn/Check/check_controller'],function(CheckController){
					executeAction(CheckController.CheckSignIn,criterion)
				});
			},
			SignOut:function(criterion){
				require(['apps/SignIn/SignOut/signOut_controller'],function(SignOutController){
					executeAction(SignOutController.DoSignOut,criterion)
				});
			},
			SignInShow:function(criterion){
				require(['apps/SignIn/SignIn/signIn_controller'],function(SignInController){
					executeAction(SignInController.ShowSignIn,criterion);
				});
			}
		};

		ClientManage.on("check:signIn",function(){      //注册应用程序事件
			API.Check();
		});

		ClientManage.on("show:signIn",function(){       //注册渲染登录form事件
			API.SignInShow();
		});

		ClientManage.on("signOut:signIn",function(){
			API.SignOut();
		})

		ClientManage.addInitializer(function(){
			new SignIn.Router({                         //实例化SignIn的路由
				controller:API
			});
		});

	});
	return ClientManage.SignIn;
});
