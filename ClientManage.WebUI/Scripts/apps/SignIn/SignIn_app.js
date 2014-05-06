/***************************************
 * Created by samhwang1990@gmail.com on 14-5-5.
 * SignIn Module
 ***************************************/
define(['app'],function(ClientManage){
	ClientManage.module('Routers.SignIn',function(SignInRouter,ClientManage,Backbone,Marionette,$,_){
		SignInRouter.Router = Marionette.AppRouter.extend({
			appRoutes: {
				"CheckSignIn":"Check",
				"SignIn":"SignInShow",
				"SignOut":"SignOut"
			}
		});

		ClientManage.addRegions({
			bodyRegion: Marionette.Region.extend({
				el:"body"
			})
		});

		var executeAction = function(action, arg){
			ClientManage.startSubApp("SignIn");
			action(arg);
			//ClientManage.execute("check:signIn");
		};

		var API = {
			Check:function(criterion){
				require(['apps/SignIn/Check/check_controller'],function(CheckController){
					executeAction(CheckController.CheckSignIn,criterion)
				});
				//executeAction();
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

		ClientManage.on("check:signIn",function(){
			API.Check();
		});

		ClientManage.addInitializer(function(){
			new SignInRouter.Router({
				controller: API
			});
		});
	});
	return ClientManage.Routers.SignIn;
});
