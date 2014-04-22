/***************************************
 * Created by samhwang1990@gmail.com on 14-4-22.
 * Role List 集合
 ***************************************/

define(['jquery','underscore','backbone','models/RoleMgr/RoleInfo'],function($,_,Backbone,RoleInfo){
	var rolesCollection = Backbone.Collection.extend({
		model:RoleInfo,
		url:'/RoleMgr/List'
	});
	return rolesCollection;
});
