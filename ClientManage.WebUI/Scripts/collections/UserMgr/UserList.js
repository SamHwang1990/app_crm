/***************************************
 * Created by samhwang1990@gmail.com on 14-4-22.
 * UserList 集合
 ***************************************/

define(['jquery','underscore','backbone','models/UserMgr/UserInfo'],function($,_,Backbone,UserInfo){
		var usersCollection = Backbone.Collection.extend({
			model:UserInfo,
			url:'/UserMgr/List'
		});
		return usersCollection;
	}
);
