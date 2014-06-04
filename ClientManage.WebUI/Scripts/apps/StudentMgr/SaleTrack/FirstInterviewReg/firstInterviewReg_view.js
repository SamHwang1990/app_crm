/***************************************
 * Created by samhwang1990@gmail.com on 14-5-30.
 * StudentMgr/SaleTrack/FirstInterviewReg View
 ***************************************/

define([
	'app',
	'models/StudentMgr/SaleTrack/FirstInterviewRegModel',
	'text!templates/StudentMgr/SaleTrack/FirstInterviewReg.html',
	'libs/bootstrap/datetimepicker/bootstrap-datetimepicker.min',
	'models/StudentMgr/EnumModel/ExamType',
	'models/StudentMgr/EnumModel/EducationIntention'
	],function(ClientManage,FirstInterviewRegModel,FirstInterviewRegTpl,Datetimepicker,EnumExamType,EnumEducationIntention){
	ClientManage.module('StudentMgr.SaleTrack.FirstInterviewReg.View',function(View,ClientManage,Backbone, Marionette, $, _){
		View.FirstInterviewRegView = Marionette.Layout.extend({
			template:_.template(FirstInterviewRegTpl),
			templateHelpers:function(){
				return {}
			},
			tagName:"div",
			className:"wrap",
			ui:{
				"NavRegFrom":"#FirstInterviewRegFromNav",

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

				"ExamResultWrap":".ExamResultWrap",

				"RadioIsTFIELTS":".IsTFIELTS",
				"TFIELTSWrap":".TFIELTSWrap",

				"IsSatSsatWrap":".IsSATSSATWrap",
				"IsSAT2Wrap":".IsSAT2Wrap",
				"IsAPWrap":".IsAPWrap",

				"IsGREGMATWrap":".IsGREGMATWrap",
				"HasGREGMASTChose":".HasGREGMASTChose",
				"GREGMATWrap":".GREGMATWrap",

				"StudentFromWrap":".StudentFromWrap"
			},
			events:{
				"click .IsLangTran":"ClickIsLangTran",
				"change @ui.SelectEducationIntention":"ChangeEducationIntention",
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
				this.RenderStudentTPHandler.SetAPResult.call(this);
				this.RenderStudentTPHandler.SetGreGmat.call(this);
				this.ui.SelectEducationIntention.trigger("change");
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
					if(examType == EnumExamType.TOFEL){
						this.ui.RadioIsTFIELTS.filter("[value=IsTF]").attr("checked","checked");
					}
					if(examType == EnumExamType.IELTS){
						this.ui.RadioIsTFIELTS.filter("[value=IsIELTS]").attr("checked","checked");
					}
					this.RenderStudentTPHandler.SetInputCommon.call(this,this.ui.TFIELTSWrap,"TFIELTSResult");

				},
				SetSatSsat:function(){
					var eduIntention = this.ui.SelectEducationIntention.val();
					var vocabulary = this.model.get("SATSSATResultDetail").Vocabulary;
					var writing = this.model.get("SATSSATResultDetail").Writing;
					var $WriVoc = this.ui.IsSatSsatWrap.find("[name=WriVoc]");

					if(eduIntention == EnumEducationIntention.UnderGrade){
						this.model.get("SATSSATResult").ExamType = EnumExamType.SAT;
						$WriVoc.attr("placeholder","Writing");
						$WriVoc.val(writing);
					}else if(eduIntention == EnumEducationIntention.Senior){
						this.model.get("SATSSATResult").ExamType = EnumExamType.SSAT;
						$WriVoc.attr("placeholder","Vocabulary");
						$WriVoc.val(vocabulary);
					}

					this.RenderStudentTPHandler.SetInputCommon.call(this,this.ui.IsSatSsatWrap,"SATSSATResult");
				},
				SetSAT2Wrap:function(){
					this.RenderStudentTPHandler.SetInputCommon.call(this,this.ui.IsSAT2Wrap,"SAT2Result");
				},
				SetAPResult:function(){
					this.RenderStudentTPHandler.SetInputCommon.call(this,this.ui.IsAPWrap,"APResult");
				},
				SetGreGmat:function(){
					var greGmatResult = this.model.get("GREGMATResult");
					if(greGmatResult.Total > 0){
						var examType = greGmatResult.ExamType;
						this.ui.HasGREGMASTChose.find(".IsGREGMAT").each(function(i){
							if($(this).val() == examType){
								$(this).attr("checked","checked");
							}
						})
					}
					this.RenderStudentTPHandler.SetInputCommon.call(this,this.ui.IsGREGMATWrap,"GREGMATResult");
				},
				SetInputCommon:function(inputWrap, modelName){
					var total = this.model.get(modelName).Total;
					var examDate = this.TransToDate(this.model.get(modelName).ExamDate);
					var nextExamDate = this.TransToDate(this.model.get(modelName).NextExamDate);

					inputWrap.find("input.ExamDate").val(examDate);
					inputWrap.find("input.NextExamDate").val(nextExamDate);

					if(total == '0' || total== null || total == ''){   //如果total为0或null，则表示数据库中并无符合条件的考试记录
						inputWrap.find("input[type=text]").val('');      //清空TFIELTSWrap 下所有input元素的value
					}
				}
			},
			RenderStudentFromHandler:{
				SetFromItem:function(){
					var regView = this;
					_.each(this.model.get("StudentFromList"),function(fromItem){
						var itemName = fromItem.SourceName;
						var $targetP = regView.ui.StudentFromWrap.find("p[data-ItemName='" + itemName + "']");
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
			ChangeEducationIntention:function(e){
				var intention = $(e.target).val();
				this.ui.ExamResultWrap.addClass("display");
				switch (intention){
					case EnumEducationIntention.Senior:
						this.ui.IsSatSsatWrap.removeClass("display");
						break;
					case EnumEducationIntention.UnderGrade:
						this.ui.IsSatSsatWrap.removeClass("display");
						this.ui.IsSAT2Wrap.removeClass("display");
						break;
					case EnumEducationIntention.Master:
						this.ui.IsGREGMATWrap.removeClass("display");
						break;
					default :
						break;
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
					var regView = this;
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
								regView.ui.NavRegFrom.find("li:eq(1) a").tab('show');
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
			SubmitStudentTP:function(e){
				e.preventDefault();
				this.SetModel.SetStudentInfo.call(this);
				this.SetModel.SetStudentTPInfo.call(this);
				this.SetModel.SetTfIeltsResult.call(this);
				this.SetModel.SetSatSsatResult.call(this);
				this.SetModel.SetSat2Result.call(this);
				this.SetModel.SetAPResult.call(this);
				this.SetModel.SetGreGmatResult.call(this);

				var regView = this;

				var ajaxData = JSON.stringify(this.model);
				var postUrl = this.ui.FormStudentTP.attr("action");
				$.ajax({
					type: "POST",
					url: postUrl,
					data: ajaxData,
					dataType: 'json',
					contentType: 'application/json; charset=utf-8',
					success: function (data) {
						if(data)
							regView.ui.NavRegFrom.find("li:eq(2) a").tab('show');
						else{
							alert("Post Failed");
						}
					},
					error:function(data){
						alert(JSON.stringify(data));
					}
				});

			},
			SubmitStudentFrom:function(e){
				e.preventDefault();
				var that = this;
				require([
					'models/StudentMgr/SaleTrack/StudentFromModel',
					'collections/StudentMgr/SaleTrack/StudentFromCollection'
					],function(StudentFromModel,StudentFromCollection){
					that.SetModel.SetStudentFromList.call(that,StudentFromModel,StudentFromCollection);
					var ajaxData = JSON.stringify(that.model);
					var postUrl = that.ui.FormStudentFrom.attr("action");
					$.ajax({
						type: "POST",
						url: postUrl,
						data: ajaxData,
						dataType: 'json',
						contentType: 'application/json; charset=utf-8',
						success: function (data) {
							if(data)
								ClientManage.navigate("StudentMgr/SaleTrack/AppInterview-"+that.StudentID,{trigger:true});
							else{
								alert("Post Failed");
							}
						},
						error:function(data){
							alert(JSON.stringify(data));
						}
					});
				})
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
				},
				SetStudentTPInfo:function(){
					var studentTPInfo = this.model.get("StudentTPInfo");
					var tpform = this.ui.FormStudentTP;

					var isIB = tpform.find(".IsIB").is(":checked");
					var isAP = tpform.find(".IsAP").is(":checked");
					var isALevel = tpform.find(".IsALevel").is(":checked");
					var otherTP1 = tpform.find(".OtherTP1").val();
					var otherTP2 = tpform.find(".OtherTP2").val();
					var isLangTran = tpform.find("[name=IsLangTran]:checked").val() == "NoLangTran" ? false : true;
					var lt1CourseName = tpform.find(".LT1CourseName").val();
					var lt1CourseAddress = tpform.find(".LT1CourseAddress").val();
					var lt1DateBegin = tpform.find(".LT1DateBegin").val();
					var lt1DateEnd = tpform.find(".LT1DateEnd").val();

					studentTPInfo.IsIB = isIB;
					studentTPInfo.IsALevel = isALevel;
					studentTPInfo.IsAP = isAP;
					studentTPInfo.OtherTP1 = otherTP1;
					studentTPInfo.OtherTP2 = otherTP2;
					studentTPInfo.IsLangTran = isLangTran;
					if(!isLangTran){
						studentTPInfo.LT1CourseName =
							studentTPInfo.LT1CouseAddress =
								studentTPInfo.LT1DateBegin =
									studentTPInfo.LT1DateEnd = '';
					}else{
						studentTPInfo.LT1CourseName = lt1CourseName;
						studentTPInfo.LT1CouseAddress = lt1CourseAddress;
						studentTPInfo.LT1DateBegin = lt1DateBegin;
						studentTPInfo.LT1DateEnd = lt1DateEnd;
					}

					return;
				},
				SetTfIeltsResult:function(){
					var tpform = this.ui.FormStudentTP;
					var tfIELTSWrap = this.ui.TFIELTSWrap;
					var tFIELTSResult = this.model.get("TFIELTSResult");
					var tFIELTSResultDetail = this.model.get("TFIELTSResultDetail");

					var examType = tpform.find(".IsTFIELTS:checked").val() == "IsTF" ? "0" : "1";
					var total = tfIELTSWrap.find(".Total").val();
					var examDate = tfIELTSWrap.find(".ExamDate").val();
					var nextExamDate = tfIELTSWrap.find(".NextExamDate").val();

					tFIELTSResult.ExamType = examType;
					tFIELTSResult.Total = tFIELTSResultDetail.Total = total;
					tFIELTSResult.ExamDate = examDate;
					tFIELTSResult.NextExamDate = nextExamDate;
				},
				SetSatSsatResult:function(){
					var isSatSsatWrap = this.ui.IsSatSsatWrap;
					var satSsatWrap = isSatSsatWrap.find(".SATSSATWrap");
					var satSsatResult = this.model.get("SATSSATResult");
					var satSsatResultDetail = this.model.get("SATSSATResultDetail");

					var examType = this.model.get("SATSSATResult").ExamType;
					var total = satSsatWrap.find(".Total").val();
					var examDate = satSsatWrap.find(".ExamDate").val();
					var nextExamDate = satSsatWrap.find(".NextExamDate").val();
					var math = satSsatWrap.find(".Math").val();
					var reading = satSsatWrap.find(".Reading").val();
					var wriVoc = satSsatWrap.find(".WriVoc").val();
					var writing,vocabulary;
					if(examType == "2"){
						writing = wriVoc;
					}else if(examType == "4"){
						vocabulary = wriVoc;
					}

					satSsatResult.ExamType = examType;
					satSsatResult.Total = satSsatResultDetail.Total = total;
					satSsatResult.ExamDate = examDate;
					satSsatResult.NextExamDate = nextExamDate;

					satSsatResultDetail.MathScore = math;
					satSsatResultDetail.Reading = reading;
					satSsatResultDetail.Writing = writing;
					satSsatResultDetail.Vocabulary = vocabulary;

				},
				SetSat2Result:function(){
					var sat2Wrap = this.ui.IsSAT2Wrap;
					var sat2Result = this.model.get("SAT2Result");

					var total = sat2Wrap.find(".Total").val();
					var examDate = sat2Wrap.find(".ExamDate").val();
					var nextExamDate = sat2Wrap.find(".NextExamDate").val();

					sat2Result.Total = total;
					sat2Result.ExamDate = examDate;
					sat2Result.NextExamDate = nextExamDate;
				},
				SetGreGmatResult:function(){
					var greGmatWrap = this.ui.GREGMATWrap;
					var greGmatResult = this.model.get("GREGMATResult");
					var greGmatResultDetail = this.model.get("GREGMATResultDetail");

					var examType = this.ui.HasGREGMASTChose.find(".IsGREGMAT:checked").val();
					var total = greGmatWrap.find(".Total").val();
					var examDate = greGmatWrap.find(".ExamDate").val();
					var nextExamDate = greGmatWrap.find(".NextExamDate").val();
					var math = greGmatWrap.find(".Math").val();
					var verbel = greGmatWrap.find(".Verbal").val();
					var writing = greGmatWrap.find(".Writing").val();

					greGmatResult.ExamType = examType;
					greGmatResult.Total = greGmatResultDetail.Total = total;
					greGmatResult.ExamDate = examDate;
					greGmatResult.NextExamDate = nextExamDate;

					greGmatResultDetail.MathScore = math;
					greGmatResultDetail.Verbal = verbel;
					greGmatResultDetail.Writing = writing;
				},
				SetAPResult:function(){
					var apWrap = this.ui.IsAPWrap;
					var apResult = this.model.get("APResult");

					var total = apWrap.find(".Total").val();
					var examDate = apWrap.find(".ExamDate").val();
					var nextExamDate = apWrap.find(".NextExamDate").val();

					apResult.Total = total;
					apResult.ExamDate = examDate;
					apResult.NextExamDate = nextExamDate;
				},
				SetStudentFromList:function(StudentFromModel,StudentFromCollection){
					var studentID = this.StudentID;
					var studentFromList = new StudentFromCollection()

					var chkIsFrom = this.$el.find(".chkIsFrom:checked");
					chkIsFrom.each(function(i){
						var itemName = $(this).siblings("span.SourceName").text();
						var itemKeyword = $(this).siblings(".SourceDetailKeyword").val();
						var itemContent = $(this).siblings(".DetailContent").val();
						studentFromList.add(
							new StudentFromModel({
								StudentID : studentID,
								SourceName : itemName,
								SourceDetailKeyword : itemKeyword,
								SourceDetailContent : itemContent
							})
						)
					});
					this.model.set("StudentFromList",studentFromList);
					return;
				}
			}
		})
	})
	return ClientManage.StudentMgr.SaleTrack.FirstInterviewReg.View;
})

