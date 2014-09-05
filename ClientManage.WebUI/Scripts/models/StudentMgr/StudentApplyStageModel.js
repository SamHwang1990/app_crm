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
			StageNameEn:'',
			StageClass:0,
			ParentNo:0,
			IsForbid:false,
			Gender:"0",
			BeginDate:new Date(),
			EndDate:new Date(),
			StatusOption:"",
			CurrentOption:"",
			BeginOption:"",
			EndOption:"",
			Percentage:0,
			ResponseConsultant:"00000000-0000-0000-0000-000000000000",
			ResponseConsultantName:"",
			CanForbid:false,
			CanChangeDate:false,
			CanChangeName:false,
			IsDateSameWithParent:false,
			Remark:""
		},
		initialize:function(options){
			if(options){
				this.url = options.url;
			}
		}
	});
	return studentApplyStage;

});

