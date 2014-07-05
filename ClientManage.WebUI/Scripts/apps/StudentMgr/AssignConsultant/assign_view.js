/***************************************
 * Created by samhwang1990@gmail.com on 14-7-4.
 ***************************************/

define([
	'app',
	'text!templates/StudentMgr/AssignConsultant/AssignConsultant.html',
	'collections/UserMgr/UserBasicInfoList'
],function(ClientManage,AssignConsultantTpl,UserBasicInfoCollection){
	ClientManage.module('StudentMgr.AssignConsultant.View',function(View,ClientManage,Backbone, Marionette, $, _){
		View.AssignView = Marionette.ItemView.extend({
			tagName:"div",
			className:"wrap",
			template: _.template(AssignConsultantTpl),
			ui:{
				"Form":"form#assignForm",
				"SelectActConsultant":"#ActConsultant",
				"SelectApplyConsultant":"#ApplyConsultant",
				"SelectEssayConsultant":"#EssayConsultant",
				"SelectExamConsultant":"#ExamConsultant",
				"BtnSubmit":"#btnSubmit"
			},
			events:{
				"submit":"AssignFormSubmit"
			},
			onRender:function(){
				this.RenderConsultant.RenderApplyConsultant.apply(this);
				this.RenderConsultant.RenderEssayConsultant.apply(this);
				this.RenderConsultant.RenderActConsultant.apply(this);
				this.RenderConsultant.RenderExamConsultant.apply(this);
			},
			RenderConsultant:{
				RenderApplyConsultant:function(){
					var $select = this.ui.SelectApplyConsultant;
					var userList = new UserBasicInfoCollection({
						url:'/UserMgr/GetApplyConsultant'
					});
					userList.fetch({
						success:function(){
							_.each(userList,function(userBasic){
								var $option = $('option').appendTo($select);
								$option.val(userBasic.UserID);
								$option.text(userBasic.UserName);
							})
						}
					})
				},
				RenderEssayConsultant:function(){

				},
				RenderActConsultant:function(){

				},
				RenderExamConsultant:function(){

				}
			}
		});
	});
	return ClientManage.StudentMgr.AssignConsultant.View;
});
