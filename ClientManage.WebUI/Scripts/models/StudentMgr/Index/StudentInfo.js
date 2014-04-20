/***************************************
 * Created by samhwang1990@gmail.com on 14-4-20.
 * 学生信息模型
 ***************************************/
define(['jquery','underscore','backbone'],function($,_,Backbone){
	var studentInfoModel = Backbone.Model.extend({
		defaults:{
			StudentInfo:{},
			AppRelation:{}
		}
	});
	return studentInfoModel;
})
