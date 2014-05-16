/***************************************
 * Created by samhwang1990@gmail.com on 14-5-15.
 * Student Create Model
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'backbone.relational',
	'models/StudentMgr/StudentInfo',
	'models/StudentMgr/AppRelation',
	'models/StudentMgr/EasyChatTimeModel'
	],function($,_,Backbone,Backbone_Relational,StudentInfoEntity,AppRelationEntity,EasyChatTimeModel){
	var invalid = Backbone.RelationalModel.extend({
		default:{
			errMsg:""
		}
	})


	var studentCreateModel = Backbone.RelationalModel.extend({
		relations:[
			//Ajax StudentInfo
			{
				type:Backbone.HasOne,
				key:'StudentInfo',
				relatedModel:StudentInfoEntity,
				reverseRelation: {
					key: 'StudentCreateModel',
					type:Backbone.HasOne
				}
			},
			//Ajax AppRelation
			{
				type:Backbone.HasOne,
				key:'AppRelation',
				relatedModel:AppRelationEntity,
				reverseRelation: {
					key: 'StudentCreateModel',
					type:Backbone.HasOne
				}
			},
			//Ajax ContactFather
			{
				type:Backbone.HasOne,
				key:'ContactFather',
				relatedModel:EasyChatTimeModel,
				reverseRelation: {
					key: 'StudentCreateModel',
					type:Backbone.HasOne
				}
			},
			//Ajax ContactMother
			{
				type:Backbone.HasOne,
				key:'ContactMother',
				relatedModel:EasyChatTimeModel,
				reverseRelation: {
					key: 'StudentCreateModel',
					type:Backbone.HasOne
				}
			},
			//Ajax ContactStudent
			{
				type:Backbone.HasOne,
				key:'ContactStudent',
				relatedModel:EasyChatTimeModel,
				reverseRelation: {
					key: 'StudentCreateModel',
					type:Backbone.HasOne
				}
			},
			//Ajax ContactOther
			{
				type:Backbone.HasOne,
				key:'ContactOther',
				relatedModel:EasyChatTimeModel,
				reverseRelation: {
					key: 'StudentCreateModel',
					type:Backbone.HasOne
				}
			}
		],
		initialize:function(){
			this.set("invalid",new invalid);
		}
	});
	return studentCreateModel;
})