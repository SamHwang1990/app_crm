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
				"SelectExamConsultant":"#ExamConsultant"
			},
			events:{
				"submit":"AssignFormSubmit"
			},
			initialize:function(options){
				if(options != null){
					this.StudentID = options.StudentID;
				}
			},
			onRender:function(){
				this.RenderConsultant.RenderApplyConsultant.call(this,this.ui.SelectApplyConsultant,'/UserMgr/GetApplyConsultant');
				this.RenderConsultant.RenderEssayConsultant.call(this,this.ui.SelectEssayConsultant,'/UserMgr/GetEssayConsultant');
				this.RenderConsultant.RenderActConsultant.call(this,this.ui.SelectActConsultant,'/UserMgr/GetActConsultant');
				this.RenderConsultant.RenderExamConsultant.call(this,this.ui.SelectExamConsultant,'/UserMgr/GetExamConsultant');
			},
			RenderConsultant:{
				RenderApplyConsultant:function($select,fetchUrl){
					this.RenderConsultant.RenderConsultantHandler($select,fetchUrl);
				},
				RenderEssayConsultant:function($select,fetchUrl){
					this.RenderConsultant.RenderConsultantHandler($select,fetchUrl);
				},
				RenderActConsultant:function($select,fetchUrl){
					this.RenderConsultant.RenderConsultantHandler($select,fetchUrl);
				},
				RenderExamConsultant:function($select,fetchUrl){
					this.RenderConsultant.RenderConsultantHandler($select,fetchUrl);
				},
				RenderConsultantHandler:function($select,fetchUrl){
					var userList = new UserBasicInfoCollection({
						url:fetchUrl
					});
					userList.fetch({
						success:function(){
							_.each(userList.models,function(userBasic){
								var $option = $('<option></option>').appendTo($select);
								$option.val(userBasic.get("UserID"));
								$option.text(userBasic.get("UserName"));
							})
						}
					})
				}
			},
			AssignFormSubmit:function(e){
				//e.preventDefault();
				var studentID = this.StudentID;
				var applyConsultant = this.ui.SelectApplyConsultant.val();
				var applyConsultantName = this.ui.SelectApplyConsultant.find('option:selected').text();
				var essayConsultant = this.ui.SelectEssayConsultant.val();
				var essayConsultantName = this.ui.SelectEssayConsultant.find('option:selected').text();
				var actConsultant = this.ui.SelectActConsultant.val();
				var actConsultantName = this.ui.SelectActConsultant.find('option:selected').text();
				var examConsultant = this.ui.SelectExamConsultant.val();
				var examConsultantName = this.ui.SelectExamConsultant.find('option:selected').text();

				var AssignData = {
					StudentID:studentID,
					ApplyConsultant:applyConsultant,
					ApplyConsultantName:applyConsultantName,
					EssayConsultant:essayConsultant,
					EssayConsultantName:essayConsultantName,
					ActConsultant:actConsultant,
					ActConsultantName:actConsultantName,
					ExamConsultant:examConsultant,
					ExamConsultantName:examConsultantName
				}

				var ajaxData = JSON.stringify(AssignData);
				var postUrl = this.ui.Form.attr("action");
				$.ajax({
					type: "POST",
					url: postUrl,
					data: ajaxData,
					dataType: 'json',
					contentType: 'application/json; charset=utf-8',
					success: function (data) {
						if(data)
							ClientManage.navigate("StudentMgr/Index/List",{trigger:true});
						else{
							alert("Post Failed");
						}
					},
					error:function(data){
						alert(data);
					}
				});

				return false;
			}
		});
	});
	return ClientManage.StudentMgr.AssignConsultant.View;
});
