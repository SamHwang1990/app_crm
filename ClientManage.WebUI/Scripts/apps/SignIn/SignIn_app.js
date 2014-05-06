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

		var executeAction = function(action, arg){
			ClientManage.startSubApp("ContactsApp");
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
			}
		};

		ClientManage.on("check:signIn",function(){
			API.Check();
		})
	})
});
