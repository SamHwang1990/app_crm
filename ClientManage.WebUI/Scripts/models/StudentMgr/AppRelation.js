/***************************************
 * Created by samhwang1990@gmail.com on 14-5-15.
 * AppRelation Model
 ***************************************/

define(['jquery','underscore','backbone'],function($,_,Backbone){
	var appRelation = Backbone.Model.extend({
		default:{
			StudentID:"00000000-0000-0000-0000-000000000000",
			IsSign:"0",
			SignDate:"1970/01/01",
			SignTrackItem:"00000000-0000-0000-0000-000000000000",
			HasAssignConsultant:false,
			HasScheduleApply:false,
			SaleConsultant:"00000000-0000-0000-0000-000000000000",
			SaleConsultantName:"",
			ApplyConsultant:"00000000-0000-0000-0000-000000000000",
			ApplyConsultantName:"",
			EssayConsultant:"00000000-0000-0000-0000-000000000000",
			EssayConsultantName:"",
			ActConsultant:"00000000-0000-0000-0000-000000000000",
			ActConsultantName:"",
			ExamConsultant:"00000000-0000-0000-0000-000000000000",
			ExamConsultantName:"",
			IsFirstStageFee:false,
			FirstStageFee:0,
			IsSecondStageFee:false,
			SecondStageFee:0,
			AdviceToApp:"",
			YearPeriod:"",
			Remark:""
		}
	});
	return appRelation;
});