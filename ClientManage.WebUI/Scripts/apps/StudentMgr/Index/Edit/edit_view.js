/***************************************
 * Created by samhwang1990@gmail.com on 14-5-19.
 * StudentMgr/Index/Edit View
 ***************************************/

define([
	'app',
	'models/StudentMgr/EasyChatTimeModel',
	'text!templates/StudentMgr/Index/Edit.html',                    //StudentMgr的Student Create模板
	'text!templates/StudentMgr/Index/ContactContent.html',          //StudentMgr的联系人模板
	'text!templates/StudentMgr/Index/EasyChatTime.html',            //StudentMgr的可联系时间模板,
	'libs/bootstrap/datetimepicker/bootstrap-datetimepicker.min'   //bootstrap datetimepicker插件js引入
	],function(ClientManage,EasyChatTimeModel,EditTpl,ContactContentTpl,EasyChatTimeTpl,Datetimepicker,SaleConsultantView){
	ClientManage.module('StudentMgr.Index.Edit.View',function(View,ClientManage,Backbone, Marionette, $, _){

	});
	return ClientManage.StudentMgr.Index.Edit.View;
})
