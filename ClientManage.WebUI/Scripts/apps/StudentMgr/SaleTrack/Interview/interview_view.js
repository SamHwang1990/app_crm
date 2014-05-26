/***************************************
 * Created by samhwang1990@gmail.com on 14-5-26.
 * StudentMgr/SaleTrack/FirstInterview View
 * StudentMgr/SaleTrack/CommonInterview View
 ***************************************/

define([
	'app',
	'models/StudentMgr/SaleTrack/SaleTrackAjaxViewModel',
	'text!templates/StudentMgr/SaleTrack/FirstInterview.html',          //StudentMgr/SaleTrack的Create FirstInterview 模板
	'libs/bootstrap/datetimepicker/bootstrap-datetimepicker.min',    //bootstrap datetimepicker插件js引入
	'models/StudentMgr/SaleTrack/SaleTrackParticipantsEntity',
	'text!templates/StudentMgr/SaleTrack/SaleParticipantItem.html'
	],function(ClientManage,SaleTrackAjaxViewModel,FirstInterviewTpl,Datetimepicker,SaleTrackParticipantsEntity,SaleParticipantItemTpl){
	ClientManage.module('StudentMgr.SaleTrack.Interview.View',function(View,ClientManage,Backbone, Marionette, $, _){
		View.FirstInterviewView = Marionette.Layout.extend({
			template:_.template(FirstInterviewTpl),
			templateHelpers:function(){
				return {
				}
			},
			tagName:"div",
			className:"wrap",
			ui:{
				"Form":"FirstInterviewForm",
				"AddParticipant":"input.AddParticipant",
				"AddParticipantFromContacts":"input.AddParticipantFromContacts",
				"AddParticipantFromUsers":"input.AddParticipantFromUsers",
				"RemoveParent":"a.removeParent",
				"TableParticipants":"div.TrackParticipants table",
				"SubmitBtn":"div.btnSubmit"
			},
			events:{
				"submit":"FirstInterviewSubmit",
				"click @ui.RemoveParent":"RemoveParent",
				"click @ui.AddParticipant":"AddParticipant",
				"click @ui.AddParticipantFromContacts":"AddParticipantFromContacts",
				"click @ui.AddParticipantFromUsers":"AddParticipantFromUsers"
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
			setTrackDate:function(trackDate){
				var dateStr = trackDate.getFullYear() + "-" + trackDate.getMonth() + "-" + trackDate.getDate() + " " +
					trackDate.getHours() + ":" + trackDate.getMinutes();
				this.$el.find("#TrackDate").val(dateStr);
				this.$el.find('.timePicker').datetimepicker({     //调用bootstrap的datetimepicker插件
					format: "yyyy-mm-dd hh:ii",        //指定显示格式
					autoclose: true,        //点击具体日期或时间后关闭选择框
					startView:2,            //设置起始选择框形式，2代表显示month
					initialDate:trackDate
				});
			},
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
			RemoveParent:function(event){
				$(event.currentTarget).parents('tr').remove();
			},
			AddParticipant:function(e){
				var newParticipant = new SaleTrackParticipantsEntity();
				newParticipant.set("ParticipantSource","no");
				var participantTpl = _.template(SaleParticipantItemTpl);
				var participantHtml = participantTpl(newParticipant.toJSON());
				this.ui.TableParticipants.append(participantHtml);
			},
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
							newParticipant.set("ParticipantSource","Contacts");
							newParticipant.set("Contacts",contactList.toJSON());
							var participantTpl = _.template(SaleParticipantItemTpl);
							var participantHtml = participantTpl(newParticipant.toJSON());
							var $newParticipant = $(participantHtml);
							$newParticipant.appendTo(interviewView.ui.TableParticipants);
							$newParticipant.on("change","select.ParticipantFromContacts",function(e){
								var userName = $(this).val();
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
							$newParticipant.find("select.ParticipantFromContacts").trigger("change");
						},
						error:function(){
							alert("获取用户信息失败")
						}
					})
				})
			},
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
			ChangeParticipantInfo:function(wrapTr,email,mobile,identity){
				wrapTr.find(".ParticipantEmail").val(email);
				wrapTr.find(".ParticipantMobile").val(mobile);
				wrapTr.find(".ParticipantIdentity option[value=" + identity + "]").attr("selected","selected");
			},
			FirstInterviewSubmit:function(e){
				e.preventDefault();
			}
			//事件处理程序 结束


		});
	});
	return ClientManage.StudentMgr.SaleTrack.Interview.View;
})
