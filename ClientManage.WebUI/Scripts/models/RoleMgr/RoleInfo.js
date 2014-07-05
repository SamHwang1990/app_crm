/***************************************
 * Created by samhwang1990@gmail.com on 14-4-22.
 * RoleInfo 模型
 ***************************************/

define(['jquery','underscore','backbone'],function($,_,Backbone){
		var roleInfoModel = Backbone.Model.extend({
			defaults:{
				RoleID:'00000000-0000-0000-0000-000000000000',
				IsForSaleTrack:false,
				IsForApply:false,
				IsForEssay:false,
				IsForAct:false,
				IsForExam:false,
				IsForManage:false,
				RoleName:'',
				RoleEN:'',
				RoleRemark:''
			},
			initialize:function(options){
				if(options != null){
					this.url = options.url;
				}
			}
		});
		return roleInfoModel;
	}
);
