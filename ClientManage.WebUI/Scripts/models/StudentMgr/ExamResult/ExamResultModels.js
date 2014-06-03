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
			Total:'',
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
			Reading:'',
			Listening:'',
			Speaking:'',
			Writing:'',
			Total:'',
			Remark:""
		}
	})

	var ExamResultSATSSATEntity = Backbone.Model.extend({
		defaults:{
			ExamID:"00000000-0000-0000-0000-000000000000",
			MathScore:'',
			Reading:'',
			Vocabulary:'',
			Writing:'',
			Total:'',
			Remark:""
		}
	})

	var ExamResultGREGMATEntity = Backbone.Model.extend({
		defaults:{
			ExamID:"00000000-0000-0000-0000-000000000000",
			MathScore:'',
			Verbal:'',
			Writing:'',
			Total:'',
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