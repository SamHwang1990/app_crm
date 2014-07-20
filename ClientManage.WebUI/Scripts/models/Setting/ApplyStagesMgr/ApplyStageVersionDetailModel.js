/***************************************
 * Created by samhwang1990@gmail.com on 14-7-20.
 * Setting/ApplyStagesMgr/ApplyStageVersionDetailModel
 ***************************************/

define(['jquery','underscore','backbone'],function($,_,Backbone){
		var versionDetailModel = Backbone.Model.extend({
			defaults:{
				DetailID:'00000000-0000-0000-0000-000000000000',
				VersionID:'00000000-0000-0000-0000-000000000000',
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
				CompareDateWith:'0',
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
		return versionDetailModel;
	}
);

