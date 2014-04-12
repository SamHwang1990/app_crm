/**
 * Created by samhwang1990@gmail.com on 14-4-12.
 */

define(['jquery','backbone','../models/LoginUser'],function($,Backbone,UserModel){
	var checkUrl = '/Home/CheckLogin', currentUser=new UserModel;
	$.ajax({
		url:checkUrl,
		type:'GET',
		dataType: 'json',
		success:function(data){
			if(data.HasCurrentUser){
				currentUser.UserName = data.UserName;
			}
		}
	});
	return currentUser;
});
