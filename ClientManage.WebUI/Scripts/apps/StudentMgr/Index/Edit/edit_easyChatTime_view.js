/***************************************
 * Created by samhwang1990@gmail.com on 14-5-21.
 * Edit Easy Chat Time View
 ***************************************/

define([
	'app',
	'models/StudentMgr/EasyChatTimeModel',
	'text!templates/StudentMgr/Index/EasyChatTime.html',            //StudentMgr的可联系时间模板,
	'libs/bootstrap/datetimepicker/bootstrap-datetimepicker.min'    //bootstrap datetimepicker插件js引入
	],function(ClientManage,EasyChatTimeModel,EasyChatTimeTpl,Datetimepicker){
	ClientManage.module('StudentMgr.Index.Edit.View',function(View,ClientManage,Backbone, Marionette, $, _){
		View.EasyChatTimeItemView = Marionette.ItemView.extend({
			template: _.template(EasyChatTimeTpl)
		})
	});
	return ClientManage.StudentMgr.Index.Edit.View;
})
