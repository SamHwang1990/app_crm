// JavaScript Document

$(document).ready(function (e) {
        /* Ajax Begin */
        function SetGetFromDone() {
            var _isSign = $("input.IsSign").is(':checked');
            var _signDate = $("input.SignDate").val();
            var _getFrom = $("p.GetFromTrack textarea").val();

            var ajaxData = {
                id: "@ViewBag.StudentInfo.StudentID",
                trackID: "@Model.TrackItemID",
                trackNo: "@Model.TrackNo",
                isSign: _isSign,
                signDate: _signDate,
                getFrom: _getFrom
            };

            $.ajax({
                type: "POST",
                url: '@Url.Action("SetGetFromDone","SaleTrack")',
                data: JSON.stringify(ajaxData),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    if (data.SetResult == true && data.SignResult == false) {
                        var url = "/Students/SaleTrack/Index/?id=" + data.StudentID;
                        window.location.href = url;
                    }
                    if (data.SetResult == true && data.SignResult == true) {
                        var url = "/Students/StudentInfo/List"
                        window.location.href = url;
                    }
                }
            });
        }

        /* Ajax End */

        /* 事件绑定 Begin*/
        $("input.DatePick").datepicker({ dateFormat: "yy/mm/dd" });
        $("input.IsSign").bind("click",function(e){
		    if($(this).is(':checked') == true){
			    $("input.SignDate").attr("type","text");
		    }
		    else{
			    $("input.SignDate").val("");
			    $("input.SignDate").attr("type","hidden");
		    }
	    });

        $("form").submit(function (e) {
            e.preventDefault();
            SetGetFromDone();
        });
        /* 事件绑定 End */
    });