/***************************************
 * Created by samhwang1990@gmail.com on 14-7-20.
 ***************************************/

define([],function(){
	var TransFormDate = function(){}
	/*
	* 将字符串/ Date / ******* / 转为JS的Date类型
	* */
	TransFormDate.prototype.TransMsStringToDateType = function(msString){

		//匹配字符串中的所有数字
		var dateNumPattern = /\d+/;

		var ms = dateNumPattern.exec(msString);
		var msDate = new Date(parseInt(ms));

		return msDate;
	}

	TransFormDate.prototype.ValidateDateFormat = function(msString){
		//匹配 /Date([0-9]+)/
		var dateTypePattern = /[/]Date\(\d+\)[/]/;
		return dateTypePattern.test(msString);
	}

	/*
	* 将日期字符串转换为 时间格式的字符串：yyyy-MM-dd
	* */
	TransFormDate.prototype.TransMsStringToDate = function(msString){
		if(!this.ValidateDateFormat(msString)) return '';

		var msDate = this.TransMsStringToDateType(msString);
		var month = (msDate.getMonth() < 9)?('0' + (msDate.getMonth()+1)):msDate.getMonth()+1;
		var day = (msDate.getDate() < 10)?('0' + msDate.getDate()):msDate.getDate();
		return msDate.getFullYear() + "-" + month + "-" + day;
	}

	/*
	* 将日期字符串转换为 时间格式的字符串：hh:mm:ss
	* */
	TransFormDate.prototype.TransMsStringToTime = function(msString){
		var msDate = this.TransMsStringToDateType(msString);
		var hour = (msDate.getHours() < 10)?('0' + msDate.getHours()):msDate.getHours();
		var minute = (msDate.getMinutes() < 10)?('0' + msDate.getMinutes()):msDate.getMinutes();
		var second = (msDate.getSeconds() < 10)?('0' + msDate.getSeconds()):msDate.getSeconds();
		return hour + ":" + minute + ":" + second;
	}

	return TransFormDate;
})
