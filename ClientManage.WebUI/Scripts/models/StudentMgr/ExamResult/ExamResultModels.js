/***************************************
 * Created by samhwang1990@gmail.com on 14-5-30.
 * ExamResult Models
 ***************************************/
define(['jquery','underscore','backbone'],function($,_,Backbone){
	var ExamResultEntity = Backbone.Model.extend({
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
			PointDelivery:"",
			Remark:"",
			NextExamDate:new Date(),
			IsBeforeSign:false
		}
	});

	var ExamResultTFIELTSEntity = Backbone.Model.extend({
		defaults:{
			ExamID:"00000000-0000-0000-0000-000000000000",
			Reading:0,
			Listening:0,
			Speaking:0,
			Writing:0,
			Total:0,
			Remark:""
		}
	})

	var ExamResultSATSSATEntity = Backbone.Model.extend({
		defaults:{
			ExamID:"00000000-0000-0000-0000-000000000000",
			MathScore:0,
			Reading:0,
			Vocabulary:0,
			Writing:0,
			Total:0,
			Remark:""
		}
	})

	var ExamResultGREGMATEntity = Backbone.Model.extend({
		defaults:{
			ExamID:"00000000-0000-0000-0000-000000000000",
			MathScore:0,
			Verbal:0,
			Writing:0,
			Total:0,
			Remark:""
		}
	})

	return {
		ExamResultEntity:ExamResultEntity,
		ExamResultTFIELTSEntity:ExamResultTFIELTSEntity,
		ExamResultSATSSATEntity:ExamResultSATSSATEntity,
		ExamResultGREGMATEntity:ExamResultGREGMATEntity
	}
});