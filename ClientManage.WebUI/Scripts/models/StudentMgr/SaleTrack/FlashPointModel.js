/***************************************
 * Created by samhwang1990@gmail.com on 14-6-10.
 * StudentMgr/SaleTrack FlashPointModel
 ***************************************/

define(['jquery','underscore','backbone'],function($,_,Backbone){
	var FlashPointModel = Backbone.Model.extend({
		defaults:{
			FlashPointID:"00000000-0000-0000-0000-000000000000",
			StudentID:"00000000-0000-0000-0000-000000000000",
			FlashPointType:"0",
			FlashPointIntro:"",
			FlashPointDetail:"",
			FlashPointDate:"",
			Remark:""
		}
	});
	return FlashPointModel;
})
