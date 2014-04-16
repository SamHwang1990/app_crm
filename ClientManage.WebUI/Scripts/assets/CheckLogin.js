/**
 * Created by samhwang1990@gmail.com on 14-4-12.
 * 检查当前用户是否已登录，判断过程交给后端代码完成
 */

define(['jquery','backbone','models/LoginUser'],function($,Backbone,UserModel){
	var checkUrl = '/Home/CheckLogin';
	var currentUser=new UserModel();
	$.ajax({
		url:checkUrl,
		type:'POST',
		dataType: 'json',
		success:function(data){
			if(data.HasCurrentUser){
				currentUser.set("UserName",data.UserName);   //设置UserName
			}
			else{                                       //如果没有登录信息，则重定向到登录页
				window.location.href="/Home/Login";
				return;
			}
		}
	});
	return currentUser;
});
