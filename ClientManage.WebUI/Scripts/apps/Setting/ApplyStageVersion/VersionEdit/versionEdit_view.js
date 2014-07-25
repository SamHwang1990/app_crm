/***************************************
 * Created by samhwang1990@gmail.com on 14-7-16.
 * Setting/ApplyStageVersion/VersionEdit View
 ***************************************/

define([
	'app',
	'assets/SetFeedbackMsg',
	'assets/CheckSubmitRequire',
	'assets/RenderDateTimePicker',
	'assets/TransformDateString',
	'models/Setting/ApplyStagesMgr/ApplyStageVersionModel',
	'text!templates/Setting/ApplyStagesMgr/VersionEdit.html'
	],function(ClientManage,SetFeedbackMsg,CheckSubmitRequire,RenderDateTimePicker,TransformDateString,VersionModel,VersionEditTpl){
	ClientManage.module("Setting.ApplyStageVersion.VersionEdit.View",
		function(View,ClientManage,Backbone,Marionette,$,_){
		View.VersionEditView = Marionette.Layout.extend({
			template:_.template(VersionEditTpl),
			tagName:"div",
			className:"wrap",
			ui:{
				"EditForm":"#editForm",
				"inputVersionName":"#VersionName",
				"inputSignDateBefore":"#SignDateBefore",
				"textAreaRemark":"#Remark",
				"btnSubmit":"#btnSubmit"
			},
			events:{
				'submit @ui.EditForm':'EditSubmit'
			},
			onRender:function(){
				var renderDateTimePicker = new RenderDateTimePicker();
				renderDateTimePicker.RenderDate(this.$el.find('.timePicker'));

				this.RenderSignDateBefore();
			},
			RenderSignDateBefore:function(){
				var transformDateString = new TransformDateString();
				var signDateBefore = transformDateString.TransMsStringToDate(this.model.get("SignDateBefore"));
				this.ui.inputSignDateBefore.val(signDateBefore);
			},
			SetFeedbackMsg:SetFeedbackMsg,
			CheckRequire:CheckSubmitRequire,
			//检查表单元素的值是否合法
			validateForm:function(){
				//检查基础必备信息是否已填写
				var requiredMsg = '请填写必填字段:';
				if(!this.CheckRequire(this.$el,'name','SignDateBefore')){
					this.SetFeedbackMsg(this.$el,requiredMsg+"有效签约时间",'inputInvalid','add')
					return false;
				}
				if(!this.CheckRequire(this.$el,'id','VersionName')){
					this.SetFeedbackMsg(this.$el,requiredMsg+"版本名称",'inputInvalid','add')
					return false;
				}
				return true;
			},
			setVersionInfo:function(){
				var versionName = this.ui.inputVersionName.val();
				var signDateBefore = this.ui.inputSignDateBefore.val();
				var remark = this.ui.textAreaRemark.val();

				this.model.set("VersionName",versionName);
				this.model.set("SignDateBefore",signDateBefore);
				this.model.set("Remark",remark);
			},
			EditSubmit:function(event){
				//阻止默认的表单提交行为
				event.preventDefault();
				if(this.validateForm()){

					//Collect data from form
					this.setVersionInfo();
					var postUrl = this.ui.EditForm.attr('action');
					var ajaxData = JSON.stringify(this.model);
					$.ajax({
						type:'POST',
						url:postUrl,
						data:ajaxData,
						dataType:'json',
						contentType: 'application/json; charset=utf-8',
						success:function(data){
							if(data.SaveResult == true){
								ClientManage.navigate("Setting/ApplyStageVersion/List",{trigger:true});
							}else{
								alert('Post Failed');
							}
						},
						error:function(data){
							alert('提交数据失败');
						}
					})
				}
			}
		})
	})
	return ClientManage.Setting.ApplyStageVersion.VersionEdit.View;
})