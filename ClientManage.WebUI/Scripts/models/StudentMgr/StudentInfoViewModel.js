/***************************************
 * Created by samhwang1990@gmail.com on 14-5-15.
 * StudentInfoViewModel
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'models/StudentMgr/StudentInfo',
	'models/StudentMgr/AppRelation'
	],function($,_,Backbone,StudentInfoEntity,AppRelationEntity){
	var studentInfoViewModel = Backbone.Model.extend({
		defaults:{
			"StudentInfo":new StudentInfoEntity(),
			"AppRelation":new AppRelationEntity()
		},
		initialize:function(options){
			this.url = options.url;
		}
	});
	return studentInfoViewModel;
});
