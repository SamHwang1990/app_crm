/***************************************
 * Created by samhwang1990@gmail.com on 14-5-30.
 * ExamResult Models
 ***************************************/
define(['jquery','underscore','backbone'],function($,_,Backbone){
	var ExamResultModel = Backbone.Model.extend({
		defaults:{
			ResultID:"00000000-0000-0000-0000-000000000000",
			StudentID:"00000000-0000-0000-0000-000000000000",
			ExamID:"00000000-0000-0000-0000-000000000000",
			ExamDate:new Date(),
			Total:0,
			Times:1,
			ExamAddress:"",
			ExamType:"0",
			ExamName:"",
			PointDelivery:"2",
			Remark:"",
			NextExamDate:new Date()
		}
	})

	return {
		ExamResultModel:ExamResultModel
	}
});