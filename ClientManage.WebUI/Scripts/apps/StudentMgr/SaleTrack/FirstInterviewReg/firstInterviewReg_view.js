/***************************************
 * Created by samhwang1990@gmail.com on 14-5-30.
 * StudentMgr/SaleTrack/FirstInterviewReg View
 ***************************************/

define([
	'app',
	'models/StudentMgr/SaleTrack/FirstInterviewRegModel',
	'text!templates/StudentMgr/SaleTrack/FirstInterviewReg.html',
	'libs/bootstrap/datetimepicker/bootstrap-datetimepicker.min'
	],function(ClientManage,FirstInterviewRegModel,FirstInterviewRegTpl,Datetimepicker){
	ClientManage.module('StudentMgr.SaleTrack.FirstInterviewReg.View',function(View,ClientManage,Backbone, Marionette, $, _){
		View.FirstInterviewRegView = Marionette.Layout.extend({
			template:_.template(FirstInterviewRegTpl),
			templateHelpers:function(){
				return {}
			},
			tagName:"div",
			className:"wrap",
			ui:{
				"TabStudentInfo":"div#tabFirstInterviewRegInfo",
				"TabStudentTP":"div#tabFirstInterviewRegInfo",
				"TabStudentFrom":"div#tabFirstInterviewRegFrom",

				"FormStudentInfo":"form#FirstInterviewRegInfoForm",
				"FormStudentTP":"form#FirstInterviewRegTPForm",
				"FormStudentFrom":"form#FirstInterviewRegFromForm",

				"BtnSubmitInfo":"#btnSubmitInfo",
				"BtnSubmitTP":"#btnSubmitTP",
				"BtnSubmitFrom":"#btnSubmitFrom",

				"SelectGender":"#Gender",
				"SelectEducationIntention":"#EducationIntention",
				"SelectGrade":"#Grade",

				"DateGraduation":"#GraduationDate",
				"ChkCommonNationIntention":".CommonNationIntention",
				"ChkOtherNationIntention":".OtherNationIntention"
			},
			event:{

			},
			initialize:function(options){
				if(options){
					this.StudentID = options.StudentID;
				}
			},
			onRender:function(){
				this.RenderDateTimePicker();
				this.RenderStudentInfo();
			},
			//初始化所有日期选择器
			RenderDateTimePicker:function(){
				this.$el.find('.timePicker').datetimepicker({     //调用bootstrap的datetimepicker插件
					format: "yyyy-mm-dd",        //指定显示格式
					autoclose: true,        //点击具体日期或时间后关闭选择框
					startView:2,            //设置起始选择框形式，2代表显示month
					minView:2
				});
			},
			//初始化StudentInfo Form的信息
			RenderStudentInfo:function(){
				this.RenderStudentInfoHandler.SetGender.call(this);
				this.RenderStudentInfoHandler.SetEducationIntentionHandler.call(this);
				this.RenderStudentInfoHandler.SetGrade.call(this);
				this.RenderStudentInfoHandler.SetGraduationDate.call(this);
			},
			//初始化StudentTP Form的信息
			RenderStudentTP:function(){

			},
			//初始化StudentFrom Form的信息
			RenderStudentFrom:function(){

			},
			RenderStudentInfoHandler:{
				SetGender:function(){
					var gender = this.model.get("StudentInfo").Gender;
					this.ui.SelectGender.find("option").removeAttr("selected");
					this.ui.SelectGender.find("option[value=" + gender + "]").attr("selected","selected");
				},
				SetEducationIntentionHandler:function(){
					var eduIntention = this.model.get("StudentInfo").EducationIntention;
					this.ui.SelectEducationIntention.find("option").removeAttr("selected");
					this.ui.SelectEducationIntention.find("option[value=" + eduIntention + "]").attr("selected","selected");
				},
				SetGrade:function(){
					var grade = this.model.get("StudentInfo").Grade;
					this.ui.SelectGrade.find("option").removeAttr("selected");
					this.ui.SelectGrade.find("option[value=" + grade + "]").attr("selected","selected");
				},
				SetGraduationDate:function(){
					var graduationDate = this.TransToDate(this.model.get("StudentInfo").GraduationDate);
					this.ui.DateGraduation.val(graduationDate);
				},
				SetNationIntention:function(){
					var commonNation = this.model.get("StudentInfo").NationIntention;
					var otherNation = this.model.get("StudentInfo").OtherNationIntention;

					this.ui.ChkCommonNationIntention.each(function(index){
						var nationName = $(this).attr("data-nationIntention");
						if(commonNation.indexOf(nationName) > -1){
							$(this).attr("checked","checked");
						}
					})
				}
			},
			RenderStudentTPHandler:{

			},
			RenderStudentFromHandler:{

			},
			/*
			 * 将字符串/ Date / ******* / 转为JS的Date类型
			 * 并转为ShortDateString，如1990-10-10
			 * */
			TransToDate:function(msString){
				var ms = msString.slice(6,-2);
				var msDate = new Date(parseInt(ms));
				var dateStr = msDate.getFullYear() + "-" + (msDate.getMonth()+1) + "-" + msDate.getDate();
				return dateStr;
			}
		})
	})
	return ClientManage.StudentMgr.SaleTrack.FirstInterviewReg.View;
})

