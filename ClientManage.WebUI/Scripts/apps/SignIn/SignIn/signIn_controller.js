/***************************************
 * Created by samhwang1990@gmail.com on 14-5-6.
 * Controller to handler signIn action
 ***************************************/

define(['app','models/LoginUser'],function(ClientManage,LoginUserModel){
	ClientManage.module("SignIn.DoSignIn",function(DoSignIn,ClientManage,Backbone, Marionette, $, _){
		DoSignIn.Controller = {
			ShowSignIn:function(){
				require(['apps/SignIn/SignIn/signIn_view'],function(SignInView){
					var signInView = new SignInView.SignInForm({
						model:new LoginUserModel()
					});
					ClientManage.bodyRegion.show(signInView);
				})
			}
		};
	});
	return ClientManage.SignIn.DoSignIn.Controller;
});
