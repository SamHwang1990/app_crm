/***************************************
 * Created by samhwang1990@gmail.com on 14-7-16.
 * Setting/ApplyStageVersion/VersionList View
 ***************************************/

define([
	'app',
	'text!templates/Setting/ApplyStagesMgr/VersionList.html',
	'text!templates/Setting/ApplyStagesMgr/VersionListItem.html'
],function(ClientManage,VersionListTpl,VersionListItemTpl){
	ClientManage.module('Setting.ApplyStageVersion.VersionList.View',function(View,ClientManage,Backbone,Marionette,$,_){
		View.VersionListItemView = Marionette.ItemView.extend({
			template:_.template(VersionListItemTpl),
			tagName:"tr",
			templateHelpers:function(){
			}
		});
		View.VersionListView = Marionette.CompositeView.extend({
			tagName:"div",
			className:"wrap",
			template:_.template(VersionListTpl),
			itemView:View.VersionListItemView,
			itemViewContainer:"tbody"
		})
	});
	return ClientManage.Setting.ApplyStageVersion.VersionList.View;
})
