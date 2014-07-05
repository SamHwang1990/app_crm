/***************************************
 * Created by samhwang1990@gmail.com on 14-4-22.
 * UserInfo 模型
 ***************************************/

define(['jquery','underscore','backbone'],function($,_,Backbone){
		var userInfoModel = Backbone.Model.extend({
			defaults:{
				UserID:'00000000-0000-0000-0000-000000000000',
				UserNameCn:'',
				UserNameEn:'',
				UserPass:'',
				UserRole:'',
				UserRoleName:'',
				UserSecondRole:'',
				UserSecondRoleName:'',
				Email:'',
				Mobile:'',
				UserRemark:'',
				LastJobDate:new Date(),
				LastLoginTime:new Date(),
				CreateTime:new Date(),
				IsForSaleTrack:false,
				IsForApply:false,
				IsForEssay:false,
				IsForAct:false,
				IsForExam:false,
				IsForManage:false
			},
			initialize:function(options){
				if(options != null){
					this.url = options.url;
				}
			}
		});
		return userInfoModel;
	}
);