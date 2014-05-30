/***************************************
 * Created by samhwang1990@gmail.com on 14-5-30.
 * StudentMgr/SaleTrack StudentFromModel
 ***************************************/

define(['jquery','underscore','backbone'],function($,_,Backbone){
	var StudentFromModel = Backbone.Model.extend({
		defaults:{
			ID:"00000000-0000-0000-0000-000000000000",
			StudentID:"00000000-0000-0000-0000-000000000000",
			SourceName:"",
			SourceDetailKeyword:"",
			SourceDetailContent:"",
			Remark:""
		}
	});
	return StudentFromModel;
})
