/***************************************
 * Created by samhwang1990@gmail.com on 14-4-22.
 * UserInfo 模型
 ***************************************/

define(['jquery','underscore','backbone'],function($,_,Backbone){
		var userInfoModel = Backbone.Model.extend({
			defaults:{
				UserID:'',
				UserNameCn:'',
				UserNameEn:'',
				UserPass:'',
				UserRole:'',
				UserSecondRole:'',
				Email:'',
				Mobile:'',
				UserRemark:'',
				LastJobDate:new Date(),
				IsForSaleTrack:false
			}
		});
		return userInfoModel;
	}
);