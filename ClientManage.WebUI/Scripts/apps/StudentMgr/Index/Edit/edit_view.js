/***************************************
 * Created by samhwang1990@gmail.com on 14-5-19.
 * StudentMgr/Index/Edit View
 ***************************************/

define([
	'app',
	'models/StudentMgr/EasyChatTimeModel',
	'models/StudentMgr/EnumModel/IsSign',
	'text!templates/StudentMgr/Index/EditStudent.html',             //StudentMgr的Student Create模板
	'text!templates/StudentMgr/Index/EasyChatTime.html',            //StudentMgr的可联系时间模板,
	'text!templates/StudentMgr/Index/EditContacts.html',            //EditContacts 模板
	'text!templates/StudentMgr/Index/ContactContent.html',          //ContactContent 模板
	'libs/bootstrap/datetimepicker/bootstrap-datetimepicker.min'    //bootstrap datetimepicker插件js引入
	],function(ClientManage,EasyChatTimeModel,EnumIsSign,EditStudentTpl,EasyChatTimeTpl,EditContactsTpl,ContactContentTpl,Datetimepicker){
	ClientManage.module('StudentMgr.Index.Edit.View',function(View,ClientManage,Backbone, Marionette, $, _){
		View.EditStudentView = Marionette.Layout.extend({
			template:_.template(EditStudentTpl),
			templateHelpers:function(){
				return {
					StudentInfo:this.model.get("StudentInfo"),
					AppRelation:this.model.get("AppRelation"),
					SignDate:this.transToDate(this.model.get("AppRelation").SignDate)
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
				"selectIsSign":"#IsSign",
				"wrapSignDate":"#SignDateWrap",
				"removeParent":".removeParent",
				"timePicker":"div.easyChat-wrap .timePicker"
			},
			events:{
				'click @ui.btnAddEasyChat':'InsertEasyChatTemp',
				'click @ui.removeParent':'RemoveParent',
				'change @ui.selectIsSign':"ChangeIsSign",
				'changeDate @ui.timePicker':'ChatTimeChange',     //datetimepicker插件触发的changeDate事件
				'submit':'EditSubmit'
			},
			/*
			* Render后触发
			* */
			onRender:function(){
				var editStudentView  = this;

				//设置是否已签约
				var isSign = this.model.get("AppRelation").IsSign;
				this.ui.selectIsSign.find("option[value="+ isSign + "]").attr("selected","selected");
				this.ui.selectIsSign.trigger("change");

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

			ChangeIsSign:function(e){
				var selectSign = $(e.target).val();
				if(selectSign == EnumIsSign.IsSign.Done){
					this.ui.wrapSignDate.removeClass("display");
					this.RenderDateTimePicker("yyyy-mm-dd",2,2,2,this.ui.wrapSignDate);
				}
				else{
					this.ui.wrapSignDate.addClass("display");
					this.ui.wrapSignDate.find("#SignDate").val('');
				}
			},
			//初始化所有日期选择器
			RenderDateTimePicker:function(dateFormatString,startView,minView,maxView,targetPicker){
				var dateNow = new Date();
				var today = dateNow.getFullYear() + "-" + dateNow.getMonth() + "-" + dateNow.getDate() + " "
				targetPicker.datetimepicker({     //调用bootstrap的datetimepicker插件
					format: dateFormatString,        //指定显示格式
					autoclose: true,        //点击具体日期或时间后关闭选择框
					startView:startView,            //设置起始选择框形式，2代表显示month
					minView:minView,
					maxView:maxView,
					startDate: new Date(today)
				});
			},
			/*
			 * 删除当前元素的父元素
			 * 用于删除可联系时间
			 * */
			RemoveParent:function(event){
				$(event.currentTarget).parent().remove();
			},
			/*
			* 插入方便联系时间元素到文档
			* @param:chatTimeModel，联系时间数据
			* */
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
					chatTimeModel = new EasyChatTimeModel.EasyChatTimeEntity({
						IfStudentID:this.model.get("StudentInfo").StudentID
					});
				}
				var easyChatTemp = _.template(EasyChatTimeTpl);
				this.ui.btnAddEasyChat.before(easyChatTemp(chatTimeModel.toJSON()));
				this.RenderDateTimePicker("hh:ii",0,0,0,this.$el.find(".easyChat-wrap .timePicker"));
			},
			/*
			* 更改联系时间后检测有效性
			* */
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
			/*
			* 检测时间有效性的具体逻辑
			* */
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
			/*
			* form 提交事件处理
			* */
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
							if(data.EditResult == true){
								ClientManage.navigate("StudentMgr/Index/List",{trigger:true});
							} else {
								alert("Edit Failed");
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
			/*
			* 保存模型的StudentInfo信息
			* */
			setStudentInfo:function(){
				var nameCn = this.$el.find('input[name=studentName]').eq(0).val();
				var liveCity = this.$el.find('input[name=liveCity]').eq(0).val();
				var mobile = this.$el.find('input[name=Mobile]').eq(0).val();
				var email = this.$el.find('input[name=Email]').eq(0).val();
				var remark = this.$el.find('#Remark').val();
				var studentInfo = this.model.get('StudentInfo');
				studentInfo.NameCn = nameCn;
				studentInfo.LiveCity = liveCity;
				studentInfo.Mobile = mobile;
				studentInfo.Email = email;
				studentInfo.CreateTime = this.transToDate(studentInfo.CreateTime);
				studentInfo.Remark = remark;
				//return this.model.get('StudentInfo');
			},
			/*
			* 保存模型的AppRelation信息
			* */
			setAppRelation:function(){
				var isSign = this.$el.find('#IsSign').val();
				var saleConsultant = this.$el.find('select#saleConsultant').val();
				var saleConsultantName = this.$el.find('select#saleConsultant option:selected').text();
				var appRelation = this.model.get('AppRelation');
				appRelation.IsSign = isSign;
				appRelation.SaleConsultant = saleConsultant;
				appRelation.SaleConsultantName = saleConsultantName;
				appRelation.SignDate = this.$el.find("#SignDate").val();
			},
			/*
			* 保存模型的EasyChatTimes信息
			* */
			setEasyChatTimes:function(){
				//Set EasyChatTimes
				var editView = this;
				this.model.set("EasyChatTimes",new EasyChatTimeModel.EasyChatTimeList);
				this.$el.find('.easyChat-wrap').each(function(index){
					var itemID = $(this).find("input[name=ItemID]").eq(0).val();
					var timeBegin = $(this).find("div.easyChat-begin input").eq(0).val();
					var timeEnd = $(this).find("div.easyChat-end input").eq(0).val();
					var ifStudentId = $(this).find("input[name=IfStudentID]").eq(0).val();
					var ifParentId = $(this).find("input[name=IfParentID]").eq(0).val();
					if(timeBegin != null && timeEnd != null){
						editView.model
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
			},
			/*
			* 将字符串/ Date / ******* / 转为JS的Date类型
			* */
			transToDate:function(msString){
				if(msString === null || msString == '')
					return "";

				var ms = msString.slice(6,-2);
				var msDate = new Date(parseInt(ms));
				return msDate.getFullYear() + "-" + (msDate.getMonth()+1) + "-" + msDate.getDate();

			}
		});
		View.EditContactItemView = Marionette.ItemView.extend({
			template:_.template(ContactContentTpl),
			templateHelpers:function(){
				var editView = this;
				_.each(this.model.get("EasyChatTimes"),function(item){
					item.TimeBegin = editView.dateToShortTime(item.TimeBegin);
					item.TimeEnd = editView.dateToShortTime(item.TimeEnd);
				});
				return {
					EasyChatTimes:this.model.get("EasyChatTimes")
				}
			},
			onRender:function(){
				this.$el
					.find("option[value=" + this.model.get("ContactIdentity").PersonIdentity + "]")
					.attr('selected','selected');
			},
			dateToShortTime:function(date){
				var hour = date.Hours;
				if(hour <10){
					hour = "0" + hour.toString();
				}
				var minute = date.Minutes;
				if(minute < 10){
					minute = "0" + minute.toString();
				}
				return hour + ":" + minute;
			}
		});
		View.EditContactsView = Marionette.CompositeView.extend({
			tagName:"div",
			className:"wrap",
			template: _.template(EditContactsTpl),
			itemView:View.EditContactItemView,
			ui:{
				"formSearch":"#editForm",                //form 元素
				"contactContent":".contact-content",       //筛选内容元素
				"btnAddEasyChat":".btnAddEasyChat",
				"btnAddContact":".btnAddContact",
				"removeParent":".removeParent",
				"timePicker":"div.easyChat-wrap .timePicker",
				"btnSubmit":"button#btnSubmit"           //submit 按钮
			},
			events:{
				'click @ui.btnAddEasyChat':'InsertEasyChatTemp',
				'click @ui.btnAddContact':'InsertContactTemp',
				'click @ui.removeParent':'RemoveParent',
				'changeDate @ui.timePicker':'ChatTimeChange',     //datetimepicker插件触发的changeDate事件
				'submit':'ContactsCommit'
			},
			initialize:function(options){
				if(options){
					this.studentID = options.studentID;
				}
			},
			/*
			 * 删除当前元素的父元素
			 * 用于删除可联系时间和联系人
			 * */
			RemoveParent:function(event){
				$(event.currentTarget).parent().remove();
			},
			InsertContactTemp:function(event){          //插入添加联系人的HTML
				var contactTemp = _.template(ContactContentTpl);
				var contactModel = new EasyChatTimeModel.EasyChatTimeModel({
					ContactIdentity:new EasyChatTimeModel.ContactIdentity,
					EasyChatTimes:new EasyChatTimeModel.EasyChatTimeList
				});
				$(event.target).before(contactTemp(contactModel.toJSON()));
			},
			InsertEasyChatTemp:function(event,chatTimeModel){         //插入添加联系时间的HTML
				if(!chatTimeModel){
					chatTimeModel = new EasyChatTimeModel.EasyChatTimeEntity();
				}
				var easyChatTemp = _.template(EasyChatTimeTpl);
				$(event.target).before(easyChatTemp(chatTimeModel.toJSON()));
				var dateNow = new Date();
				var today = dateNow.getFullYear() + "-" + dateNow.getMonth() + "-" + dateNow.getDate() + " "
				$('div.easyChat-wrap .timePicker').datetimepicker({     //调用bootstrap的datetimepicker插件
					format: "hh:ii",        //指定显示格式
					autoclose: true,        //点击具体日期或时间后关闭选择框
					startView:0,            //设置起始选择框形式，0代表显示hour
					minView:0,              //设置允许的最低层选择框形式
					maxView:0,               //设置允许的最顶层选择框形式
					startDate: new Date(today)
				});
			},
			ChatTimeChange:function(event){             //当chattime的值改变时触发，用于验证
				var easyChatWrap = $(event.currentTarget).parent();                 //找到父元素：div.easyChat-wrap
				this.CheckChatTimeValid(easyChatWrap);
			},
			//检查表单元素的值是否合法
			validateForm:function(){
				var createView = this;

				//检查联系人信息
				var contactValid = true;                        //Bool：联系人信息是否合法
				var chatTimeValid = true;                       //Bool：方便联系时间是否合法
				var contactList = $('fieldset.contactItem');    //获取所有ContactItem
				contactList.each(function(index){               //遍历ContactItem
					if(!createView.CheckRequire($(this),'class','ContactName','联系人名字')){
						contactValid = false;
						return false;//实现break功能
					}
					//遍历该ContactItem下所有联系时间条目
					$(this).find('.easyChat-wrap').each(function(index){
						//检查该联系时间条目的开始时间与结束时间
						if(!createView.CheckChatTimeValid($(this))){
							chatTimeValid = false;
							return false;//实现break功能
						}
					})

				});
				if(!contactValid || !chatTimeValid){            //如果联系人、联系时间其中之一不合法
					return false;
				}
				return true;
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
			appendHtml: function(collectionView, itemView, index){
					// If we've already rendered the main collection, just
					// append the new items directly into the element.
					collectionView.$el.find("div.contact-content").prepend(itemView.$el.html());
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
			findContactItem:function(contactIdentity){
				//获得符合contactValue的ContactItem
				var $contactItem = this.$el.find('select.ContactIdentity').filter(function(){
					return $(this).val() === contactIdentity;
				}).eq(0).parent();
				if(!$contactItem.hasClass('contactItem')){
					return null;
				}
				var contactItem = new EasyChatTimeModel.EasyChatTimeModel({
					ContactIdentity:new EasyChatTimeModel.ContactIdentity,
					EasyChatTimes:new EasyChatTimeModel.EasyChatTimeList
				});

				//Set ContactIdentity
				var personIdentity = contactIdentity;
				var nameCn = $contactItem.find('input.ContactName').val();
				var mobile = $contactItem.find('input.ContactMobile').val();
				var email = $contactItem.find('input.ContactEmail').val();

				contactItem.get("ContactIdentity").set({
					PersonIdentity:personIdentity,
					NameCn:nameCn,
					Mobile:mobile,
					Email:email
				});

				//Set EasyChatTimes
				$contactItem.find('.easyChat-wrap').each(function(index){
					var timeBegin = $(this).find("div.easyChat-begin input").eq(0).val();
					var timeEnd = $(this).find("div.easyChat-end input").eq(0).val();
					var ifStudentId = $(this).find("input.IfStudentID").eq(0).val();
					var ifParentId = $(this).find("input.IfParentID").eq(0).val();
					if(timeBegin != null && timeEnd != null){
						contactItem
							.get("EasyChatTimes")
							.add(
								new EasyChatTimeModel.EasyChatTimeEntity({
									TimeBegin:timeBegin,
									TimeEnd:timeEnd,
									IfStudentID:ifStudentId,
									IfParentID:ifParentId
								})
							);
					}
				});
				return contactItem;
			},
			ContactsCommit:function(e){
				//阻止默认的表单提交行为
				event.preventDefault();
				//如果表单通过验证检查
				if(this.validateForm()){
					//Collect the data from form
					var ContactFather = this.findContactItem("父亲");
					var ContactMother = this.findContactItem("母亲");
					var ContactOther = this.findContactItem("其他");

					var Contacts = [
						ContactFather,
						ContactMother,
						ContactOther
					];
					var studentID = this.studentID;
					var ajaxData = {
						studentID:studentID,
						Contacts:Contacts
					}

					var postUrl = this.$el.find("form#editForm").eq(0).attr("action");
					ajaxData = JSON.stringify(ajaxData);

					$.ajax({
						type: "POST",
						url: postUrl,
						data:ajaxData,
						dataType: 'json',
						contentType: 'application/json; charset=utf-8',
						success: function (data) {
							if(data == true){
								/*var url = "/Students/SaleTrack/FirstInterview/?id=" + data.StudentID.toString();
								 window.location.href = url;*/
								ClientManage.navigate("StudentMgr/Index/List",{trigger:true});
							}
						}
					});
				}else{
					return false;
				}
			}
		});
	});
	return ClientManage.StudentMgr.Index.Edit.View;
})
