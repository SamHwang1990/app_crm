/***************************************
 * Created by samhwang1990@gmail.com on 14-6-14.
 * RoleMgr/List View
 ***************************************/

define([
	'app',
	'text!templates/RoleMgr/List.html',
	'text!templates/RoleMgr/ListItem.html'
	],function(ClientManage,RoleListTpl,RoleListItemTpl){
	ClientManage.module('RoleMgr.List.View',function(View,ClientManage,Backbone,Marionette,$,_){
		View.RoleListItemView = Marionette.ItemView.extend({
			template:_.template(RoleListItemTpl),
			tagName:"tr",
			templateHelpers:function(){
			}
		});
		View.RoleListView = Marionette.CompositeView.extend({
			tagName:"div",
			className:"wrap",
			template:_.template(RoleListTpl),
			itemView:View.RoleListItemView,
			itemViewContainer:"tbody"
		})
	});
	return ClientManage.RoleMgr.List.View;
})
