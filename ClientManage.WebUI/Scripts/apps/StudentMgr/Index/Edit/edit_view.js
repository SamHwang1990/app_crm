/***************************************
 * Created by samhwang1990@gmail.com on 14-5-19.
 * StudentMgr/Index/Edit View
 ***************************************/

define([
	'app',
	'models/StudentMgr/EasyChatTimeModel',
	'text!templates/StudentMgr/Index/EditStudent.html',             //StudentMgr的Student Create模板
	'text!templates/StudentMgr/Index/EasyChatTime.html',            //StudentMgr的可联系时间模板,
	'libs/bootstrap/datetimepicker/bootstrap-datetimepicker.min'    //bootstrap datetimepicker插件js引入
	],function(ClientManage,EasyChatTimeModel,EditStudentTpl,EasyChatTimeTpl,Datetimepicker){
	ClientManage.module('StudentMgr.Index.Edit.View',function(View,ClientManage,Backbone, Marionette, $, _){
		View.EditStudentView = Marionette.Layout.extend({
			template:_.template(EditStudentTpl),
			templateHelpers:function(){
				return {
					StudentInfo:this.model.get("StudentInfo"),
					AppRelation:this.model.get("AppRelation")
				}
			},
			tagName:"div",
			className:"wrap",
			regions:{
				saleConsultantWrap:".saleConsultantWrap"
			},
			ui:{
				"form":"#editForm",
				"roleList":"#roleList",
				"saleConsultant":"#saleConsultant",
				"contactWrap":".contact-content",
				"btnAddEasyChat":".btnAddEasyChat",
				"removeParent":".removeParent",
				"timePicker":"div.easyChat-wrap .timePicker"
			},
			events:{
				'click @ui.btnAddEasyChat':'InsertEasyChatTemp',
				'click @ui.removeParent':'RemoveParent',
				'changeDate @ui.timePicker':'ChatTimeChange',     //datetimepicker插件触发的changeDate事件
				'submit':'EditSubmit'
			},
			onRender:function(){
				var editStudentView  = this;
				//设置销售负责人部分
				require([
					'collections/RoleMgr/RoleList',
					'apps/StudentMgr/Index/Create/saleConsultant_view'
					],function(RoleCol,SaleConsultantView){
					var roleList = new RoleCol();
					//Role Collection Fetch data from server
					roleList.fetch({
						success:function(){
							//获取学生销售负责人的ID，并根据这个ID，找到该负责人的角色ID
							var userID = editStudentView.model.get("AppRelation").SaleConsultant;
							var url = '/UserMgr/GetRoleID';
							$.ajax({
								type:"GET",
								url:url,
								data:"userID="+userID,
								dataType: 'text',
								success: function (data){
									console.log("Fetch role list from server successfully");
									var rolesView = new SaleConsultantView.RolesView({              //如果RoleList集合获取成功，则渲染角色列表视图
										collection:roleList,
										curRoleID:data,
										curUserID:userID
									})
									editStudentView.saleConsultantWrap.show(rolesView);
								},
								error:function(data,err){

								}
							})
						},
						error:function(){
							console.log("Fetch role list from server failed");
						}
					})
				})

				//设置学生联系时间
				var easyChatTimeList = new EasyChatTimeModel.EasyChatTimeList({
					url:'StudentMgr/Index/GetEasyChatTimeList'
				});
				easyChatTimeList.fetch({
					data:{
						identity:"学生",
						contactIDString:editStudentView.model.get("StudentInfo").StudentID
					},
					success:function(){
						console.log("fetch easyChatTimes from server successfully!");
						easyChatTimeList.forEach(function(chatTimeItem, index){
							editStudentView.InsertEasyChatTemp(null,chatTimeItem);
						})
					},
					error:function(){
						console.log("fetch easyChatTimes from server failed!");
					}
				})
			},
			/*
			 * 删除当前元素的父元素
			 * 用于删除可联系时间
			 * */
			RemoveParent:function(event){
				$(event.currentTarget).parent().remove();
			},
			InsertEasyChatTemp:function(event,chatTimeModel){         //插入添加联系时间的HTML
				if(chatTimeModel){
					var timeBegin = chatTimeModel.get("TimeBegin");
					var hourBegin = timeBegin.Hours<10 ? "0" + timeBegin.Hours : timeBegin.Hours;
					var minuteBegin = timeBegin.Minutes<10 ? "0" + timeBegin.Minutes : timeBegin.Minutes;
					chatTimeModel.set("TimeBegin", hourBegin + ":" + minuteBegin);

					var timeEnd = chatTimeModel.get("TimeEnd");
					var hourEnd = timeEnd.Hours<10 ? "0" + timeEnd.Hours : timeEnd.Hours;
					var minuteEnd = timeEnd.Minutes<10 ? "0" + timeEnd.Minutes : timeEnd.Minutes;
					chatTimeModel.set("TimeEnd",hourEnd + ":" + minuteEnd);
				}
				else{
					chatTimeModel = new EasyChatTimeModel.EasyChatTimeEntity();
				}
				var easyChatTemp = _.template(EasyChatTimeTpl);
				this.ui.btnAddEasyChat.before(easyChatTemp(chatTimeModel.toJSON()));
				$('div.easyChat-wrap .timePicker').datetimepicker({     //调用bootstrap的datetimepicker插件
					format: "hh:ii",        //指定显示格式
					autoclose: true,        //点击具体日期或时间后关闭选择框
					startView:0,            //设置起始选择框形式，0代表显示hour
					minView:0,              //设置允许的最低层选择框形式
					maxView:0               //设置允许的最顶层选择框形式
				});
			},
			ChatTimeChange:function(event){             //当chattime的值改变时触发，用于验证
				var easyChatWrap = $(event.currentTarget).parent();                 //找到父元素：div.easyChat-wrap
				this.CheckChatTimeValid(easyChatWrap);
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
			CheckChatTimeValid:function(wrapEl){
				var beginTime = wrapEl.find('.easyChat-begin input').val();   //获取可联系时间的开始值字符串
				var endTime = wrapEl.find('.easyChat-end input').val();       //获取可联系时间的结束值字符串
				if(beginTime === '' || endTime === ''){                             //如果开始值或者结束值为空，则不需要验证
					return ;
				}
				var beginTimeNum = Number(beginTime.replace(':',''));               //将开始值字符串的‘:’删掉，并转为数字
				var endTimeNum = Number(endTime.replace(':',''));                   //将结束值字符串的‘:’删掉，并转为数字
				if(endTimeNum > beginTimeNum){                                      //如果结束值大于开始值，则删除错误信息
					this.SetFeedbackMsg('','inputInvalid','remove');
					return true;
				}else{                                                              //否则，显示错误信息
					this.SetFeedbackMsg('通话开始时间不能晚于结束时间','inputInvalid','add');
					return false;
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
				var editView = this;
				//检查基础必备信息是否已填写
				if(!this.CheckRequire(this.$el,'name','studentName','学生名')){
					return false;
				}

				//检查联系人信息
				var chatTimeValid = true;                       //Bool：方便联系时间是否合法

				//遍历该ContactItem下所有联系时间条目
				$(this).find('.easyChat-wrap').each(function(index){
					//检查该联系时间条目的开始时间与结束时间
					if(!editView.CheckChatTimeValid($(this))){
						chatTimeValid = false;
						return false;//实现break功能
					}
				})


				if(!chatTimeValid){            //如果联系时间其中之一不合法
					return false;
				}
				return true;
			},

			EditSubmit:function(event){
				event.preventDefault();
				if(this.validateForm()){
					//Collect the data from form
					this.setStudentInfo();
					this.setAppRelation();
					this.setEasyChatTimes();

					var postUrl = this.$el.find("form#editForm").eq(0).attr("action");
					var ajaxData = JSON.stringify(this.model);
					$.ajax({
						type: "POST",
						url: postUrl,
						data:ajaxData,
						dataType: 'json',
						contentType: 'application/json; charset=utf-8',
						success: function (data) {
							if(data.EditReslut == true){
								ClientManage.navigate("StudentMgr/Index/List",{trigger:true});
							} else {
								alert("Edit Failed");
							}
						}
					});
				}else{
					return false;
				}
			},
			setStudentInfo:function(){
				var nameCn = this.$el.find('input[name=studentName]').eq(0).val();
				var liveCity = this.$el.find('input[name=liveCity]').eq(0).val();
				var mobile = this.$el.find('input[name=Mobile]').eq(0).val();
				var email = this.$el.find('input[name=Email]').eq(0).val();
				var studentInfo = this.model.get('StudentInfo')/*.set({
					NameCn:nameCn,
					LiveCity:liveCity,
					Mobile:mobile,
					Email:email
				});*/
				studentInfo.NameCn = nameCn;
				studentInfo.LiveCity = liveCity;
				studentInfo.Mobile = mobile;
				studentInfo.Email = email;
				//return this.model.get('StudentInfo');
			},
			setAppRelation:function(){
				var isSign = this.$el.find('input[name=isSign]').eq(0).is(":checked");
				var saleConsultant = this.$el.find('select#saleConsultant').eq(0).val();
				this.model.get('AppRelation').set({
					IsSign:isSign,
					SaleConsultant:saleConsultant
				});
				//return this.model.get('AppRelation');
			},
			setEasyChatTimes:function(){
				//Set EasyChatTimes
				this.set("EasyChatTimes",new EasyChatTimeModel.EasyChatTimeList);
				this.$el.find('.easyChat-wrap').each(function(index){
					var itemID = $(this).find("input[name=ItemID]").eq(0).val();
					var timeBegin = $(this).find("div.easyChat-begin input").eq(0).val();
					var timeEnd = $(this).find("div.easyChat-end input").eq(0).val();
					var ifStudentId = $(this).find("input[name=IfStudentID]").eq(0).val();
					var ifParentId = $(this).find("input[name=IfParentID]").eq(0).val();
					if(timeBegin != null && timeEnd != null){
						this.model
							.get("EasyChatTimes")
							.add(
								new EasyChatTimeModel.EasyChatTimeEntity({
									ItemID:itemID,
									TimeBegin:timeBegin,
									TimeEnd:timeEnd,
									IfStudentID:ifStudentId,
									IfParentID:ifParentId
								})
							);
					}
				});
			}
		});
		View.EditContactView = Marionette.Layout.extend({

		});
	});
	return ClientManage.StudentMgr.Index.Edit.View;
})
