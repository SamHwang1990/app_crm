/***************************************
 * Created by samhwang1990@gmail.com on 14-6-17.
 * UserMgr/Edit View
 ***************************************/

define([
	'app',
	'models/UserMgr/UserInfo',
	'text!templates/UserMgr/Edit.html'
],function(ClientManage,UserInfoModel,UserEditTpl){
	ClientManage.module('UserMgr.Edit.View',function(View,ClientManage,Backbone,Marionette,$,_){
		View.UserEditView = Marionette.Layout.extend({
			template:_.template(UserEditTpl),
			templateHelpers:function(){
				return{
					RoleList:this.RoleList.toJSON()
				}
			},
			initialize:function(options){
				if(options != null){
					this.RoleList = options.RoleList;
				}
			},
			tagName:"div",
			className:"wrap",
			ui:{
				"EditForm":"#editForm",
				"inputUserNameCn":"#UserNameCn",
				"inputUserNameEn":"#UserNameEn",
				"inputUserPass":"#UserPass",
				"selectUserRole":"#UserRole",
				"selectUserSecondRole":"#UserSecondRole",
				"inputEmail":"#Email",
				"inputMobile":"#Mobile",
				"textAreaUserRemark":"#UserRemark",
				"inputIsForSaleTrack":"#IsForSaleTrack",
				"btnSubmit":"#btnSubmit"
			},
			events:{
				'change @ui.selectUserRole':"ChangeUserRole",
				'change @ui.selectUserSecondRole':"ChangeUserSecondRole",
				'submit @ui.EditForm':'EditSubmit'
			},
			onRender:function(){
				this.RenderIsForSaleTrack();
			},
			RenderIsForSaleTrack:function(){
				var userRoleID = this.model.get("UserRole");
				this.ui.selectUserRole.find('option[value=' + userRoleID + ']').attr("selected","selected");

				var userSecondRoleID = this.model.get("UserSecondRole");
				this.ui.selectUserSecondRole.find('option[value=' + userSecondRoleID + ']').attr("selected","selected");

				var isForSaleTrack = this.model.get('IsForSaleTrack');
				if(isForSaleTrack.toString() == 'true')
					this.ui.inputIsForSaleTrack.attr('checked','checked');
				else
					this.ui.inputIsForSaleTrack.removeAttr('checked');
			},
			ChangeUserRole:function(e){
				this.ChangeIsForSaleTrack();
			},
			ChangeUserSecondRole:function(e){
				this.ChangeIsForSaleTrack();
			},
			ChangeIsForSaleTrack:function(){
				var userRoleOpt = this.ui.selectUserRole.find("option:selected");
				var mainRoleForSale = userRoleOpt.attr("data-IsForSale");

				var userSecondRoleOpt = this.ui.selectUserSecondRole.find("option:selected");
				var secondRoleForSale = userSecondRoleOpt.attr("data-IsForSale");

				var isForSaleTrack = mainRoleForSale || secondRoleForSale;

				var chkIsForSaleTrack = this.ui.inputIsForSaleTrack;
				if(isForSaleTrack.toString() == 'true')
					chkIsForSaleTrack.attr('checked','checked');
				else
					chkIsForSaleTrack.removeAttr('checked');
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
				if(!this.CheckRequire(this.$el,'name','UserNameCn','用户中文名')){
					return false;
				}
				if(!this.CheckRequire(this.$el,'name','UserPass','用户密码')){
					return false;
				}
				if(!this.CheckRequire(this.$el,'name','Email','用户邮箱')){
					return false;
				}
				if(!this.CheckRequire(this.$el,'name','Mobile','用户联系方式')){
					return false;
				}
				return true;
			},
			setUserInfo:function(){
				var userNameCn = this.ui.inputUserNameCn.val();
				var userNameEn = this.ui.inputUserNameEn.val();
				var userPass = this.ui.inputUserPass.val();

				var userRole = this.ui.selectUserRole.val();
				var userRoleName = this.ui.selectUserRole.find('option:selected').text();
				var userSecondRole = this.ui.selectUserSecondRole.val();
				var userSecondRoleName = this.ui.selectUserSecondRole.find('option:selected').text();

				var email = this.ui.inputEmail.val();
				var mobile = this.ui.inputMobile.val();
				var userRemark = this.ui.textAreaUserRemark.val();

				var isForSaleTrack = this.ui.inputIsForSaleTrack.is(":checked");

				this.model.set("UserNameCn",userNameCn);
				this.model.set("UserNameEn",userNameEn);
				this.model.set("UserPass",userPass);

				this.model.set("UserRole",userRole);
				this.model.set("UserRoleName",userRoleName);
				this.model.set("UserSecondRole",userSecondRole);
				this.model.set("UserSecondRoleName",userSecondRoleName);

				this.model.set("Email",email);
				this.model.set("Mobile",mobile);
				this.model.set("UserRemark",userRemark);

				this.model.set("IsForSaleTrack",isForSaleTrack);

				var lastJobDatePattern = /\d+/;
				var lastJobDateMatches = lastJobDatePattern.exec(this.model.get("LastJobDate"));
				this.model.set("LastJobDate",new Date(parseInt(lastJobDateMatches[0])));
			},
			EditSubmit:function(event){
				//阻止默认的表单提交行为
				event.preventDefault();
				if(this.validateForm()){

					//Collect data from form
					this.setUserInfo();
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
								ClientManage.navigate("UserMgr/List",{trigger:true});
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
	return ClientManage.UserMgr.Edit.View;
})
