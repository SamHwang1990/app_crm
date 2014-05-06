/***************************************
 * Created by samhwang1990@gmail.com on 14-5-6.
 * Controller to sign out
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module("SignIn.SignOut",function(SignOut,ClientManage,Backbone, Marionette, $, _){
		SignOut.Controller = {
			DoSignOut:function(){
				var signOutUrl = '/Home/Logout';                //SignOut Url
				$.get(                                          //jQuery Get Ajax
					signOutUrl,                                 //Ajax Url
					function(data){                             //Ajax Success Feedback Function
						if(data.LogOutResult)
							ClientManage.navigate("SignIn");
						else{
							console.log('Sign out failed');
							alert('Sign out failed');
						}
					},
					'json'                                      //Ajax dataType
				);
			}
		};
	});
	return ClientManage.SignIn.SignOut.Controller;
});
