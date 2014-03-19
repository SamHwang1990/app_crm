// JavaScript Document

$(document).ready(function () {

	//jQuery & Ajax
	var $RoleList = $("select.RoleList");

//Ajax方法部分 开始
	//用户列表Ajax
	var FUserListAjax = function () {
		var selectID = $RoleList.find("option:selected").eq(0).val();
		var $userList = $("select#AppRelationsEntity_SaleConsultant");
		$userList.empty().append('<option value="">请选择负责人</option>');
		$.ajax({
			type: "POST",
			url: '@Url.Action("GetUserList")',
			data: { roleIDString: selectID },
			dataType: 'json',
			success: function (data) {
				for (var i = 0; i < data.UserList.length; i++) {
					var selectStr = "";
					if (data.UserList[i].UserInfo.UserID == data.NextUser.UserID) {
						selectStr = "selected=\"selected\"";
					}
					$userList.append('<option value="' + data.UserList[i].UserInfo.UserID + '"' + selectStr + ' >' + data.UserList[i].UserInfo.UserNameCn + '</option>');
				}
			}
		});
	};
	
	//学生创建AJax
	function FStudentAjax(){
		if($("input[name=StudentName]").val() == "" || $("input[name=StudentName]").val()=="请输入学生名字"){
			return;
		}
		else{
			//检测联系人
			var contactFather = FindContactItem("父亲");
			var contactMother = FindContactItem("母亲");
			var contactStudent = FindContactItem("学生");
			var contactOther = FindContactItem("其他");
			
			//添加AppRelation对象
			var appRelation = {
				IsSign:$("select[name='AppRelation.IsSign']").val(),
				SaleConsultant:$("select[name='AppRelationsEntity.SaleConsultant']").val()				
			};
			
			var studentInfo = {
				NameCn:$("p.StudentName input").val(),
				LiveCity:$("p.LiveCity input").val(),
				CreateTime:new Date()
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
				url: '@Url.Action("Create")',
				data: JSON.stringify(ajaxData),
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',
				success: function (data) {
					if(data.CreateReslut == true){
						var url = "/Students/SaleTrack/FirstInterview/?id=" + data.StudentID.toString();
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
            if($(this).find("select").val() == contactValue){//找到目标联系人信息
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
			if(timeBegin != null && timeEnd != null){
				timeArray.push({
					TimeBegin:timeBegin,
					TimeEnd:timeEnd
				});
			}
		});
		
		return timeArray;
	}

//Ajax方法部分 结束

//表单认证部分 开始
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


	//时间选择框初始化
	$("input.TimePick").each(function (index, element) {
		$(this).timepicker();
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

//表单认证部分 结束

	//DOM初始化事件触发部分  开始
	//RoleList DOM ready 和change 事件触发
	$RoleList.ready(FUserListAjax).change(FUserListAjax);
	
	//提交
	$("form").submit(function(e) {
        e.preventDefault();
		FStudentAjax();
    });

	//“继续添加致电时间”事件
	$("div.ContactWrap").delegate("a.KeepAddEasyChat", "click", function (e) {
		e.preventDefault();
		$("<span>&nbsp;&nbsp;</span>").insertBefore($(this));
		$("<input type=\"text\" class=\"EasyChatBegin EnterTip TimePick\" />").insertBefore($(this)).timepicker();
		$(this).before("至");
		$("<input type=\"text\" class=\"EasyChatEnd EnterTip TimePick\" />").insertBefore($(this)).timepicker();
	});

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

	//“删除联系人”事件
	//$("div.ContactWrap").on("click", "a.DeleteContact", function (e) {
		//$(this).parent().remove();
	//});

//事件触发部分 结束

//GUID方法
function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
};

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
         s4() + '-' + s4() + s4() + s4();
}
});