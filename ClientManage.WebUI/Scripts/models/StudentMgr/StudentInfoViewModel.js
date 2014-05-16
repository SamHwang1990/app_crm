/***************************************
 * Created by samhwang1990@gmail.com on 14-5-15.
 * StudentInfoViewModel
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'backbone.relational',
	'models/StudentMgr/StudentInfo',
	'models/StudentMgr/AppRelation'
	],function($,_,Backbone,Backbone_Relational,StudentInfoEntity,AppRelationEntity){
	var studentInfoViewModel = Backbone.RelationalModel.extend({
		relations:[
			{
				type:Backbone.HasOne,
				key:"StudentInfo",
				relatedModel:StudentInfoEntity,
				reverseRelation: {
					key: 'StudentInfoViewModel',
					type:Backbone.HasOne
				}
			},
			{
				type:Backbone.HasOne,
				key:"AppRelation",
				relatedModel:AppRelationEntity,
				reverseRelation: {
					key: 'StudentInfoViewModel',
					type:Backbone.HasOne
				}
			}
		]
	});
	return studentInfoViewModel;
});
