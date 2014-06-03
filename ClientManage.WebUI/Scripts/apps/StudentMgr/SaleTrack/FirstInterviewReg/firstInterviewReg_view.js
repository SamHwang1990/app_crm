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
			events:{
				"click .IsLangTran":"ClickIsLangTran",
				//"change @ui.SelectEducationIntention":"ChangeEducationIntention"
				"submit @ui.FormStudentInfo":"SubmitStudentInfo",
				"submit @ui.FormStudentTP":"SubmitStudentTP",
				"submit @ui.FormStudentFrom":"SubmitStudentFrom"
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

			ClickIsLangTran:function(e){
				var hasLangTranDiv = this.ui.HasLangTranWrap;
				var isLangTran = $(e.target).val();
				if(isLangTran == "NoLangTran"){
					hasLangTranDiv.addClass("display");
				}else if(isLangTran == "HasLangTran"){
					hasLangTranDiv.removeClass("display");
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
				return msDate.getFullYear() + "-" + (msDate.getMonth()+1) + "-" + msDate.getDate();
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
					this.SetFeedbackMsg('','inputInvalid','remove');
					return true;
				}
			},
			validateInfoForm:function(){
				//检查基础必备信息是否已填写
				if(!this.CheckRequire(this.$el,'id','SchoolCn','学校名称')){
					return false;
				}
				return true;
			},
			validateTPForm:function(){

			},
			validateFromForm:function(){

			},
			SubmitStudentInfo:function(e){
				e.preventDefault();
				if(this.validateInfoForm()){
					this.SetModel.SetStudentInfo.call(this);
					var ajaxData = JSON.stringify(this.model);
					var postUrl = this.ui.FormStudentInfo.attr("action");
					$.ajax({
						type: "POST",
						url: postUrl,
						data: ajaxData,
						dataType: 'json',
						contentType: 'application/json; charset=utf-8',
						success: function (data) {
							if(data)
								alert("Post Successfully");
							else{
								alert("Post Failed");
							}
						},
						error:function(data){
							alert(JSON.stringify(data));
						}
					});
				}else{
					return false;
				}
			},
			SetModel:{
				SetStudentInfo:function(){
					var studentInfo = this.model.get("StudentInfo");
					var infoForm = this.ui.FormStudentInfo;
					var gender = infoForm.find("#Gender").val();
					var liveCity = infoForm.find("#LiveCity").val();
					var nationIntention = '';
					this.ui.ChkCommonNationIntention.each(function(index){
						if($(this).is(":checked")){
							nationIntention += nationIntention + $(this).attr("data-nationIntention");
						}
					})
					var otherNationIntention = infoForm.find(".txtOtherNationIntention").val();

					var educationIntention = infoForm.find("#EducationIntention").val();
					var schoolCn = infoForm.find("#SchoolCn").val();
					var grade = infoForm.find("#Grade").val();
					var graduationDate = infoForm.find("#GraduationDate").val();
					var gradeRank = infoForm.find("#GradeRank").val();
					var gradeScale = infoForm.find("#GradeScale").val();
					var averScore = infoForm.find("#AverageScore").val();

					studentInfo.Gender = gender;
					studentInfo.LiveCity = liveCity;
					studentInfo.NationIntention = nationIntention;
					studentInfo.OtherNationIntention = otherNationIntention;
					studentInfo.EducationIntention = educationIntention;
					studentInfo.SchoolCn = schoolCn;
					studentInfo.Grade = grade;
					studentInfo.GraduationDate = graduationDate;
					studentInfo.GradeRank = gradeRank;
					studentInfo.GradeScale = gradeScale;
					studentInfo.AverageScore = averScore;

					return;
				}
			}
		})
	})
	return ClientManage.StudentMgr.SaleTrack.FirstInterviewReg.View;
})

