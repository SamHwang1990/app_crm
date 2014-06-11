/***************************************
 * Created by samhwang1990@gmail.com on 14-6-11.
 * StudentMgr/Index StudentSchool model
 ***************************************/

define(['jquery','underscore','backbone'],function($,_,Backbone){
	var studentSchool = Backbone.Model.extend({
		defaults:{
			SchoolID:"00000000-0000-0000-0000-000000000000",
			SchoolCn:"",
			SchoolEn:"",
			SchoolType:"0",
			SchoolNation:"中国",
			Remark:""
		}
	});
	return studentSchool;
})
