/***************************************
 * Created by samhwang1990@gmail.com on 14-7-28.
 * StudentApplyStage Model
 ***************************************/

define(['jquery','underscore','backbone'],function($,_,Backbone){
	var studentApplyStage = Backbone.Model.extend({
		default:{
			ID:"00000000-0000-0000-0000-000000000000",
			StudentID:"00000000-0000-0000-0000-000000000000",
			StageNo:0,
			StageName:"",
			ParentNo:0,
			Gender:"0",
			BeginDate:new Date(),
			BeginDateLimit:new Date(),
			EndDate:new Date(),
			EndDateLimit:new Date(),
			StatusOption:"",
			CurrentOption:"",
			BeginOption:"",
			EndOption:"",
			ResponseConsultant:"00000000-0000-0000-0000-000000000000",
			ResponseConsultantName:"",
			Remark:""
		}
	});
	return studentApplyStage;
});

