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
				"ChkOtherNationIntention":".OtherNationIntention",

				"RadioIsLangTran":".IsLangTran",
				"HasLangTranWrap":".HasLangTranWrap",
				"DateLT1Begin":"#LT1DateBegin",
				"DateLT1End":"#LT1DateEnd",

				"RadioIsTFIELTS":".IsTFIELTS",
				"TFIELTSWrap":".TFIELTSWrap",

				"IsSatSsatWrap":".IsSATSSATWrap",
				"IsSAT2Wrap":".IsSAT2Wrap",

				"StudentFromWrap":".StudentFromWrap"
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
				this.RenderStudentTP();
				this.RenderStudentFrom();
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
				this.RenderStudentInfoHandler.SetEducationIntention.call(this);
				this.RenderStudentInfoHandler.SetGrade.call(this);
				this.RenderStudentInfoHandler.SetGraduationDate.call(this);
				this.RenderStudentInfoHandler.SetNationIntention.call(this);
			},
			//初始化StudentTP Form的信息
			RenderStudentTP:function(){
				this.RenderStudentTPHandler.SetIsLangTran.call(this);
				this.RenderStudentTPHandler.SetIsTFIELTS.call(this);
				this.RenderStudentTPHandler.SetSAT2Wrap.call(this);
				this.RenderStudentTPHandler.SetSatSsat.call(this);
			},
			//初始化StudentFrom Form的信息
			RenderStudentFrom:function(){
				this.RenderStudentFromHandler.SetFromItem.call(this);
			},
			RenderStudentInfoHandler:{
				SetGender:function(){
					var gender = this.model.get("StudentInfo").Gender;
					this.ui.SelectGender.find("option").removeAttr("selected");
					this.ui.SelectGender.find("option[value=" + gender + "]").attr("selected","selected");
				},
				SetEducationIntention:function(){
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

					if(commonNation == null){
						this.ui.ChkCommonNationIntention.removeAttr("checked");
					}else{
						this.ui.ChkCommonNationIntention.each(function(index){
							var nationName = $(this).attr("data-nationIntention");  //获取checkbox选项的国家值
							if(commonNation.indexOf(nationName) > -1){              //客户的留学国家字符串中是否包含上面的nationName
								$(this).attr("checked","checked");                  //有包含，则设置checkbox 被选中
							}
						})
					}

					if(otherNation != null && otherNation !== "" ){
						this.ui.ChkOtherNationIntention.attr('checked','checked');
					}
				}
			},
			RenderStudentTPHandler:{
				SetIsLangTran:function(){
					var isLangTran = this.model.get("StudentTPInfo").IsLangTran;
					var noLangTran = this.ui.RadioIsLangTran.filter("[value=NoLangTran]");
					var hasLangTran = this.ui.RadioIsLangTran.filter("[value=HasLangTran]");
					var hasLangTranDiv = this.ui.HasLangTranWrap;
					if(!isLangTran || isLangTran == null){
						hasLangTran.removeAttr("checked");
						hasLangTranDiv.addClass("display");
						//hasLangTranDiv.find('input').val('');   //清空div.HasLangTran下所有表单元素的value
						noLangTran.attr("checked","checked");
					}
					else{
						noLangTran.removeAttr("checked");
						hasLangTran.attr("checked","checked");
						hasLangTranDiv.removeClass("display");
						var lt1Begin = this.TransToDate(this.model.get("StudentTPInfo").LT1DateBegin);
						var lt1End = this.TransToDate(this.model.get("StudentTPInfo").LT1DateEnd);

						this.ui.DateLT1Begin.val(lt1Begin);
						this.ui.DateLT1End.val(lt1End);
					}
				},
				SetIsTFIELTS:function(){
					var examType = this.model.get("TFIELTSResult").ExamType;
					var total = this.model.get("TFIELTSResult").Total;
					var examDate = this.TransToDate(this.model.get("TFIELTSResult").ExamDate);
					var nextExamDate = this.TransToDate(this.model.get("TFIELTSResult").NextExamDate);
					if(examType == "0"){
						this.ui.RadioIsTFIELTS.filter("[value=IsTF]").attr("checked","checked");
					}
					if(examType == "1"){
						this.ui.RadioIsTFIELTS.filter("[value=IsIELTS]").attr("checked","checked");
					}
					this.ui.TFIELTSWrap.find("input.ExamDate").val(examDate);
					this.ui.TFIELTSWrap.find("input.NextExamDate").val(nextExamDate);

					if(total == '0' || total== null || total == ''){   //如果total为0或null，则表示数据库中并无符合条件的考试记录
						this.ui.TFIELTSWrap.find("input").val('');      //清空TFIELTSWrap 下所有input元素的value
					}

				},
				SetSatSsat:function(){
					if(this.ui.SelectEducationIntention.val() != "1" && this.ui.SelectEducationIntention.val() != "0"){
						return this.ui.IsSatSsatWrap.addClass("display");
					}

					var examType = this.model.get("SATSSATResult").ExamType;
					var total = this.model.get("SATSSATResult").Total;
					var examDate = this.TransToDate(this.model.get("SATSSATResult").ExamDate);
					var nextExamDate = this.TransToDate(this.model.get("SATSSATResult").NextExamDate);
					var vocabulary = this.model.get("SATSSATResultDetail").Vocabulary;
					var writing = this.model.get("SATSSATResultDetail").Writing;
					var $WriVoc = this.ui.IsSatSsatWrap.find("[name=WriVoc]");

					if(examType == "2"){
						$WriVoc.attr("placeholder","Writing");
						$WriVoc.val(writing);
					}
					if(examType == "4"){
						$WriVoc.attr("placeholder","Vocabulary");
						$WriVoc.val(vocabulary);
					}
					this.ui.IsSatSsatWrap.find("input.ExamDate").val(examDate);
					this.ui.IsSatSsatWrap.find("input.NextExamDate").val(nextExamDate);

					if(total == '0' || total== null || total == ''){   //如果total为0或null，则表示数据库中并无符合条件的考试记录
						this.ui.IsSatSsatWrap.find("input").val('');      //清空TFIELTSWrap 下所有input元素的value
					}
				},
				SetSAT2Wrap:function(){
					if(this.ui.SelectEducationIntention.val() == "1"){
						this.ui.IsSAT2Wrap.removeClass("display");
						this.ui.IsSAT2Wrap.find("input").val('');
						return;
					}

					var examType = this.model.get("SAT2Result").ExamType;
					var total = this.model.get("SAT2Result").Total;
					var examDate = this.TransToDate(this.model.get("SAT2Result").ExamDate);
					var nextExamDate = this.TransToDate(this.model.get("SAT2Result").NextExamDate);

					this.ui.IsSAT2Wrap.find("input.ExamDate").val(examDate);
					this.ui.IsSAT2Wrap.find("input.NextExamDate").val(nextExamDate);

					if(total == '0' || total== null || total == ''){   //如果total为0或null，则表示数据库中并无符合条件的考试记录
						this.ui.IsSAT2Wrap.find("input").val('');      //清空TFIELTSWrap 下所有input元素的value
					}
				}
			},
			RenderStudentFromHandler:{
				SetFromItem:function(){
					var regView = this;
					_.each(this.model.get("StudentFromList"),function(fromItem){
						var itemName = "SourceItem-" + fromItem.SourceName;
						var $targetP = regView.ui.StudentFromWrap.find("p." + itemName);
						$targetP.find(".chkIsFrom").attr("checked","checked");
						$targetP.find(".DetailContent").val(fromItem.SourceDetailContent);
					})
				}
			},
			/*
			 * 将字符串/ Date / ******* / 转为JS的Date类型
			 * 并转为ShortDateString，如1990-10-10
			 * */
			TransToDate:function(msString){
				if(msString == null || msString === ''){
					return '';
				}
				var ms = msString.slice(6,-2);
				var msDate = new Date(parseInt(ms));
				var dateStr = msDate.getFullYear() + "-" + (msDate.getMonth()+1) + "-" + msDate.getDate();
				return dateStr;
			}
		})
	})
	return ClientManage.StudentMgr.SaleTrack.FirstInterviewReg.View;
})

