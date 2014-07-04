/***************************************
 * Created by samhwang1990@gmail.com on 14-7-4.
 ***************************************/

define([
	'app',
	'text!templates/StudentMgr/AssignConsultant/AssignConsultant.html'
],function(ClientManage,AssignConsultantTpl){
	ClientManage.module('StudentMgr.AssignConsultant.View',function(View,ClientManage,Backbone, Marionette, $, _){
		View.AssignView = Marionette.ItemView.extend({
			tagName:"div",
			className:"wrap",
			template: _.template(AssignConsultantTpl),
		});
	});
	return ClientManage.StudentMgr.AssignConsultant.View;
});
