/***************************************
 * Created by samhwang1990@gmail.com on 14-6-17.
 * UserMgr/List View
 ***************************************/

define([
	'app',
	'text!templates/UserMgr/List.html',
	'text!templates/UserMgr/ListItem.html'
],function(ClientManage,UserListTpl,UserListItemTpl){
	ClientManage.module('UserMgr.List.View',function(View,ClientManage,Backbone,Marionette,$,_){
		View.UserListItemView = Marionette.ItemView.extend({
			template:_.template(UserListItemTpl),
			tagName:"tr",
			templateHelpers:function(){
				var isForSale = this.model.get('IsForSaleTrack');
				if(isForSale)
					isForSale = '是';
				else
					isForSale = '否'

				var lastLoginDate = this.model.get("LastLoginTime");
				lastLoginDate = this.TransToDate(lastLoginDate);

				return {
					IsForSaleTrack:isForSale,
					LastLoginDate:lastLoginDate
				}
			},
			TransToDate:function(msString){
				if(msString == null || msString === ''){
					return '';
				}
				var ms = msString.slice(6,-2);
				var msDate = new Date(parseInt(ms));
				return msDate.getFullYear() + "-" + (msDate.getMonth()+1) + "-" + msDate.getDate();
			}
		});
		View.UserListView = Marionette.CompositeView.extend({
			tagName:"div",
			className:"wrap",
			template:_.template(UserListTpl),
			itemView:View.UserListItemView,
			itemViewContainer:"tbody"
		})
	});
	return ClientManage.UserMgr.List.View;
})
