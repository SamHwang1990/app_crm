/***************************************
 * Created by samhwang1990@gmail.com on 14-5-6.
 * Controller to sign out
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module("SignIn.SignOut",function(SignOut,ClientManage,Backbone, Marionette, $, _){
		SignOut.Controller = {
			DoSignOut:function(){
				var signOutUrl = '/Home/Logout';                //SignOut Url
				$.ajax({
					type:"POST",
					url:signOutUrl,
					dataType: 'json',
					success: function (data){
						if(data.LogOutResult)
							ClientManage.navigate("SignIn",{trigger:true});
						else{
							console.log('Sign out failed');
							alert('Sign out failed');
						}
					},
					error:function(data,err){
						console.log(err);
					}
				});
			}
		};
	});
	return ClientManage.SignIn.SignOut.Controller;
});
