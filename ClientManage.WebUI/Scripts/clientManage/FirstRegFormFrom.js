// JavaScript Document

$(document).ready(function(e) {
    
	/* Ajax Begin*/
	function FirstRegFormFromAjax(){
		if($("p.StudentName span").html() == ""){
			return;
		}
		else{
			var studentID = $("input.StudentID").val();
			var fromList = GetStudentFromList();
			var ajaxData = {
				studentId:studentID,
				fromList:fromList
			};
			$.ajax({
				type: "POST",
				url: '@Url.Action("FirstRegFormFrom","StudentInfo")',
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
	
	
	function GetStudentFromList(){
		var studentFromList = [];
		var studentId = $("input.StudentID").val();
		$("td.tdStudentSourceItem").each(function(index, element) {
            if($(this).find("input[type=checkbox]").is(':checked')){
				studentFormList.push({
					StudentID:studentId,
					SourceName:$(this).find("span.SourceName").text(),
					SourceDetailKeyword:$(this).find("span.DetailKeyword").text(),
					SourceDetailContent:$(this).find("input.DetailContent").val(),
					Remark:""
				});
			}
        });
		return studentFromList;
	}
	/* Ajax End */
	
	
	/* 事件绑定 Begin */
	
	/* EnterTip Begin */
	$("input.EnterTip").each(function () {
		$(this).focusin(function (e) {
			if ($(this).val().indexOf("请输入")>=0) {
				$(this).val('');
			}
		});
		$(this).focusout(function (e) {
			if ($(this).val() == '') {
				$(this).val("请输入内容");
			}
		});
	});
	/* EnterTip End */
	
	/* DetailContent focusout Begin */
	$("input.DetailContent").on("focusout",function(e){
		if($(this).val().indexOf("请输入")<0){
			$(this).parent("td.tdStudentSourceItem").find("input[type=checkbox]").attr('checked',true);
		}
	});
	/* DetailContent focusout End */
	
	
	$("form").submit(function(e) {
        e.preventDefault();
		FirstRegFormFromAjax();
    });
	
	/* 事件绑定 End */
	
});