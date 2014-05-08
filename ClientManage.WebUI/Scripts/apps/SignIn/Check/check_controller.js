/***************************************
 * Created by samhwang1990@gmail.com on 14-5-6.
 * Controller to check the user is sign in
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module("SignIn.Check",function(Check,ClientManage,Backbone, Marionette, $, _){
		Check.Controller = {
			CheckSignIn:function(){
				var checkUrl = '/Home/CheckLogin';
				require(['models/LoginUser'],function(SignInUserModel){
					var currentUser = new SignInUserModel();
					$.ajax({
						url:checkUrl,
						type:'POST',
						dataType: 'json',
						success:function(data){
							if(data.HasCurrentUser){
								currentUser.set("UserName",data.UserName);      //设置UserName
								ClientManage.CurrentUser = currentUser;         //把当前User信息存储到App中
								ClientManage.module("SignIn").stop();           //然后关闭Module，释放内存
								ClientManage.trigger("home:index");             //如果已有登录，则触发“home:index”事件
							}
							else{                                               //如果没有登录信息，则重定向，渲染登录页面
								if(ClientManage.CurrentUser){
									ClientManage.CurrentUser = null;
								}
								//ClientManage.navigate("SignIn");
								ClientManage.trigger("show:signIn");
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
