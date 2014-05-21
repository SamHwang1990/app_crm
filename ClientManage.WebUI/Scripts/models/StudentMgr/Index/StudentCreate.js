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
		defaults:{
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
			ContactFather:new EasyChatTimeModel.EasyChatTimeModel({
				ContactIdentity:new EasyChatTimeModel.ContactIdentity,
				EasyChatTimes:new EasyChatTimeModel.EasyChatTimeList
			}),
			ContactMother:new EasyChatTimeModel.EasyChatTimeModel({
				ContactIdentity:new EasyChatTimeModel.ContactIdentity,
				EasyChatTimes:new EasyChatTimeModel.EasyChatTimeList
			}),
			ContactStudent:new EasyChatTimeModel.EasyChatTimeModel({
				ContactIdentity:new EasyChatTimeModel.ContactIdentity,
				EasyChatTimes:new EasyChatTimeModel.EasyChatTimeList
			}),
			ContactOther:new EasyChatTimeModel.EasyChatTimeModel({
				ContactIdentity:new EasyChatTimeModel.ContactIdentity,
				EasyChatTimes:new EasyChatTimeModel.EasyChatTimeList
			})
		}
	});
	return studentCreateModel;
})