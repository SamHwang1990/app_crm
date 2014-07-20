/***************************************
 * Created by samhwang1990@gmail.com on 14-7-20.
 ***************************************/

define(['libs/bootstrap/datetimepicker/bootstrap-datetimepicker.min'],function(Datetimepicker){
	var RenderDateTimePicker = function(){};
	RenderDateTimePicker.prototype.RenderDate = function(timePickerWrap){
		timePickerWrap.datetimepicker({     //调用bootstrap的datetimepicker插件
			format: "yyyy-mm-dd",        //指定显示格式
			autoclose: true,        //点击具体日期或时间后关闭选择框
			startView:2,            //设置起始选择框形式，2代表显示month
			minView:2
		});
	};
	RenderDateTimePicker.prototype.RenderTime = function(timePickerWrap){

	};
	RenderDateTimePicker.prototype.RenderDateTime = function(timePickerWrap){

	};

	return RenderDateTimePicker;
})
