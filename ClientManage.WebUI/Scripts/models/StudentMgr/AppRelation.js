/***************************************
 * Created by samhwang1990@gmail.com on 14-5-15.
 * AppRelation Model
 ***************************************/

define(['jquery','underscore','backbone','backbone.relational'],function($,_,Backbone,Backbone_Relational){
	var appRelation = Backbone.RelationalModel.extend({
		default:{
			StudentID:"00000000-0000-0000-0000-000000000000",
			IsSign:false,
			SignDate:"1970/01/01",
			SignTrackItem:"00000000-0000-0000-0000-000000000000",
			SaleConsultant:"00000000-0000-0000-0000-000000000000",
			ApplyConsultant:"00000000-0000-0000-0000-000000000000",
			AssayConsultant:"00000000-0000-0000-0000-000000000000",
			ActConsultant:"00000000-0000-0000-0000-000000000000",
			LanguageConsultant:"00000000-0000-0000-0000-000000000000",
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