// JavaScript Document

$(document).ready(function () {
	
	/*Ajax 开始*/
	//学生Info EasyChatTime AJax
	function FirstRegFormInfoAjax(){
		if($("p.StudentName span").html() == ""){
			return;
		}
		else{
			//检测联系人
			var contactFather = FindContactItem("父亲");
			var contactMother = FindContactItem("母亲");
			var contactStudent = FindContactItem("学生");
			var contactOther = FindContactItem("其他");
		
			//添加AppRelation对象
			var appRelation = {};
		
			var studentInfo = {
				StudentID:"@Model.StudentInfo.StudentID",
				Gender:$("select.Gender").val(),
				NameCn:$("p.StudentName span").html(),
				LiveCity:$("input.LiveCity").val(),
				NationIntention:ReturnNationIntention(),
				EducationIntention:$("select.EducationIntention").val(),
				SpecialtyIntention:$("input.SpecialtyIntention").val(),
				SchoolCn:$("input.SchoolCn").val(),
				Grade:$("input.Grade").val(),
				GraduationDate:$("input.GraduationDate").val(),
				GradeRank:$("input.GradeRank").val(),
				GradeScale:$("input.GradeScale").val(),
				AverageScore:$("input.AverageScore").val(),
				CreateTime:"@Model.StudentInfo.CreateTime"
			};
		
			var ajaxData = {
				ContactFather:contactFather,
				ContactMother:contactMother,
				ContactStudent:contactStudent,
				ContactOther:contactOther,
				AppRelation:appRelation,
				StudentInfo:studentInfo
			};
		
			$.ajax({
				type: "POST",
				url: '@Url.Action("FirstRegFormInfo")',
				data: JSON.stringify(ajaxData),
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',
				success: function (data) {
					if(data.InfoResult == true){
						var url = "/Students/SaleTrack/FirstRegFormTP/?id=" + data.StudentID.toString();
						window.location.href = url;
					}
				}
			});
		}
	}
	
	//根据身份名返回对应的联系人包装对象
	function FindContactItem(contactValue){
		var ContactP;
		$("p.ContactIdentity").each(function(index, element) {
			if($(this).find(".PersonIdentity").val() == contactValue){//找到目标联系人信息
				ContactP = $(this);
				return false;
			}
		});
	
		if(ContactP != undefined){
			var contactIdentity = {
				PersonIdentity:contactValue,	//联系人身份
				NameCn:ContactP.find("input.ContactName").val(),	//联系人名字
				Mobile:ContactP.find("input.ContactNum").val(),		//联系人电话
				Email:ContactP.find("input.ContactEmail").val(),	//联系人邮箱
			};
			var easyChatTimes = ReturnChatTimeArray(ContactP);
		}
		
		var ContactItem = {
			ContactIdentity:contactIdentity,		//联系人Info
			EasyChatTimes:easyChatTimes		//联系人方便致电时间列表
		};
	
		return ContactItem;
	}
	
	//根据传入的p.ContactIdentity 元素，返回EasyChatTime数组
	//数组每个元素均为对象，包含开始时间与结束时间
	function ReturnChatTimeArray(contractP){
		var timeArray = [];
		contractP.find("input.EasyChatBegin").each(function(index,element){	//以EasyChatBegin为条目标识
			var timeBegin = $(this).val();	//开始时间
			var timeEnd = $(this).next("input.EasyChatEnd").val();	//结束时间
			var timeItemId = $(this).prev("input.EasyChatID").val();	//EasyChatItemID
			if(timeBegin != null && timeEnd != null){
				timeArray.push({
					ItemID:timeItemId,
					TimeBegin:timeBegin,
					TimeEnd:timeEnd
				});
			}
		});
	
		return timeArray;
	}
	
	//返回国家意向
	function ReturnNationIntention(){
		var nationIntention="";
		if($("input.AmericaIntention").attr("checked")==true){
			nationIntention += "美国;";
		}
		if($("input.EnglandIntention").attr("checked")==true){
			nationIntention += "英国;";
		}
		if($("input.CanadaIntention").attr("checked")==true){
			nationIntention += "加拿大;";
		}
		nationIntention += $("input.txtOtherIntention").val();
		return nationIntention;
	}
	
	/*Ajax 结束*/
	
	
	/*事件绑定 开始*/
	$("input.DatePick").datepicker({ dateFormat: "yy/mm/dd" });
	
	$("input.TimePick").each(function (index, element) {
		$(this).timepicker();
	});
	
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
	
	//EasyChatBegin输入框change事件委托
	$("div.ContactWrap").delegate("input.EasyChatBegin", "change", function (e) {
		var timeBegin = $(this).val();
		var timeEnd = $(this).next("input.EasyChatEnd").val();
		var timeCheckResult = true;
		if (timeBegin != '' && timeEnd != '') {
			timeCheckResult = checkTimeRange(timeBegin, timeEnd);
		}
		if (!timeCheckResult) {
			$("span.wrongChatTime").remove();
			$(this).parent("p.ContactIdentity").children("a.KeepAddEasyChat").eq(0).before("<span class='wrongChatTime'>请确保开始时间小于结束时间</span>");
			$(this).val("00\:00");
		}
		else {
			$("span.wrongChatTime").remove();
		}
	});

	//EasyChatEnd输入框change事件委托
	$("div.ContactWrap").delegate("input.EasyChatEnd", "change", function (e) {
		var timeBegin = $(this).prev("input.EasyChatBegin").val();
		var timeEnd = $(this).val();
		var timeCheckResult = true;
		if (timeBegin != '' && timeEnd != '') {

			timeCheckResult = checkTimeRange(timeBegin, timeEnd);
		}
		if (!timeCheckResult) {

			$("span.wrongChatTime").remove();
			$(this).parent("p.ContactIdentity").children("a.KeepAddEasyChat").eq(0).before("<span class='wrongChatTime'>请确保开始时间小于结束时间</span>");
			$(this).val("23\:59");
		}
		else {
			$("span.wrongChatTime").remove();
		}
	});

	//检测开始结束时间的关系
	function checkTimeRange(timeBegin, timeEnd) {
		var startTime = timeBegin.replace(":", "");
		var start = Number(startTime);
		var endTime = timeEnd.replace(":", "");
		var end = Number(endTime);
		if (end < start) {
			return false;
		}
		return true;
	}
	
	//“继续添加联系人”事件
	$("p.KeepAddContact a").bind("click", function (e) {
		e.preventDefault();
		var $PContactIdentity = $("<p>身份：&nbsp;</p>").insertBefore("p.KeepAddContact").insertBefore($(this).parent());
		$PContactIdentity.addClass("ContactIdentity");

		var $Select = $("<select></select>&nbsp;").appendTo($PContactIdentity);
		$Select.append("<option value='学生' select='selected'>学生</option>");
		$Select.append("<option value='父亲' select='selected'>父亲</option>");
		$Select.append("<option value='母亲' select='selected'>母亲</option>");
		$Select.append("<option value='其他' select='selected'>其他</option>");

		$PContactIdentity.append("&nbsp;<input type=\"text\" class=\"ContactName EnterTip\" value=\"请输入联系人名字\" />&nbsp;");
		$PContactIdentity.append("<input type=\"text\" class=\"ContactNum EnterTip\" value=\"请输入手机号\"/>&nbsp;");
		$PContactIdentity.append("<input type=\"text\" class=\"ContactEmail EnterTip\" value=\"请输入邮箱\"/>&nbsp;");
		$PContactIdentity.append("<input type=\"text\" class=\"EasyChatBegin EnterTip TimePick\" />至<input type=\"text\" class=\"EasyChatEnd EnterTip TimePick\" />&nbsp;");
		$PContactIdentity.append("<a href=\"javascript:void()\" class=\"KeepAddEasyChat\">继续添加方便接听电话时间</a>&nbsp;&nbsp;");
		//$PContactIdentity.append("<a href=\"javascript:void()\" class=\"DeleteContact\">删除联系人</a>");

		$("input.TimePick").each(function (index, element) {
			$(this).timepicker();
		});

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
	});
	
	//“继续添加致电时间”事件
	$("div.ContactWrap").delegate("a.KeepAddEasyChat", "click", function (e) {
		e.preventDefault();
		$("<span>&nbsp;&nbsp;</span>").insertBefore($(this));
		$("<input type=\"text\" class=\"EasyChatBegin EnterTip TimePick\" />").insertBefore($(this)).timepicker();
		$(this).before("至");
		$("<input type=\"text\" class=\"EasyChatEnd EnterTip TimePick\" />").insertBefore($(this)).timepicker();
	});
	
	$("input.chkOtherIntention").change(function(e) {
        $("input.txtOtherIntention").toggle();
    });
	
	//提交
	$("form").submit(function(e) {
		e.preventDefault();
		FirstRegFormInfoAjax();
	});
	
	/* 事件绑定 结束*/
});