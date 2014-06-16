/***************************************
 * Created by samhwang1990@gmail.com on 14-6-16.
 * RoleMgr/Create View
 ***************************************/

define([
	'app',
	'models/RoleMgr/RoleInfo',
	'text!templates/RoleMgr/Edit.html'
	],function(ClientManage,RoleInfoModel,RoleEditTpl){
	ClientManage.module('RoleMgr.Create.View',function(View,ClientManage,Backbone,Marionette,$,_){
		View.RoleCreateView = Marionette.Layout.extend({
			template:_.template(RoleEditTpl),
			tagName:"div",
			className:"wrap",
			ui:{
				"EditForm":"#editForm",
				"inputRoleName":"#RoleName",
				"inputRoleEN":"#RoleEN",
				"textAreaRoleRemark":"#RoleRemark",
				"inputIsForSaleTrack":"#IsForSaleTrack",
				"btnSubmit":"#btnSubmit"
			},
			events:{
				'submit @ui.EditForm':'CreateSubmit'
			},
			/*
			 * 用于显示和隐藏feedback信息
			 * msg：feedback信息
			 * className：用于显示feedback的类名
			 * action：指明动作，只有两种值：Add、Remove
			 * */
			SetFeedbackMsg:function(msg,className,action){
				var feedbackMsg = this.$el.find('.feedbackMsg');                    //获取div.feedbackMsg元素
				feedbackMsg.html(msg);
				switch (action){
					case 'remove':
						feedbackMsg.removeClass(className);
						break;
					case 'add':
						feedbackMsg.addClass(className);
						break;
				}
			},
			/*
			 * 用于检查基础信息是否有填写
			 * @param inputName:表单元素的name属性
			 * @param errMsg: 该表单元素的错误信息
			 * */
			CheckRequire:function(wrapEl,attrType,inputName,errMsg){
				//为必填项保存一个消息
				var requiredMsg = '请填写必填字段:';
				var $targetInput = wrapEl.find('input['+attrType+'*="'+inputName+'"]');
				if($targetInput.val() === ""){
					this.SetFeedbackMsg(requiredMsg+errMsg,'inputInvalid','add');
					return false;
				}
				else{
					return true;
				}
			},
			//检查表单元素的值是否合法
			validateForm:function(){
				//检查基础必备信息是否已填写
				if(!this.CheckRequire(this.$el,'name','RoleName','角色名')){
					return false;
				}
				return true;
			},
			setRoleInfo:function(){
				var roleName = this.ui.inputRoleName.val();
				var roleEn = this.ui.inputRoleEN.val();
				var roleRemark = this.ui.textAreaRoleRemark.val();
				var isForSaleTrack = this.ui.inputIsForSaleTrack.is(":checked");

				this.model.set("RoleName",roleName);
				this.model.set("RoleEN",roleEn);
				this.model.set("RoleRemark",roleRemark);
				this.model.set("IsForSaleTrack",isForSaleTrack);
			},
			CreateSubmit:function(event){
				//阻止默认的表单提交行为
				event.preventDefault();
				if(this.validateForm()){

					//Collect data from form
					this.setRoleInfo();
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
								ClientManage.navigate("RoleMgr/List",{trigger:true});
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
		});
	});
	return ClientManage.RoleMgr.Create.View;
})
