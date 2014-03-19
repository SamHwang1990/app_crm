// JavaScript Document

$(document).ready(function(e) {
	
	/* Ajax 交互 Begin */
	function FirstRegTPInfoAjax(){
		if($("p.StudentName span").html() == ""){
			return;
		}
		else{
			var studentInfo = {
				StudentID:$("input.StudentID").val()
			};
			
			var sATSSATResult = GetSATSSATResult();
			
			var ajaxData = {
				StudentInfo:studentInfo,
				StudentTPInfo:GetTPInfo(),
				TFIELTSResult:GetTFIELTSResult(),
				SATSSATResult:sATSSATResult.SATSSATResult,
				SATSSATResultDetail:sATSSATResult.SATSSATResultDetail,
				SAT2Result:GetSAT2Result()
			};
		
			$.ajax({
				type: "POST",
				url: '@Url.Action("FirstRegTPInfo","StudentInfo")',
				data: JSON.stringify(ajaxData),
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',
				success: function (data) {
					alert(data);
					/*if(data.InfoResult == true){
						var url = "/Students/SaleTrack/FirstRegFormTP/?id=" + data.StudentID.toString();
						window.location.href = url;
					}*/
				}
			});
		}
	}
	
	
	function GetTPInfo(){
		var isIB = $("input[name=IsIB]").is(":checked");
		var isAP = $("input.IsAP").is(":checked");
		var isALevel = $("input.IsALevel").is(":checked");
		var otherTP1 = $("input.OtherTP1").val();
		var otherTP2 = $("input.OtherTP2").val();
		var strLangTran = $("input[name=IsLangTran]:checked").val();
		var isLangTran = false;
		var lT1CouseName = '';
		var lT1CouseAddress = '';
		var lT1DateBegin = '';
		var lT1DateEnd = '';
		if (strLangTran == "有") {
			isLangTran = true;
			lT1CouseName = $("input.LT1CouseName").val();
			lT1CouseAddress = $("input.LT1CouseAddress").val();
			lT1DateBegin = $("input.LT1DateBegin").val();
			lT1DateEnd = $("input.LT1DateEnd").val();
		}
		
		return {
			IsIB:isIB,
			IsAP:isAP,
			IsALevel:isALevel,
			OtherTP1:otherTP1,
			OtherTP2:otherTP2,
			IsLangTran:isLangTran,
			LT1CouseName:lT1CouseName,
			LT1CouseAddress:lT1CouseAddress,
			LT1DateBegin:lT1DateBegin,
			LT1DateEnd:lT1DateEnd
		}
	}
	
	function GetTFIELTSResult(){
		var resultID = $("tr.TFIELTSResult input.ResultID").val();
		var examType = $("input[name=IsHaveTFIELTS]:checked").val();
		var total = $("tr.TFIELTSResult input.Total").val();
		var examDate = $("tr.TFIELTSResult input.ExamDate").val();
		return {
			ResultID:resultID,
			ExamType:examType,
			Total:total,
			ExamDate:examDate
		}
	}
	
	function GetSATSSATResult(){
		var resultID = $("tr.SATSSATResult input.ResultID").val();
		var examType = $("input[name=IsHaveSATSSAT]:checked").val();
		var total = $("tr.SATSSATResult input.Total").val();
		var examDate = $("tr.SATSSATResult input.ExamDate").val();
		var satSSATResultDetail = GetSATSSATResultDetail(examType);
		var satSSATResult = {
			ResultID:resultID,
			ExamID:satSSATResultDetail.ExamID,
			ExamType:examType,
			Total:total,
			ExamDate:examDate
		};
		return {
			SATSSATResult:satSSATResult,
			SATSSATResultDetail:satSSATResultDetail
		}
	}
	
	function GetSATSSATResultDetail(examType){
		var examId = $("tr.SATSSATResult input.ExamID").val();
		var mathScore = $("tr.SATSSATResult input.Math").val();
		var reading = $("tr.SATSSATResult input.Reading").val();
		var writing = '';
		var vocabulary = '';
		if(examType == "SAT"){
			writing = $("tr.SATSSATResult input.WriVoc").val();
		}
		if(examType == "SSAT"){
			vocabulary = $("tr.SATSSATResult input.WriVoc").val();
		}
		var total = $("tr.SATSSATResult input.Total").val();
		return {
			ExamID:examId,
			MathScore:mathScore,
			Reading:reading,
			Writing:writing,
			Vocabulary:vocabulary,
			Total:total
		}
	}
	
	function GetSAT2Result(){
		var resultID = $("tr.SAT2Result input.ResultID").val();
		var examType = "SAT2";
		var total = $("tr.SAT2Result input.Total").val();
		var examDate = $("tr.SAT2Result input.ExamDate").val();
		return {
			ResultID:resultID,
			ExamType:examType,
			Total:total,
			ExamDate:examDate
		}
	}
	
	/* Ajax 交互 End */
	
	
	/*事件绑定 开始*/
	
	/* JQuery datapicker or datetimepicker Begin*/
	$("input.DatePick").datepicker({ 
		dateFormat: "yy/mm/dd"
	});
	
	$("input.YeahMonthPick").datepicker( {
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'yy/mm',
        onClose: function(dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, month, 1));
        }
    });
	
	/* JQuery datapicker or datetimepicker End*/
	
	/* Set IsLangTraining Begin */
	
	$("tr.LangTrainingInfo").on("click","input[type=radio]",function(e){
		SetLangTrainInfo($(this).val(),$(this));
	});
	
	function SetLangTrainInfo(radioValue){
		if(radioValue == "无"){
			arguments[1].siblings("input[type=text]").attr("readonly",true);
		}
		if(radioValue == "有"){
			arguments[1].siblings("input[type=text]").attr("readonly",false);
		}
	}
	
	$("tr.SATSSATResult").on("click","input[type=radio]",function(e){
		SetWriVocValue($(this).val(),$(this));
	});
	
	function SetWriVocValue(radioValue){
		if(radioValue == "SAT"){
			arguments[1].siblings("input.WriVoc").val("Writing");
			$("input.EnterTip").each(function () {
			var originValue = $(this).val();
			$(this).focusin(function (e) {
				if ($(this).val() == originValue) {
					$(this).val('');
				}
			});
			$(this).focusout(function (e) {
				if ($(this).val() == '') {
					$(this).val(originValue);
				}
			});
		});
		}
		if(radioValue == "SSAT"){
			arguments[1].siblings("input.WriVoc").val("Vocabulary");
			$("input.EnterTip").each(function () {
			var originValue = $(this).val();
			$(this).focusin(function (e) {
				if ($(this).val() == originValue) {
					$(this).val('');
				}
			});
			$(this).focusout(function (e) {
				if ($(this).val() == '') {
					$(this).val(originValue);
				}
			});
		});
		}
	}
	
	/* Set IsLangTraining End */
	
	/* EnterTip Begin */
	$("input.EnterTip").each(function () {
		var originValue = $(this).val();
		$(this).focusin(function (e) {
			if ($(this).val() == originValue) {
				$(this).val('');
			}
		});
		$(this).focusout(function (e) {
			if ($(this).val() == '') {
				$(this).val(originValue);
			}
		});
	});
	/* EnterTip End */
	
	$("form").submit(function(e) {
        e.preventDefault();
		FirstRegTPInfoAjax();
    });
	/*事件绑定 结束*/
	
	/* DOM 初始化 Begin*/
	$("input[type=radio][name=IsLangTran]").each(function(index, element) {
        if($(this).attr("checked")=="checked"){
			SetLangTrainInfo($(this).val(),$(this));
		}
    });
	/* DOM 初始化 End*/
	
});