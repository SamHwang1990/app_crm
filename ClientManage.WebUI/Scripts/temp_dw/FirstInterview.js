// JavaScript Document

$(document).ready(function () {
	
	//Ajax 函数 开始
	function SetParticipateUser(userId,$curTr){
		var participantName = $curTr.find("input.ParticipantName");
		var participantEmail = $curTr.find("input.ParticipantEmail");
		var participantMobile = $curTr.find("input.ParticipantMobile");
		var participantIdentity = $curTr.find("select.SaleParticipantIdentity");
		if(userId == "")
		{
			participantName.val("");
			participantEmail.val("");
			participantMobile.val("");
			participantIdentity.val("");
			return true;
		}
		$.ajax({
			type: "POST",
			url: '@Url.Action("GetParticipateUser")',
			data: { userID:userId },
			dataType: 'json',
			success: function (data) {
				participantName.val(data.UserNameCn);
				participantEmail.val(data.Email);
				participantMobile.val(data.Mobile);
				participantIdentity.val("咨询顾问");
				$curTr.find("select").last().children("option").eq(0).attr("selected",true);
			}
		});
	}
	
	function SetParticipateContact(contactId,$curTr){
		var contactArray = contactId.split(',');
		var id = contactArray[0];
		var identity = contactArray[1];
		var participantName = $curTr.find("input.ParticipantName");
		var participantEmail = $curTr.find("input.ParticipantEmail");
		var participantMobile = $curTr.find("input.ParticipantMobile");
		var participantIdentity = $curTr.find("select.SaleParticipantIdentity option");
		
	    if (id == "") {
			participantName.val("");
			participantEmail.val("");
			participantMobile.val("");
			participantIdentity.val("");
			return false;
		}
		if("@Model.StudentInfo.StudentID" == id){
			participantName.val("@Model.StudentInfo.NameCn");
			participantEmail.val("@Model.StudentInfo.Email");
			participantMobile.val("@Model.StudentInfo.Mobile");
			participantIdentity.val(identity);
		}
		else{
			$.ajax({
				type: "POST",
				url: '@Url.Action("GetParticipateParent")',
				data: { parentID:id },
				dataType: 'json',
				success: function (data) {
					participantName.val(data.NameCn);
					participantEmail.val(data.Email);
					participantMobile.val(data.Mobile);
					participantIdentity.val(identity);
					$curTr.find("select").eq(-2).children("option").eq(0).attr("selected",true);
				}
			});
		}
	}
	
	function fFirstInterviewAjax(){
		var saleTrackItem = fGetSaleTrackInfo();
		var saleTrackParticipant = fGetSaleTrackParticipant();
		var ajaxData = {
			SaleTrackItem:saleTrackItem,
			SaleTrackParticipant:saleTrackParticipant
		};
		$.ajax({
			type: "POST",
			url: '@Url.Action("FirstInterview")',
			data: JSON.stringify(ajaxData),
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			success: function (data) {
				if(data.SaleTrackItem.IsComplete == 0 || data.SaleTrackItem.IsComplete == "是"){
					var firstFormUrl = "/Students/SaleTrack/FirstFormInput/?id=" + data.SaleTrackItem.StudentID.toString();
					$("p.NextStep").append("<a class='FirstFormLink' href='" + firstFormUrl + "'>填写初访登记表</a>");
				}
				else{
					var savedParticipants = "以保存的联系人：";
					for(var i=0;i<data.SaleTrackParticipant.length;i++){
						savedParticipants += data.SaleTrackParticipant[i].ParticipantName+"; ";
					}
					$("p.NextStep")
					.append("<input type='button' class='btnSendEmail' value='邮件通知已存参与人'/>")
					.append("<input type='hidden' class='hidTrackItem' value='" + data.SaleTrackItem.TrackItemID.toString() + "'/><br/>"+ savedParticipants);
				}
			}
		});
	}
	
	function fGetSaleTrackInfo(){
		var currentTrackItemID = "@Model.SaleTrack.TrackItemID";
		var studentID = "@Model.StudentInfo.StudentID";
		var stateName = $("p.StateName input").val();
		if(!CheckInputIsNotEmpty(stateName)){
			stateName = "初访";
		}
		var trackPattern = $("p.TrackPattern select").val();
		if(!CheckInputIsNotEmpty(trackPattern)){
			trackPattern = "面谈";
		}
		var trackDate = $("p.TrackDate input").val();
		if(!CheckInputIsNotEmpty(trackDate)){
			trackPattern = $.now();
		}
		var trackToDo = $("p.TrackToDo textarea").val();
		if(!CheckInputIsNotEmpty(trackToDo)){
			trackToDo = "了解客户需求，完成初访登记表！";
		}
		var isComplete = $("p.IsComplete select").val();
		if(!CheckInputIsNotEmpty(isComplete)){
			isComplete = "否";
		}
		var remark = $("p.Remark textarea").val();
		return {
			TrackItemID:currentTrackItemID,
			StudentID:studentID,
			Inputor:"Admin",
			StateName:stateName,
			TrackPattern:trackPattern,
			TrackDate:trackDate,
			ToDo:trackToDo,
			IsComplete:isComplete,
			Remark:remark
		}
	}
	
	function fGetSaleTrackParticipant(){
		var saleTrackParticipant = [];
		var currentTrackItemID = "@Model.SaleTrack.TrackItemID";
		$("div.TrackParticipants table").find("tr.SaleTrackParticipant").each(function(index, element) {
			if(CheckInputIsNotEmpty($(this).find("input.ParticipantName").val())){
				saleTrackParticipant.push({
					ParticipantName:$(this).find("input.ParticipantName").val(),
					ParticipantEmail:$(this).find("input.ParticipantEmail").val(),
					ParticipantMobile:$(this).find("input.ParticipantMobile").val(),
					ParticipantIdentity:$(this).find("select.SaleParticipantIdentity").val()
				});
			}
            
        });
		return saleTrackParticipant;
	}
	
	function CheckInputIsNotEmpty(inputVal){
		return inputVal.indexOf("请输入")<0 || inputVal != "";
	}
	
	//Ajax 函数 结束
	
	
	//事件触发 开始
	$("div.TrackParticipants").on("change","select.UserList",function(e){
		var $curTr = $(this).parents("tr.SaleTrackParticipant");
		SetParticipateUser($(this).val(),$curTr);
	});
	
	$("div.TrackParticipants").on("change","select.ContactList",function(e){
		var $curTr = $(this).parents("tr.SaleTrackParticipant");
		SetParticipateContact($(this).val(),$curTr);
	});
	
	$("input.btnKeepAddParticipant").bind("click",function(e){
		e.preventDefault();
		var $LastTr = $(this).parents("div.TrackParticipants").find("table tr:last");
		var newTr = $LastTr.clone().find("input:text").val("").end();
		newTr.find("input.ParticipantName").val("请输入参与人名字");
		newTr.find("input.ParticipantEmail").val("请输入参与人邮箱");
		newTr.find("input.ParticipantMobile").val("请输入参与人电话号码");
		newTr.find("select").each(function(index, element) {
            $(this).find("option").eq(0).attr("selected",true);
        });
		$LastTr.after(newTr);		
	});
	
	$("div.TrackParticipants").on("focusin","input.EnterTip",function(e){
		if ($(this).val().indexOf("请输入") >= 0) {
				$(this).val('');
			}
	});
	
	$("div.TrackParticipants").on("focusout","input.EnterTip",function(e){
		if ($(this).val()=="") {
				$(this).val("请输入内容");
			}
	});
	
	$("p.NextStep").on("click","input.btnSendEmail",function(e){
		var trackItemId = $("input.hidTrackItem").val(); 
		$.ajax({
			type: "POST",
			url: '@Url.Action("EmailToParticipant")',
			data: { trackItem:trackItemId },
			dataType: 'json',
			success: function (data) {
				if(data == true){
					alert("邮件发送成功");
				}
				else{
					alert("邮件发送失败");
				}
			}
		});
	});
	
	$("form").submit(function(e) {
        e.preventDefault();
		fFirstInterviewAjax();
    });
	
	
	//时间选择框初始化
	$("input.DateTimePick").each(function (index, element) {
		$(this).datetimepicker({
			 showSecond: false,
			 showMillisec: false,
		 });
	});
	
	
	
	//事件触发 结束
});