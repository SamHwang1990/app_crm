/***************************************
 * Created by samhwang1990@gmail.com on 14-9-2.
 * Setting/StudentSource/Edit View
 ***************************************/

define([
	'app',
	'assets/SetFeedbackMsg',
	'assets/CheckSubmitRequire',
	'assets/ValidInputValue',
	'models/StudentMgr/SaleTrack/StudentSourceItem',
	'text!templates/Setting/StudentSource/Edit.html'
],function(ClientManage,SetFeedbackMsg,CheckSubmitRequire,ValidInputValue,StudentSourceModel,SourceEditTpl){
	ClientManage.module("Setting.StudentSource.Edit.View",
		function(View,ClientManage,Backbone,Marionette,$,_){
			View.SourceEditView = Marionette.Layout.extend({
				template:_.template(SourceEditTpl),
				tagName:"div",
				className:"wrap",
				ui:{
					"EditForm":"#editForm",
					"inputSourceName":"#SourceName",
					"inputSourceNameEn":"#SourceNameEn",
					"inputDetailKeyword":"#DetailKeyword",
					"textAreaRemark":"#Remark",
					"btnSubmit":"#btnSubmit"
				},
				events:{
					'submit @ui.EditForm':'EditSubmit'
				},
				onRender:function(){
				},
				//检查表单元素的值是否合法
				validateForm:function(){
					//检查基础必备信息是否已填写
					var requiredMsg = '请填写必填字段:';
					if(!CheckSubmitRequire(this.$el,'id','SourceName')){
						SetFeedbackMsg(this.$el,requiredMsg+"来源名称",'inputInvalid','add')
						return false;
					}
					if(!CheckSubmitRequire(this.$el,'id','SourceNameEn')){
						SetFeedbackMsg(this.$el,requiredMsg+"来源英文名称",'inputInvalid','add')
						return false;
					}

					if(ValidInputValue("[\\u3400-\\u9FBF]",this.ui.inputSourceNameEn.val())){
						SetFeedbackMsg(this.$el,"来源的英文名称不能包含中文",'inputInvalid','add')
						this.ui.inputSourceNameEn.val('');
						return false
					}

					return true;
				},
				setSourceInfo:function(){
					var sourceName = this.ui.inputSourceName.val();
					var sourceNameEn = this.ui.inputSourceNameEn.val();
					var detailKeyword = this.ui.inputDetailKeyword.val();
					var remark = this.ui.textAreaRemark.val();

					this.model.set("SourceName",sourceName);
					this.model.set("SourceNameEn", $.trim(sourceNameEn));
					this.model.set("DetailKeyword",detailKeyword);
					this.model.set("Remark",remark);
				},
				EditSubmit:function(event){
					//阻止默认的表单提交行为
					event.preventDefault();
					if(this.validateForm()){

						//Collect data from form
						this.setSourceInfo();
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
									ClientManage.navigate("Setting/StudentSource/List",{trigger:true});
								}else{
									alert('Post Failed! ' + data.Msg);
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
	return ClientManage.Setting.StudentSource.Edit.View;
})
