/***************************************
 * Created by samhwang1990@gmail.com on 14-7-20.
 ***************************************/

define([],function(){
	var TransFormDate = function(){}
	/*
	* 将字符串/ Date / ******* / 转为JS的Date类型
	* */
	TransFormDate.prototype.TransMsStringToDateType = function(msString){
		if(msString == null || msString === ''){
			return new Date();
		}
		var ms = msString.slice(6,-2);
		var msDate = new Date(parseInt(ms));
		return msDate;
	}

	TransFormDate.prototype.TransMsStringToDate = function(msString){
		var msDate = this.TransMsStringToDateType(msString);
		var month = (msDate.getMonth() < 9)?('0' + (msDate.getMonth()+1)):msDate.getMonth()+1;
		var day = (msDate.getDate() < 10)?('0' + msDate.getDate()):msDate.getDate();
		return msDate.getFullYear() + "-" + month + "-" + day;
	}

	TransFormDate.prototype.TransMsStringToTime = function(msString){
		var msDate = this.TransMsStringToDateType(msString);
		var hour = (msDate.getHours() < 10)?('0' + msDate.getHours()):msDate.getHours();
		var minute = (msDate.getMinutes() < 10)?('0' + msDate.getMinutes()):msDate.getMinutes();
		var second = (msDate.getSeconds() < 10)?('0' + msDate.getSeconds()):msDate.getSeconds();
		return hour + ":" + minute + ":" + second;
	}

	return TransFormDate;
})
