/***************************************
 * Created by samhwang1990@gmail.com on 14-5-15.
 * Contact Easy Chat Time Model
 ***************************************/

define(['jquery','underscore','backbone','backbone.relational'],function($,_,Backbone,Backbone_Relational){
	var ContactIdentity = Backbone.RelationalModel.extend({
		default:{
			PersonIdentity:"",
			NameCn:"",
			Mobile:"",
			Email:""
		}
	});

	var EasyChatTimeEntity = Backbone.RelationalModel.extend({
		default:{
			ItemID:"00000000-0000-0000-0000-000000000000",
			TimeBegin:"00:00",
			TimeEnd:"23:55",
			IfStudentID:"00000000-0000-0000-0000-000000000000",
			IfParentID:"00000000-0000-0000-0000-000000000000"
		}
	});

	var EasyChatTimeList = Backbone.Collection.extend({
		model:EasyChatTimeEntity
	});

	var EasyChatTimeModel = Backbone.RelationalModel.extend({
		relations:[
			{
				type:Backbone.HasMany,
				key:"EasyChatTimes",
				relatedModel:EasyChatTimeEntity,
				collectionType:EasyChatTimeList,
				reverseRelation: {
					key: 'StudentViewModel',
					type:Backbone.HasOne
				}
			},
			{
				type:Backbone.HasOne,
				key:"ContactIdentity",
				relatedModel:ContactIdentity,
				reverseRelation: {
					key: 'EasyChatTimeModel',
					type:Backbone.HasOne
				}
			}
		]
	});

	return {
		ContactIdentity:ContactIdentity,
		EasyChatTimeEntity:EasyChatTimeEntity,
		EasyChatTimeList:EasyChatTimeList,
		EasyChatTimeModel:EasyChatTimeModel
	};
})
