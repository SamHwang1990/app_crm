/***************************************
 * Created by samhwang1990@gmail.com on 14-7-20.
 * Setting/ApplyStagesMgr/ApplyStagesModel
 ***************************************/

define(['jquery','underscore','backbone'],function($,_,Backbone){
		var stagesModel = Backbone.Model.extend({
			defaults:{
				StageNo:0,
				StageName:'',
				StageClass:0,
				ParentNo:0,
				IsForbid:false,
				StatusOption:'',
				BeginOption:'',
				EndOption:'',
				BeginDate:0,
				EndDate:0,
				IsDateSameWithParent:false,
				ChildStage:'',
				ResponseRole:'',
				IsCalBeginDate:false,
				IsCalEndDate:false,
				CanForbid:false,
				CanChangeDate:false,
				CanChangeName:false,
				Remark:''
			},
			initialize:function(options){
				if(options != null){
					this.url = options.url;
				}
			}
		});
		return stagesModel;
	}
);

