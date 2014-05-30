/***************************************
 * Created by samhwang1990@gmail.com on 14-5-30.
 * StudentMgr/SaleTrack/StudentTPInfo Model
 ***************************************/

define(['jquery','underscore','backbone'],function($,_,Backbone){
	var StudentTPInfoModel = Backbone.Model.extend({
		defaults:{
			StudentID:"00000000-0000-0000-0000-000000000000",
			IsIB:false,
			IsAP:false,
			IsALevel:false,
			OtherTP1:"",
			OtherTP2:"",
			OtherTP3:"",
			OtherTP4:"",
			IsLangTran:false,
			LT1CourseName:"",
			LT1CourseAddress:"",
			LT1DateBegin:new Date(),
			LT1DateEnd:new Date(),
			LT2CourseName:"",
			LT2CourseAddress:"",
			LT2DateBegin:new Date(),
			LT2DateEnd:new Date(),
			Remark:""
		}
	});

	return StudentTPInfoModel;
})
