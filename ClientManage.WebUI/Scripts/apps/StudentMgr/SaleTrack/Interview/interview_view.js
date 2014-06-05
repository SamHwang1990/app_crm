/***************************************
 * Created by samhwang1990@gmail.com on 14-5-26.
 * StudentMgr/SaleTrack/FirstInterview View
 * StudentMgr/SaleTrack/CommonInterview View
 ***************************************/

define([
	'app',
	'models/StudentMgr/SaleTrack/SaleTrackAjaxViewModel',
	'text!templates/StudentMgr/SaleTrack/CommonInterview.html',          //StudentMgr/SaleTrack的Create FirstInterview 模板
	'libs/bootstrap/datetimepicker/bootstrap-datetimepicker.min',    //bootstrap datetimepicker插件js引入
	'models/StudentMgr/SaleTrack/SaleTrackParticipantsEntity',
	'collections/StudentMgr/SaleTrack/SaleTrackParticipant',
	'text!templates/StudentMgr/SaleTrack/SaleParticipantItem.html',
	'text!templates/StudentMgr/SaleTrack/GetFromInterview.html'
	],
	function(
		ClientManage,
		SaleTrackAjaxViewModel,
		FirstInterviewTpl,
		Datetimepicker,
		SaleTrackParticipantsEntity,
		SaleTrackParticipantCol,
		SaleParticipantItemTpl,
		GetFromInterviewTpl){
	ClientManage.module('StudentMgr.SaleTrack.Interview.View',function(View,ClientManage,Backbone, Marionette, $, _){
		View.CommonInterviewView = Marionette.Layout.extend({
			template:_.template(FirstInterviewTpl),
			templateHelpers:function(){
				return {
				}
			},
			tagName:"div",
			className:"wrap",
			ui:{
				"Form":"#CommonInterviewForm",
				"AddParticipant":"input.AddParticipant",
				"AddParticipantFromContacts":"input.AddParticipantFromContacts",
				"AddParticipantFromUsers":"input.AddParticipantFromUsers",
				"RemoveParent":"a.removeParent",
				"TableParticipants":"div.TrackParticipants table",
				"SubmitBtn":"div.btnSubmit",
				"SendEmail":".btnSendEmails"
			},
			events:{
				"submit":"CommonInterviewSubmit",
				"click @ui.RemoveParent":"RemoveParent",
				"click @ui.AddParticipant":"AddParticipant",
				"click @ui.AddParticipantFromContacts":"AddParticipantFromContacts",
				"click @ui.AddParticipantFromUsers":"AddParticipantFromUsers",
				"change .TrackParticipants input,.TrackParticipants select":"ParticipantChange",
				"click @ui.SendEmail":"SendEmailToUser"
			},
			initialize:function(options){
				if(options){
					this.StudentID = options.StudentID;
				}
			},
			//Render UI 初始化 开始
			onRender:function(){
				this.setTrackPattern(this.model.get("SaleTrackItem").TrackPattern);
				this.setTrackDate(this.transToDate(this.model.get("SaleTrackItem").TrackDate));
				this.setIsComplete(this.model.get("SaleTrackItem").IsComplete);
			},
			setTrackPattern:function(trackPattern){
				this.$el.find("select#TrackPattern option[value=" + trackPattern + "]")
					.attr("selected","selected");
			},
			/*
			* 设置初访日期字符串
			* @param trackDate：初访日期，Date type
			* */
			setTrackDate:function(trackDate){
				//获取日期的Year、Month、Date、Hour、Minute
				var dateStr = trackDate.getFullYear() + "-" + (trackDate.getMonth()+1) + "-" + trackDate.getDate() + " " +
					trackDate.getHours() + ":" + trackDate.getMinutes();

				//设置DOM元素 input#TrackDate 的值
				this.$el.find("#TrackDate").val(dateStr);
				this.$el.find('.timePicker').datetimepicker({     //调用bootstrap的datetimepicker插件
					format: "yyyy-mm-dd hh:ii",        //指定显示格式
					autoclose: true,        //点击具体日期或时间后关闭选择框
					startView:2,            //设置起始选择框形式，2代表显示month
					initialDate:trackDate
				});
			},
			/*
			* 设置DOM元素 select#IsComplete 的值
			* */
			setIsComplete:function(isComplete){
				this.$el.find("select#IsComplete option[value=" + isComplete + "]")
					.attr("selected","selected");
			},
			//将字符串/ Date / ******* / 转为JS的Date类型
			transToDate:function(msString){
				var ms = msString.slice(6,-2);
				var msDate = new Date(parseInt(ms));
				return msDate;
			},
			//Render UI 初始化 结束

			//事件处理程序 开始
			//删除DOM元素 Tr
			RemoveParent:function(event){
				$(event.currentTarget).parents('tr').remove();
			},
			//点击AddParticipant Button时，添加Tr
			AddParticipant:function(e){
				var newParticipant = new SaleTrackParticipantsEntity();
				newParticipant.set("ParticipantSource","no");
				var participantTpl = _.template(SaleParticipantItemTpl);
				var participantHtml = participantTpl(newParticipant.toJSON());
				this.ui.TableParticipants.append(participantHtml);
			},
			//点击AddParticipantFromContacts Button时，添加Tr
			AddParticipantFromContacts:function(e){
				var interviewView = this;
				require(['models/StudentMgr/EasyChatTimeModel'],function(EasyChatTimeModel){
					var contactList = new EasyChatTimeModel.ContactIdentityList({
						url:"/StudentMgr/Index/GetContactIdentityList"
					});
					contactList.fetch({
						data:{
							studentID:interviewView.StudentID
						},
						success:function(){
							var newParticipant = new SaleTrackParticipantsEntity();
							//解析模板时用以判断参与人来源
							newParticipant.set("ParticipantSource","Contacts");
							//填充Contacts 列表数据
							newParticipant.set("Contacts",contactList.toJSON());
							var participantTpl = _.template(SaleParticipantItemTpl);
							//根据传入的数据解析模板为HTML
							var participantHtml = participantTpl(newParticipant.toJSON());
							//将解析产生的HTML 转换为jQuery对象
							var $newParticipant = $(participantHtml);
							//将解析产生的HTML 添加到文档中
							$newParticipant.appendTo(interviewView.ui.TableParticipants);
							//绑定select.ParticipantFromContacts 的change 事件
							$newParticipant.on("change","select.ParticipantFromContacts",function(e){
								var userName = $(this).val();
								//Underscore find 遍历集合
								var currentContact = _.find(contactList.models,function(user){
									return user.get("NameCn") == userName;
								})
								interviewView.ChangeParticipantInfo(
									$(this).parents('tr'),
									currentContact.get("Email"),
									currentContact.get("Mobile"),
									currentContact.get("PersonIdentity")
								);
							});
							//根据现有select.ParticipantFromContacts 的值触发change 事件
							$newParticipant.find("select.ParticipantFromContacts").trigger("change");
						},
						error:function(){
							alert("获取用户信息失败")
						}
					})
				})
			},
			//点击AddParticipantFromUsers Button时，添加Tr
			AddParticipantFromUsers:function(e){
				var interviewView = this;
				require(['collections/UserMgr/UserList'],function(UserList){
					var userList = new UserList();
					userList.fetch({
						success:function(){
							var newParticipant = new SaleTrackParticipantsEntity();
							newParticipant.set("ParticipantSource","Users");
							newParticipant.set("Users",userList.toJSON());
							var participantTpl = _.template(SaleParticipantItemTpl);
							var participantHtml = participantTpl(newParticipant.toJSON());
							var $newParticipant = $(participantHtml);
							$newParticipant.appendTo(interviewView.ui.TableParticipants);
							$newParticipant.on("change","select.ParticipantFromUsers",function(e){
								var userName = $(this).val();
								var currentUser = _.find(userList.models,function(user){
									return user.get("UserNameCn") == userName;
								})
								interviewView.ChangeParticipantInfo(
									$(this).parents('tr'),
									currentUser.get("Email"),
									currentUser.get("Mobile"),
									"咨询顾问");
							});
							$newParticipant.find("select.ParticipantFromUsers").trigger("change");
						},
						error:function(){
							alert("获取用户信息失败")
						}
					})
				})
			},
			//根据选择的参与人信息，设置各个表单元素值
			ChangeParticipantInfo:function(wrapTr,email,mobile,identity){
				wrapTr.find(".ParticipantEmail").val(email);
				wrapTr.find(".ParticipantMobile").val(mobile);
				wrapTr.find(".ParticipantIdentity option").removeAttr("selected");
				wrapTr.find(".ParticipantIdentity option").filter(function(){
					return $(this).text() == identity;
				}).attr("selected","selected");
			},
			//当参与人列表信息改变时，隐藏发送邮件按钮
			ParticipantChange:function(e){
				if(!this.ui.SendEmail.hasClass("display"))
					this.ui.SendEmail.addClass("display");
			},
			//点击发送邮件按钮时触发
			SendEmailToUser:function(e){
				var postUrl = $(e.target).attr("data-emailTo");
				var trackItem = this.model.get("SaleTrackItem").TrackItemID;
				var ajaxData = {
					trackItem:trackItem
				}
				$.ajax({
					type: "POST",
					url: postUrl,
					data:JSON.stringify(ajaxData),
					dataType: 'json',
					contentType: 'application/json; charset=utf-8',
					success: function (data) {
						if(data == true){
							alert("已发送邮件!");
							ClientManage.navigate("StudentMgr/Index/List",{trigger:true});
						} else {
							alert("Send Email Failed");
						}
					},
					error:function(err){
						alert(err);
						ClientManage.navigate("StudentMgr/Index/List",{trigger:true});
					}
				});
			},
			//事件处理程序 结束
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
					this.SetFeedbackMsg('','inputInvalid','remove');
					return true;
				}
			},
			//检查表单元素的值是否合法
			validateForm:function(){
				//检查基础必备信息是否已填写
				if(!this.CheckRequire(this.$el,'id','TrackDate','初访时间')){
					return false;
				}
				if(!this.CheckRequire(this.$el,'name','TrackToDo','初访内容')){
					return false;
				}
				return true;
			},
			CommonInterviewSubmit:function(e){
				e.preventDefault();
				if(this.validateForm()){
					var commonInterview = this;

					this.SetSaleTrackItem();
					this.SetSaleTrackParticipant();

					var postUrl = this.ui.Form.attr("action");
					var ajaxData = JSON.stringify(this.model);
					$.ajax({
						type: "POST",
						url: postUrl,
						data:ajaxData,
						dataType: 'json',
						contentType: 'application/json; charset=utf-8',
						success: function (data) {
							if(data && commonInterview.model.get("SaleTrackItem").IsComplete != "0"){
								commonInterview.$el.find(".btnSendEmails").removeClass("display");
							}
							if(data && commonInterview.model.get("SaleTrackItem").IsComplete == "0"){
								if(commonInterview.model.get("SaleTrackItem").TrackNo == "1"){
									ClientManage.navigate("StudentMgr/SaleTrack/FirstInterviewReg-" + commonInterview.StudentID,{trigger:true});
								}else{
									Backbone.history.loadUrl(Backbone.history.fragment);
								}
							}
							if(!data){
								alert("Post Failed");
							}
						},
						error:function(err){
							alert(err);
							ClientManage.navigate("StudentMgr/Index/List",{trigger:true});
						}
					});
				}else{
					return false;
				}
			},
			SetSaleTrackItem:function(){
				var trackPattern = this.$el.find("#TrackPattern").val();
				this.model.get("SaleTrackItem").TrackPattern = trackPattern;

				var trackDate = this.$el.find("#TrackDate").val();
				this.model.get("SaleTrackItem").TrackDate = new Date(trackDate);

				var trackToDo = this.$el.find("#TrackToDo").val();
				this.model.get("SaleTrackItem").TrackToDo = trackToDo;

				var isComplete = this.$el.find("#IsComplete").val();
				this.model.get("SaleTrackItem").IsComplete = isComplete;

				var remark = this.$el.find("#Remark").val();
				this.model.get("SaleTrackItem").Remark = remark;
			},
			SetSaleTrackParticipant:function(){
				var participantTr = this.$el.find("tr.ParticipantTr");
				this.model.set("SaleTrackParticipant", new SaleTrackParticipantCol());
				var saleTrackParticipants = this.model.get("SaleTrackParticipant");
				participantTr.each(function(index){
					var name = $(this).find(".ParticipantName").val();
					var email = $(this).find(".ParticipantEmail").val();
					var mobile = $(this).find(".ParticipantMobile").val();
					var identity = $(this).find(".ParticipantIdentity").val();
					var participantID = $(this).find(".ParticipantID").val();
					var saleTrackID = $(this).find(".SaleTrackID").val();
					if(name !== null && name !== ""){
						saleTrackParticipants.add(
							new SaleTrackParticipantsEntity({
								ParticipantName:name,
								ParticipantEmail:email,
								ParticipantMobile:mobile,
								ParticipantIdentity:identity,
								ParticipantID:participantID,
								SaleTrackID:saleTrackID
							})
						)
					}
				})
			}



		});

		View.GetFromInterviewView = Marionette.Layout.extend({
			template:_.template(GetFromInterviewTpl),
			templateHelpers:function(){
				return {

				}
			},
			tagName:"div",
			className:"wrap",
			ui:{
				"Form":"form#GetFromInterviewForm",
				"ChkIsSign":"input[name=IsSign]",
				"BtnSubmit":"#btnSubmit",
				"SignDateWrap":".SignDateWrap"
			},
			events:{
				"submit":"GetFromInterviewSubmit",
				"click @ui.ChkIsSign":"ChangeIsSign"
			},
			//Render UI 初始化 开始
			onRender:function(){
				this.$el.find('.timePicker').datetimepicker({     //调用bootstrap的datetimepicker插件
					format: "yyyy-mm-dd",        //指定显示格式
					autoclose: true,        //点击具体日期或时间后关闭选择框
					startView:2,            //设置起始选择框形式，2代表显示month
					minView:2
				});
			},
			ChangeIsSign:function(e){
				this.ui.SignDateWrap.toggleClass("display");
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
				var $targetInput = wrapEl.find('['+attrType+'*="'+inputName+'"]');
				if($targetInput.val() === ""){
					this.SetFeedbackMsg(requiredMsg+errMsg,'inputInvalid','add');
					return false;
				}
				else{
					this.SetFeedbackMsg('','inputInvalid','remove');
					return true;
				}
			},
			//检查表单元素的值是否合法
			validateForm:function(){
				var editView = this;
				//检查基础必备信息是否已填写
				if(!this.CheckRequire(this.$el,'name','GetFromTrack','本次访谈成果')){
					return false;
				}
				return true;
			},
			GetFromInterviewSubmit:function(e){
				e.preventDefault();
				if(this.validateForm()){
					var getFromView = this;
					var postUrl = this.ui.Form.attr("action");
					var trackID = this.model.get("SaleTrackItem").TrackItemID;
					var trackNo = this.model.get("SaleTrackItem").TrackNo;
					var getFrom = this.$el.find("#GetFromTrack").val();
					var isSign = this.$el.find("input[name=IsSign]").eq(0).is(':checked');
					var signDate = this.$el.find("input#SignDate").val();
					var ajaxData = {
						trackID: trackID,
						trackNo: trackNo,
						isSign: isSign,
						signDate: signDate,
						getFrom: getFrom
					};
					$.ajax({
						type: "POST",
						url: postUrl,
						data: JSON.stringify(ajaxData),
						dataType: 'json',
						contentType: 'application/json; charset=utf-8',
						success: function (data) {
							if(data && isSign)
								ClientManage.navigate("StudentMgr/Index/List",{trigger:true});
							else if(data && !isSign){
								Backbone.history.loadUrl(Backbone.history.fragment);
							}else{
								alert("Post Failed");
							}
						},
						error:function(data){
							alert(data);
						}
					});
				}else{
					return false;
				}
			}
		})
	});
	return ClientManage.StudentMgr.SaleTrack.Interview.View;
})
