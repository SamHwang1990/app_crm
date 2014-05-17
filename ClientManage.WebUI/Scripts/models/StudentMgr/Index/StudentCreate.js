/***************************************
 * Created by samhwang1990@gmail.com on 14-5-15.
 * Student Create Model
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'models/StudentMgr/StudentInfo',
	'models/StudentMgr/AppRelation',
	'models/StudentMgr/EasyChatTimeModel'
	],function($,_,Backbone,StudentInfoEntity,AppRelationEntity,EasyChatTimeModel){
	var invalid = Backbone.Model.extend({
		default:{
			errMsg:""
		}
	})


	var studentCreateModel = Backbone.Model.extend({
		initialize:function(){
			this.set("invalid",new invalid);
		},
		defaults:{
			StudentInfo:new StudentInfoEntity(),
			AppRelation:new AppRelationEntity(),
			ContactFather:new EasyChatTimeModel.EasyChatTimeModel(),
			ContactMother:new EasyChatTimeModel.EasyChatTimeModel(),
			ContactStudent:new EasyChatTimeModel.EasyChatTimeModel(),
			ContactOther:new EasyChatTimeModel.EasyChatTimeModel()
		}
	});
	return studentCreateModel;
})