/***************************************
 * Created by samhwang1990@gmail.com on 14-5-19.
 * StudentMgr/Index/Edit View
 ***************************************/

define([
	'app',
	'models/StudentMgr/EasyChatTimeModel',
	'text!templates/StudentMgr/Index/EditStudent.html',             //StudentMgr的Student Create模板
	'text!templates/StudentMgr/Index/ContactContent.html',          //StudentMgr的联系人模板
	'text!templates/StudentMgr/Index/EasyChatTime.html',            //StudentMgr的可联系时间模板,
	'libs/bootstrap/datetimepicker/bootstrap-datetimepicker.min'    //bootstrap datetimepicker插件js引入
	],function(ClientManage,EasyChatTimeModel,EditStudentTpl,ContactContentTpl,EasyChatTimeTpl,Datetimepicker,SaleConsultantView){
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
				'submit':'CreateSubmit'
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
			},
			/*
			 * 删除当前元素的父元素
			 * 用于删除可联系时间
			 * */
			RemoveParent:function(event){
				$(event.currentTarget).parent().remove();
			},
			InsertEasyChatTemp:function(event){         //插入添加联系时间的HTML
				var easyChatTemp = _.template(EasyChatTimeTpl);
				$(event.target).before(easyChatTemp({}));
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
			}
		});
		View.EditContactView = Marionette.Layout.extend({

		});
	});
	return ClientManage.StudentMgr.Index.Edit.View;
})
